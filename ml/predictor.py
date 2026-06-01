import os
import joblib
import pandas as pd

print("🚀 Predictor Started")

# =========================
# 1. Paths
# =========================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model_path = os.path.join(BASE_DIR, "models/customer_cluster_model.pkl")
feature_path = os.path.join(BASE_DIR, "models/features.pkl")

# =========================
# 2. Load model + features
# =========================
model = joblib.load(model_path)
features = joblib.load(feature_path)

print("✅ Model loaded")

# =========================
# 3. Load data (test sample)
# =========================
data_path = os.path.join(BASE_DIR, "data/raw/customer_data.csv")
df = pd.read_csv(data_path, sep="\t")

# =========================
# 4. Preprocess (same as training)
# =========================
if "Dt_Customer" in df.columns:
    df = df.drop("Dt_Customer", axis=1)

if "Response" in df.columns:
    df = df.drop("Response", axis=1)

df = pd.get_dummies(df)

# Align features
df = df.reindex(columns=features, fill_value=0)

# =========================
# 5. Predict
# =========================
predictions = model.predict(df)

df["prediction"] = predictions

print("\n🎯 Sample Predictions:")
print(df[["prediction"]].head())

print("\n✅ Prediction Completed")