import os
import joblib
import pandas as pd

print("🚀 Predictor Started")

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model_path = os.path.join(BASE_DIR, "models", "customer_cluster_model.pkl")
feature_path = os.path.join(BASE_DIR, "models", "features.pkl")

# Load model & features
model = joblib.load(model_path)
features = joblib.load(feature_path)

print("✅ Model loaded")

# Load data
data_path = os.path.join(
    BASE_DIR,
    "data",
    "processed",
    "featured_data_standard.csv"
)

df = pd.read_csv(data_path)

# Preprocessing
if "Dt_Customer" in df.columns:
    df = df.drop(columns=["Dt_Customer"])

if "Response" in df.columns:
    df = df.drop(columns=["Response"])

df = pd.get_dummies(df)

# Match training features
df = df.reindex(columns=features, fill_value=0)

# Prediction
predictions = model.predict(df)

result = pd.DataFrame({
    "prediction": predictions
})

print("\n🎯 Sample Predictions:")
print(result.head())

print("\n✅ Prediction Completed")