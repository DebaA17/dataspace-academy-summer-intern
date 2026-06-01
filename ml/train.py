from __future__ import annotations

from pathlib import Path

import joblib
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, f1_score
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

print("🚀 ML Training Started")

# =========================
# 1. Load dataset
# =========================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

file_path = os.path.join(
    BASE_DIR,
    "data/raw/customer_data.csv"
)

df = pd.read_csv(file_path, sep="\t")

print("📊 Data Loaded:", df.shape)

# =========================
# 2. Cleaning
# =========================
if "Dt_Customer" in df.columns:
    df = df.drop("Dt_Customer", axis=1)

# =========================
# 3. Features & Target
# =========================
X = df.drop("Response", axis=1)
y = df["Response"]

# Encode categorical data
X = pd.get_dummies(X)

print("🧠 After encoding:", X.shape)

# =========================
# 4. Train-test split
# =========================
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# =========================
# 5. Random Forest
# =========================
print("\n🌲 Training Random Forest...")

rf_model = RandomForestClassifier(
    n_estimators=200,
    random_state=42,
    class_weight="balanced"
)

rf_model.fit(X_train, y_train)
rf_pred = rf_model.predict(X_test)

rf_acc = accuracy_score(y_test, rf_pred)

print("🌲 RF Accuracy:", rf_acc)
print(classification_report(y_test, rf_pred))

# =========================
# 6. XGBoost
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
xgb_pred = xgb_model.predict(X_test)

xgb_acc = accuracy_score(y_test, xgb_pred)

print("⚡ XGB Accuracy:", xgb_acc)
print(classification_report(y_test, xgb_pred))

# =========================
# 7. Best Model
# =========================
best_model = rf_model if rf_acc > xgb_acc else xgb_model
best_name = "RandomForest" if rf_acc > xgb_acc else "XGBoost"

print(f"\n🏆 Best Model: {best_name}")

# =========================
# 8. Save model + features
# =========================
os.makedirs(os.path.join(BASE_DIR, "models"), exist_ok=True)

model_path = os.path.join(BASE_DIR, "models/customer_cluster_model.pkl")
feature_path = os.path.join(BASE_DIR, "models/features.pkl")

joblib.dump(best_model, model_path)
joblib.dump(X.columns, feature_path)

print("💾 Model saved at:", model_path)
print("📌 Features saved at:", feature_path)
print("✅ Training Completed")