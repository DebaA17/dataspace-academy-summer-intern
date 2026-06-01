import os
import joblib
import pandas as pd

print("🚀 Predictor Started")

# =========================
# 1. Load model
# =========================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model_path = os.path.join(BASE_DIR, "models/best_model.pkl")

model = joblib.load(model_path)

print("✅ Model loaded successfully")

# =========================
# 2. Load sample input data (for testing)
# =========================
# 👉 Replace this with real input later
sample_data_path = os.path.join(BASE_DIR, "data/raw/customer_data.csv")

df = pd.read_csv(sample_data_path, sep="\t")

# Drop same columns used in training
if "Dt_Customer" in df.columns:
    df = df.drop("Dt_Customer", axis=1)

# Remove target column if exists
if "Response" in df.columns:
    df = df.drop("Response", axis=1)

# Convert categorical columns (same as training)
df = pd.get_dummies(df)

# =========================
# 3. Align columns with training model
# =========================
# IMPORTANT: match feature columns
model_features = model.feature_names_in_

df = df.reindex(columns=model_features, fill_value=0)

# =========================
# 4. Make prediction
# =========================
predictions = model.predict(df)

# =========================
# 5. Output result
# =========================
df["prediction"] = predictions

print("\n🎯 Sample Predictions:")
print(df[["prediction"]].head())

print("\n✅ Prediction completed")