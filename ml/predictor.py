"""
PREDICTOR.PY - Load model and predict for API
"""

import joblib
import numpy as np
import os
import warnings
warnings.filterwarnings('ignore')

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'models', 'customer_cluster_model.pkl')
SCALER_PATH = os.path.join(BASE_DIR, 'models', 'scaler.pkl')
FEATURES_PATH = os.path.join(BASE_DIR, 'models', 'feature_columns.pkl')

# Global variables
model = None
scaler = None
feature_columns = None

def load_artifacts():
    """Load model, scaler, and feature columns"""
    global model, scaler, feature_columns
    
    if model is None:
        try:
            model = joblib.load(MODEL_PATH)
            scaler = joblib.load(SCALER_PATH)
            feature_columns = joblib.load(FEATURES_PATH)
            print("✅ Model artifacts loaded successfully")
        except FileNotFoundError as e:
            print(f"❌ Error: {e}")
            print("Please run ml/train.py first to train the model")
            raise
    
    return model, scaler, feature_columns

def predict_cluster(features_dict):
    """
    Predict customer cluster
    
    Args:
        features_dict: Dictionary with feature names as keys
        
    Returns:
        dict with 'cluster' and 'cluster_name'
    """
    model, scaler, features = load_artifacts()
    
    # Create array in correct order
    input_array = np.array([[features_dict.get(f, 0) for f in features]])
    
    cluster = model.predict(input_array)[0]
    
    cluster_names = {
        0: "Budget Conscious",
        1: "Premium Customer",
        2: "Regular Shopper",
        3: "Occasional Buyer"
    }
    
    return {
        'cluster': int(cluster),
        'cluster_name': cluster_names.get(int(cluster), "Unknown"),
        'confidence': float(max(model.predict_proba(input_array)[0]))
    }

# Test function
if __name__ == "__main__":
    print("Testing predictor...")
    
    test_features = {
        'Age': 35,
        'Income': 50000,
        'TotalSpending': 500,
        'Recency': 30,
        'NumWebPurchases': 5,
        'NumStorePurchases': 8,
        'NumCatalogPurchases': 2,
        'NumWebVisitsMonth': 10,
        'TotalChildren': 2,
        'Education_Encoded': 1,
        'Marital_Encoded': 1
    }
    
    result = predict_cluster(test_features)
    print(f"✅ Prediction: {result}")