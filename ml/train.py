import os
import joblib
import pandas as pd

from xgboost import XGBClassifier
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
# 2. Basic cleaning
# =========================
if "Dt_Customer" in df.columns:
    df = df.drop("Dt_Customer", axis=1)

# =========================
# 3. Features & Target
# =========================
X = df.drop("Response", axis=1)
y = df["Response"]

# Convert categorical variables
X = pd.get_dummies(X)

print("🧠 After encoding:", X.shape)

# =========================
# 4. Train-Test Split
# =========================
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# =========================
# 5. Random Forest Model
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

print("🌲 Random Forest Accuracy:", rf_acc)
print(classification_report(y_test, rf_pred))

# =========================
# 6. XGBoost Model
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

print("⚡ XGBoost Accuracy:", xgb_acc)
print(classification_report(y_test, xgb_pred))

# =========================
# 7. Select Best Model
# =========================
best_model = rf_model if rf_acc > xgb_acc else xgb_model
best_name = "RandomForest" if rf_acc > xgb_acc else "XGBoost"

print(f"\n🏆 Best Model: {best_name}")

# =========================
# 8. Save Model
# =========================
os.makedirs(os.path.join(BASE_DIR, "models"), exist_ok=True)

model_path = os.path.join(BASE_DIR, "models/best_model.pkl")

joblib.dump(best_model, model_path)

print("💾 Model saved at:", model_path)
print("✅ Training Completed Successfully")