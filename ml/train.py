from __future__ import annotations

from pathlib import Path

import joblib
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, f1_score
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from xgboost import XGBClassifier


BASE_DIR = Path(__file__).resolve().parent
DATA_PATH = BASE_DIR / "data" / "processed" / "featured_data_standard.csv"
MODEL_DIR = BASE_DIR / "models"
MODEL_PATH = MODEL_DIR / "customer_cluster_model.pkl"
FEATURES_PATH = MODEL_DIR / "feature_columns.pkl"
SCALER_PATH = MODEL_DIR / "scaler_standard.pkl"

# These are the fields the Django API can provide after validation.
FEATURE_COLUMNS = [
    "Age",
    "Income",
    "Recency",
    "NumWebPurchases",
    "NumStorePurchases",
    "NumCatalogPurchases",
    "NumWebVisitsMonth",
    "TotalChildren",
    "Education_Encoded",
    "Marital_Encoded",
]

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


def load_training_data() -> pd.DataFrame:
    if not DATA_PATH.exists():
        raise FileNotFoundError(
            f"Feature-engineered dataset not found at {DATA_PATH}. "
            "Run the feature-engineering step first."
        )

    df = pd.read_csv(DATA_PATH)
    print(f"📊 Dataset loaded: {df.shape[0]} rows x {df.shape[1]} columns")
    return df


def build_target(df: pd.DataFrame) -> pd.Series:
    if "Cluster" in df.columns:
        target = df["Cluster"].copy()
        print("🎯 Using existing 'Cluster' column as the target.")
    elif "TotalSpending" in df.columns:
        # The project does not ship a cluster label, so create quartile-based clusters.
        target = pd.qcut(df["TotalSpending"], q=4, labels=False, duplicates="drop")
        print("🎯 Created cluster labels from 'TotalSpending' quartiles.")
    else:
        raise ValueError(
            "The dataset must contain either 'Cluster' or 'TotalSpending' to build a target."
        )

    target = pd.Series(target, index=df.index, name="target")
    if target.nunique(dropna=True) < 2:
        raise ValueError("Target generation produced fewer than two classes.")

    return target


def prepare_features(df: pd.DataFrame) -> pd.DataFrame:
    missing_columns = [column for column in FEATURE_COLUMNS if column not in df.columns]
    if missing_columns:
        raise ValueError(
            "The feature-engineered dataset is missing required columns: "
            f"{missing_columns}"
        )

    features = df[FEATURE_COLUMNS].copy()
    for column in FEATURE_COLUMNS:
        features[column] = pd.to_numeric(features[column], errors="coerce")

    return features


def drop_incomplete_rows(features: pd.DataFrame, target: pd.Series) -> tuple[pd.DataFrame, pd.Series]:
    combined = features.copy()
    combined["target"] = target
    combined = combined.dropna(subset=FEATURE_COLUMNS + ["target"])

    cleaned_features = combined[FEATURE_COLUMNS].copy()
    cleaned_target = combined["target"].astype(int)
    return cleaned_features, cleaned_target


def train_and_evaluate_model(name: str, model, x_train, x_test, y_train, y_test):
    print(f"\n{' Training ' + name + ' ':=^60}")
    model.fit(x_train, y_train)

    predictions = model.predict(x_test)
    accuracy = accuracy_score(y_test, predictions)
    weighted_f1 = f1_score(y_test, predictions, average="weighted")

    print(f"{name} accuracy: {accuracy:.4f}")
    print(f"{name} weighted F1: {weighted_f1:.4f}")
    print(classification_report(y_test, predictions, zero_division=0))

    return {
        "name": name,
        "model": model,
        "accuracy": accuracy,
        "weighted_f1": weighted_f1,
    }


def main() -> None:
    print("🚀 ML training started")

    df = load_training_data()
    target = build_target(df)
    features = prepare_features(df)
    features, target = drop_incomplete_rows(features, target)

    print(f"🧠 Training features: {features.shape[0]} rows x {features.shape[1]} columns")
    print(f"🧩 Feature columns: {FEATURE_COLUMNS}")

    x_train, x_test, y_train, y_test = train_test_split(
        features,
        target,
        test_size=0.2,
        random_state=42,
        stratify=target,
    )

    scaler = StandardScaler()
    x_train_scaled = x_train.copy()
    x_test_scaled = x_test.copy()
    x_train_scaled[NUMERIC_COLUMNS] = scaler.fit_transform(x_train[NUMERIC_COLUMNS])
    x_test_scaled[NUMERIC_COLUMNS] = scaler.transform(x_test[NUMERIC_COLUMNS])

    rf_model = RandomForestClassifier(
        n_estimators=300,
        random_state=42,
        class_weight="balanced",
        n_jobs=-1,
    )

    xgb_model = XGBClassifier(
        n_estimators=300,
        max_depth=5,
        learning_rate=0.05,
        subsample=0.9,
        colsample_bytree=0.9,
        random_state=42,
        eval_metric="mlogloss",
        n_jobs=-1,
    )

    rf_result = train_and_evaluate_model(
        "Random Forest",
        rf_model,
        x_train_scaled,
        x_test_scaled,
        y_train,
        y_test,
    )
    xgb_result = train_and_evaluate_model(
        "XGBoost",
        xgb_model,
        x_train_scaled,
        x_test_scaled,
        y_train,
        y_test,
    )

    best_result = max(
        (rf_result, xgb_result),
        key=lambda result: (result["weighted_f1"], result["accuracy"]),
    )

    MODEL_DIR.mkdir(parents=True, exist_ok=True)
    joblib.dump(best_result["model"], MODEL_PATH)
    joblib.dump(FEATURE_COLUMNS, FEATURES_PATH)
    joblib.dump(scaler, SCALER_PATH)

    print("\n🏆 Best model:", best_result["name"])
    print(f"📈 Accuracy: {best_result['accuracy']:.4f}")
    print(f"📈 Weighted F1: {best_result['weighted_f1']:.4f}")
    print(f"💾 Model saved to: {MODEL_PATH}")
    print(f"💾 Feature columns saved to: {FEATURES_PATH}")
    print(f"💾 Scaler saved to: {SCALER_PATH}")
    print("✅ Training completed successfully")


if __name__ == "__main__":
    main()
