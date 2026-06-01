from __future__ import annotations

from functools import lru_cache
from pathlib import Path
from typing import Any, Mapping

import joblib
import pandas as pd


BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "models" / "customer_cluster_model.pkl"
FEATURES_PATH = BASE_DIR / "models" / "feature_columns.pkl"
SCALER_PATH = BASE_DIR / "models" / "scaler_standard.pkl"

RAW_TO_FEATURE_MAP = {
    "age": "Age",
    "income": "Income",
    "recency": "Recency",
    "num_web_purchases": "NumWebPurchases",
    "num_store_purchases": "NumStorePurchases",
    "num_catalog_purchases": "NumCatalogPurchases",
    "num_web_visits_month": "NumWebVisitsMonth",
    "total_children": "TotalChildren",
}

EDUCATION_MAP = {
    "basic": 0,
    "graduate": 1,
    "postgraduate": 2,
}

MARITAL_MAP = {
    "single": 0,
    "married": 1,
}

NUMERIC_COLUMNS = [
    "Age",
    "Income",
    "Recency",
    "NumWebPurchases",
    "NumStorePurchases",
    "NumCatalogPurchases",
    "NumWebVisitsMonth",
    "TotalChildren",
]


class PredictorArtifactError(RuntimeError):
    """Raised when a required model artifact is missing or invalid."""


@lru_cache(maxsize=1)
def load_artifacts():
    """Load the trained model and preprocessing artifacts once per process."""

    missing_files = [
        str(path)
        for path in (MODEL_PATH, FEATURES_PATH, SCALER_PATH)
        if not path.exists()
    ]
    if missing_files:
        raise PredictorArtifactError(
            "Missing model artifacts. Train the model first. Missing files: "
            f"{missing_files}"
        )

    model = joblib.load(MODEL_PATH)
    feature_columns = joblib.load(FEATURES_PATH)
    scaler = joblib.load(SCALER_PATH)
    return model, feature_columns, scaler


def _normalize_input(input_data: Mapping[str, Any] | pd.Series | pd.DataFrame) -> dict[str, Any]:
    if isinstance(input_data, pd.DataFrame):
        if len(input_data) != 1:
            raise ValueError("predict_customer expects exactly one row of input data.")
        record = input_data.iloc[0].to_dict()
    elif isinstance(input_data, pd.Series):
        record = input_data.to_dict()
    elif isinstance(input_data, Mapping):
        record = dict(input_data)
    else:
        raise TypeError("input_data must be a mapping, pandas Series, or single-row DataFrame.")

    return {str(key).strip().lower(): value for key, value in record.items()}


def _encode_category(value: Any, mapping: dict[str, int], field_name: str) -> int:
    if value is None:
        raise ValueError(f"'{field_name}' is required.")

    normalized_value = str(value).strip().lower()
    if normalized_value not in mapping:
        raise ValueError(
            f"Invalid value for '{field_name}': {value!r}. Expected one of: {sorted(mapping.keys())}"
        )

    return mapping[normalized_value]


def _build_feature_frame(input_data: Mapping[str, Any] | pd.Series | pd.DataFrame) -> pd.DataFrame:
    record = _normalize_input(input_data)

    feature_row: dict[str, Any] = {
        "Age": record.get("age"),
        "Income": record.get("income"),
        "Recency": record.get("recency"),
        "NumWebPurchases": record.get("num_web_purchases"),
        "NumStorePurchases": record.get("num_store_purchases"),
        "NumCatalogPurchases": record.get("num_catalog_purchases"),
        "NumWebVisitsMonth": record.get("num_web_visits_month"),
        "TotalChildren": record.get("total_children"),
        "Education_Encoded": _encode_category(record.get("education"), EDUCATION_MAP, "education"),
        "Marital_Encoded": _encode_category(record.get("marital_status"), MARITAL_MAP, "marital_status"),
    }

    missing_numeric_fields = [
        raw_name
        for raw_name, feature_name in RAW_TO_FEATURE_MAP.items()
        if feature_row[feature_name] is None
    ]
    if missing_numeric_fields:
        raise ValueError(
            "Missing required fields: "
            f"{missing_numeric_fields}. The predictor expects the same payload used by the Django API."
        )

    frame = pd.DataFrame([feature_row])
    for column in NUMERIC_COLUMNS:
        frame[column] = pd.to_numeric(frame[column], errors="coerce")

    if frame[NUMERIC_COLUMNS].isna().any().any():
        invalid_columns = frame[NUMERIC_COLUMNS].columns[frame[NUMERIC_COLUMNS].isna().any()].tolist()
        raise ValueError(f"Non-numeric values found in numeric fields: {invalid_columns}")

    _, feature_columns, scaler = load_artifacts()
    frame[NUMERIC_COLUMNS] = scaler.transform(frame[NUMERIC_COLUMNS])
    frame = frame.reindex(columns=feature_columns, fill_value=0)
    return frame


def predict_customer(input_data: Mapping[str, Any] | pd.Series | pd.DataFrame) -> int:
    """Return the predicted customer cluster for a single customer payload."""

    model, _, _ = load_artifacts()
    feature_frame = _build_feature_frame(input_data)
    prediction = model.predict(feature_frame)
    return int(prediction[0])


if __name__ == "__main__":
    try:
        load_artifacts()
        print("✅ Predictor loaded successfully")
    except PredictorArtifactError as exc:
        print(f"❌ {exc}")
