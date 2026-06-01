import os
import joblib
import pandas as pd

from xgboost import XGBClassifier
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

print("🚀 ML Training Started")

# =========================
# Load Dataset
# =========================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

data_path = os.path.join(
    BASE_DIR,
    "data",
    "processed",
    "featured_data_standard.csv"
)

df = pd.read_csv(data_path)

print("📊 Data Loaded:", df.shape)

# =========================
# Data Cleaning
# =========================
if "Dt_Customer" in df.columns:
    df = df.drop(columns=["Dt_Customer"])

# =========================
# Features & Target
# =========================
TARGET_COLUMN = "Response"

X = df.drop(columns=[TARGET_COLUMN])
y = df[TARGET_COLUMN]

# Encode categorical columns if any
X = pd.get_dummies(X)

print("🧠 Features Shape:", X.shape)

# =========================
# Train-Test Split
# =========================
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# =========================
# Random Forest
# =========================
print("\n🌲 Training Random Forest...")

rf_model = RandomForestClassifier(
    n_estimators=200,
    random_state=42,
    class_weight="balanced"
)

rf_model.fit(X_train, y_train)

rf_predictions = rf_model.predict(X_test)
rf_accuracy = accuracy_score(y_test, rf_predictions)

print(f"🌲 RF Accuracy: {rf_accuracy:.4f}")
print(classification_report(y_test, rf_predictions))

# =========================
# XGBoost
# =========================
print("\n⚡ Training XGBoost...")

xgb_model = XGBClassifier(
    n_estimators=200,
    max_depth=5,
    learning_rate=0.1,
    random_state=42,
    eval_metric="logloss"
)

xgb_model.fit(X_train, y_train)

xgb_predictions = xgb_model.predict(X_test)
xgb_accuracy = accuracy_score(y_test, xgb_predictions)

print(f"⚡ XGB Accuracy: {xgb_accuracy:.4f}")
print(classification_report(y_test, xgb_predictions))

# =========================
# Select Best Model
# =========================
if rf_accuracy > xgb_accuracy:
    best_model = rf_model
    best_model_name = "Random Forest"
else:
    best_model = xgb_model
    best_model_name = "XGBoost"

print(f"\n🏆 Best Model: {best_model_name}")

# =========================
# Save Model & Features
# =========================
models_dir = os.path.join(BASE_DIR, "models")
os.makedirs(models_dir, exist_ok=True)

model_path = os.path.join(
    models_dir,
    "customer_cluster_model.pkl"
)

features_path = os.path.join(
    models_dir,
    "features.pkl"
)

joblib.dump(best_model, model_path)
joblib.dump(X.columns.tolist(), features_path)

print("💾 Model saved:", model_path)
print("📌 Features saved:", features_path)

print("\n✅ Training Completed Successfully")