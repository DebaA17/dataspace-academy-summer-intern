"""
ML ENGINEERING - Model Training
Random Forest, XGBoost, Evaluation & Tuning
"""

import pandas as pd
import numpy as np
import joblib
import os
import warnings
warnings.filterwarnings('ignore')

from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

# Optional: XGBoost
try:
    from xgboost import XGBClassifier  # type: ignore
    XGB_AVAILABLE = True
except ImportError:
    XGB_AVAILABLE = False
    print("⚠️ XGBoost not installed. Install with: pip install xgboost")

print("=" * 60)
print("ML ENGINEERING - Customer Categorization")
print("=" * 60)

# ============================================
# STEP 1: Load Cleaned Data
# ============================================
print("\n[1] Loading cleaned data...")
df = pd.read_csv('ml/data/processed/cleaned_customer_data.csv')
print(f"✅ Loaded {df.shape[0]} rows, {df.shape[1]} columns")

# ============================================
# STEP 2: Prepare Features for Clustering
# ============================================
print("\n[2] Preparing features for clustering...")

feature_cols = ['Age', 'Income', 'TotalSpending', 'Recency',
                'NumWebPurchases', 'NumStorePurchases', 'NumCatalogPurchases',
                'NumWebVisitsMonth', 'TotalChildren']

available_cols = [col for col in feature_cols if col in df.columns]
print(f"📊 Using features: {available_cols}")

# Handle missing values
X_cluster = df[available_cols].copy()
X_cluster = X_cluster.fillna(X_cluster.median())

# Scale features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X_cluster)

# ============================================
# STEP 3: KMeans Clustering
# ============================================
print("\n[3] Creating customer clusters with KMeans...")

kmeans = KMeans(n_clusters=4, random_state=42, n_init=10)
df['Cluster'] = kmeans.fit_predict(X_scaled)

print("✅ Cluster distribution:")
print(df['Cluster'].value_counts().sort_index())

# ============================================
# STEP 4: Prepare for Classification
# ============================================
print("\n[4] Preparing features for classification...")

# Add encoded columns if they exist
if 'Education_Encoded' in df.columns:
    available_cols.append('Education_Encoded')
if 'Marital_Encoded' in df.columns:
    available_cols.append('Marital_Encoded')

X = df[available_cols].copy()
y = df['Cluster'].copy()

# Handle any remaining missing values
X = X.fillna(X.median())

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

print(f"✅ Train: {len(X_train)} samples")
print(f"✅ Test: {len(X_test)} samples")

# ============================================
# STEP 5: Train Random Forest
# ============================================
print("\n[5] Training Random Forest...")

rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
rf_model.fit(X_train, y_train)

rf_pred = rf_model.predict(X_test)
rf_accuracy = accuracy_score(y_test, rf_pred)

print(f"✅ Random Forest Accuracy: {rf_accuracy:.4f} ({rf_accuracy*100:.2f}%)")
print("\nClassification Report:")
print(classification_report(y_test, rf_pred))

# ============================================
# STEP 6: Hyperparameter Tuning (Optional but recommended)
# ============================================
print("\n[6] Hyperparameter Tuning...")

param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [10, 20, None],
    'min_samples_split': [2, 5, 10]
}

grid_search = GridSearchCV(
    RandomForestClassifier(random_state=42),
    param_grid,
    cv=3,
    scoring='accuracy',
    n_jobs=-1
)

grid_search.fit(X_train, y_train)
print(f"✅ Best parameters: {grid_search.best_params_}")
print(f"✅ Best CV accuracy: {grid_search.best_score_:.4f}")

# Use tuned model
best_model = grid_search.best_estimator_
tuned_accuracy = accuracy_score(y_test, best_model.predict(X_test))
print(f"✅ Tuned model test accuracy: {tuned_accuracy:.4f}")

# ============================================
# STEP 7: Train XGBoost (if available)
# ============================================
if XGB_AVAILABLE:
    print("\n[7] Training XGBoost...")
    xgb_model = XGBClassifier(n_estimators=100, random_state=42, eval_metric='mlogloss')
    xgb_model.fit(X_train, y_train)
    xgb_pred = xgb_model.predict(X_test)
    xgb_accuracy = accuracy_score(y_test, xgb_pred)
    print(f"✅ XGBoost Accuracy: {xgb_accuracy:.4f} ({xgb_accuracy*100:.2f}%)")
    
    # Choose best model
    if xgb_accuracy > tuned_accuracy:
        best_model = xgb_model
        print(f"🏆 Best model: XGBoost")

# ============================================
# STEP 8: Save Model and Artifacts
# ============================================
print("\n[8] Saving model and artifacts...")

os.makedirs('ml/models', exist_ok=True)

joblib.dump(best_model, 'ml/models/customer_cluster_model.pkl')
joblib.dump(scaler, 'ml/models/scaler.pkl')
joblib.dump(kmeans, 'ml/models/kmeans_model.pkl')
joblib.dump(available_cols, 'ml/models/feature_columns.pkl')

print("✅ Model saved to: ml/models/customer_cluster_model.pkl")
print("✅ Scaler saved to: ml/models/scaler.pkl")
print("✅ KMeans model saved to: ml/models/kmeans_model.pkl")
print("✅ Feature columns saved to: ml/models/feature_columns.pkl")

# ============================================
# FINAL SUMMARY
# ============================================
print("\n" + "=" * 60)
print("ML ENGINEERING COMPLETE - SUMMARY")
print("=" * 60)
print(f"""
✅ Clusters created: 4
✅ Features used: {len(available_cols)}
✅ Best model accuracy: {max(rf_accuracy, tuned_accuracy, xgb_accuracy if XGB_AVAILABLE else 0):.4f}
✅ Model saved successfully!

Files created:
- ml/models/customer_cluster_model.pkl
- ml/models/scaler.pkl
- ml/models/kmeans_model.pkl
- ml/models/feature_columns.pkl
""")
print("=" * 60)
print("✅ READY FOR API INTEGRATION!")