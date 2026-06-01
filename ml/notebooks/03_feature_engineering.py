"""
FEATURE ENGINEERING SCRIPT - Customer Categorization
Purpose: Encoding, Scaling, Feature Selection & Pipeline Creation
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.preprocessing import StandardScaler, LabelEncoder, MinMaxScaler
from sklearn.feature_selection import SelectKBest, f_classif, mutual_info_classif
from sklearn.pipeline import Pipeline
import joblib
import os

print("=" * 60)
print("FEATURE ENGINEERING - Customer Categorization")
print("=" * 60)

# ============================================
# STEP 1: Load Cleaned Data
# ============================================
print("\n[STEP 1] Loading cleaned data...")
df = pd.read_csv('ml/data/processed/cleaned_customer_data.csv')
print(f"✅ Loaded {df.shape[0]} rows, {df.shape[1]} columns")

# ============================================
# STEP 2: Encoding Categorical Variables
# ============================================
print("\n[STEP 2] Encoding Categorical Variables...")

# 2.1 Education Encoding
if 'Education_Simplified' in df.columns:
    edu_map = {'Basic': 0, 'Graduate': 1, 'Postgraduate': 2}
    df['Education_Encoded'] = df['Education_Simplified'].map(edu_map)
    print(f"✅ Education encoded: {df['Education_Encoded'].unique()}")

# 2.2 Marital Status Encoding
if 'Marital_Simplified' in df.columns:
    marital_map = {'Single': 0, 'Married': 1}
    df['Marital_Encoded'] = df['Marital_Simplified'].map(marital_map)
    print(f"✅ Marital status encoded: {df['Marital_Encoded'].unique()}")

# 2.3 One-Hot Encoding (alternative method)
print("\n[STEP 2.3] Applying One-Hot Encoding...")
df_encoded = pd.get_dummies(df, columns=['Education_Simplified', 'Marital_Simplified'], prefix=['Edu', 'Mar'])
print(f"✅ One-Hot Encoding added {df_encoded.shape[1] - df.shape[1]} new columns")

print(f"\n📊 Final encoded shape: {df_encoded.shape}")

# ============================================
# STEP 3: Scaling Numerical Features
# ============================================
print("\n[STEP 3] Scaling Numerical Features...")

# 3.1 Select numerical columns for scaling
numeric_cols = ['Age', 'Income', 'TotalSpending', 'Recency', 
                'NumWebPurchases', 'NumStorePurchases', 'NumCatalogPurchases',
                'NumWebVisitsMonth', 'TotalChildren']

available_numeric = [col for col in numeric_cols if col in df_encoded.columns]
print(f"📊 Scaling these columns: {available_numeric}")

# 3.2 StandardScaler (for normal distribution)
scaler_standard = StandardScaler()
df_scaled_standard = df_encoded.copy()
df_scaled_standard[available_numeric] = scaler_standard.fit_transform(df_encoded[available_numeric])
print(f"✅ StandardScaler applied")

# 3.3 MinMaxScaler (for bounded range 0-1)
scaler_minmax = MinMaxScaler()
df_scaled_minmax = df_encoded.copy()
df_scaled_minmax[available_numeric] = scaler_minmax.fit_transform(df_encoded[available_numeric])
print(f"✅ MinMaxScaler applied")

# Visualize scaling effect
fig, axes = plt.subplots(1, 3, figsize=(15, 4))

axes[0].hist(df['Age'], bins=20, color='skyblue', edgecolor='black')
axes[0].set_title('Original Age')
axes[0].set_xlabel('Age')

axes[1].hist(df_scaled_standard['Age'], bins=20, color='lightgreen', edgecolor='black')
axes[1].set_title('StandardScaled Age')
axes[1].set_xlabel('Scaled Value')

axes[2].hist(df_scaled_minmax['Age'], bins=20, color='salmon', edgecolor='black')
axes[2].set_title('MinMaxScaled Age')
axes[2].set_xlabel('Scaled Value')

plt.tight_layout()
os.makedirs('ml/notebooks/eda_charts', exist_ok=True)
plt.savefig('ml/notebooks/eda_charts/10_scaling_comparison.png', dpi=150)
plt.close()
print(f"✅ Scaling comparison chart saved")

# ============================================
# STEP 4: Feature Selection
# ============================================
print("\n[STEP 4] Feature Selection...")

# 4.1 Prepare features and target (using Cluster if exists, else use TotalSpending as proxy)
if 'Cluster' in df_encoded.columns:
    target = df_encoded['Cluster']
    print("🎯 Using 'Cluster' as target variable")
else:
    # Create temporary target for feature selection (using spending categories)
    print("⚠️ 'Cluster' not found. Creating temporary target based on TotalSpending...")
    target = pd.qcut(df_encoded['TotalSpending'], q=4, labels=[0, 1, 2, 3])
    print("✅ Temporary target created")

# Select feature columns (exclude ID and target)
exclude_cols = ['ID', 'Cluster', 'Dt_Customer'] if 'Cluster' in df_encoded.columns else ['ID', 'Dt_Customer']
feature_cols = [col for col in df_encoded.columns if col not in exclude_cols and df_encoded[col].dtype in ['int64', 'float64']]
X = df_encoded[feature_cols]
print(f"📊 Total features available: {len(feature_cols)}")

# 4.2 SelectKBest - F-test
selector_f = SelectKBest(score_func=f_classif, k=10)
X_selected_f = selector_f.fit_transform(X, target)

# Get selected feature names
f_scores = pd.DataFrame({
    'Feature': feature_cols,
    'F_Score': selector_f.scores_
}).sort_values('F_Score', ascending=False)

print("\n📊 Top 10 Features by F-Score:")
print(f_scores.head(10))

# 4.3 Mutual Information (captures non-linear relationships)
selector_mi = SelectKBest(score_func=mutual_info_classif, k=10)
X_selected_mi = selector_mi.fit_transform(X, target)

mi_scores = pd.DataFrame({
    'Feature': feature_cols,
    'MI_Score': selector_mi.scores_
}).sort_values('MI_Score', ascending=False)

print("\n📊 Top 10 Features by Mutual Information:")
print(mi_scores.head(10))

# 4.4 Plot feature importance
fig, axes = plt.subplots(1, 2, figsize=(14, 6))

# F-Score plot
axes[0].barh(f_scores.head(10)['Feature'], f_scores.head(10)['F_Score'], color='steelblue')
axes[0].set_xlabel('F-Score')
axes[0].set_title('Top 10 Features - F-Score')
axes[0].invert_yaxis()

# MI Score plot
axes[1].barh(mi_scores.head(10)['Feature'], mi_scores.head(10)['MI_Score'], color='coral')
axes[1].set_xlabel('Mutual Information Score')
axes[1].set_title('Top 10 Features - Mutual Information')
axes[1].invert_yaxis()

plt.tight_layout()
plt.savefig('ml/notebooks/eda_charts/11_feature_selection.png', dpi=150)
plt.close()
print(f"✅ Feature selection chart saved")

# ============================================
# STEP 5: Create ML Pipeline
# ============================================
print("\n[STEP 5] Creating Preprocessing Pipeline...")

# Define the preprocessing pipeline
preprocessing_pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('feature_selector', SelectKBest(score_func=f_classif, k=10))
])

# Fit the pipeline on your features
pipeline_features = preprocessing_pipeline.fit_transform(X, target)
print(f"✅ Pipeline created")
print(f"   Input features: {X.shape[1]}")
print(f"   Output features: {pipeline_features.shape[1]}")

print("\n📋 Pipeline Structure:")
for step_name, step in preprocessing_pipeline.named_steps.items():
    print(f"   → {step_name}: {step.__class__.__name__}")

# ============================================
# STEP 6: Save Feature Engineering Artifacts
# ============================================
print("\n[STEP 6] Saving Feature Engineering Artifacts...")

os.makedirs('ml/models', exist_ok=True)

# Save scalers
joblib.dump(scaler_standard, 'ml/models/scaler_standard.pkl')
joblib.dump(scaler_minmax, 'ml/models/scaler_minmax.pkl')
print(f"✅ Scalers saved to ml/models/")

# Save feature selectors
joblib.dump(selector_f, 'ml/models/selector_f.pkl')
joblib.dump(selector_mi, 'ml/models/selector_mi.pkl')
print(f"✅ Feature selectors saved")

# Save pipeline
joblib.dump(preprocessing_pipeline, 'ml/models/preprocessing_pipeline.pkl')
print(f"✅ Preprocessing pipeline saved")

# Save feature columns
feature_info = {
    'all_features': feature_cols,
    'top_10_f_features': f_scores.head(10)['Feature'].tolist(),
    'top_10_mi_features': mi_scores.head(10)['Feature'].tolist(),
    'f_scores': f_scores.to_dict(),
    'mi_scores': mi_scores.to_dict()
}
joblib.dump(feature_info, 'ml/models/feature_info.pkl')
print(f"✅ Feature information saved")

# ============================================
# STEP 7: Save Processed Data
# ============================================
print("\n[STEP 7] Saving Processed Data...")

# Save encoded and scaled data
df_scaled_standard.to_csv('ml/data/processed/featured_data_standard.csv', index=False)
df_scaled_minmax.to_csv('ml/data/processed/featured_data_minmax.csv', index=False)
print(f"✅ Featured data saved to ml/data/processed/")

# ============================================
# FINAL SUMMARY
# ============================================
print("\n" + "=" * 60)
print("FEATURE ENGINEERING COMPLETE - SUMMARY")
print("=" * 60)

print("""
✅ Encoding Complete:
   - Education: Label Encoded (0,1,2)
   - Marital Status: Label Encoded (0,1)
   - One-Hot Encoding available

✅ Scaling Complete:
   - StandardScaler applied
   - MinMaxScaler applied
   - Comparison chart saved

✅ Feature Selection Complete:
   - Top features identified by F-Score
   - Top features by Mutual Information
   - Feature selection chart saved

✅ Pipeline Created:
   - Reusable preprocessing pipeline
   - Can be used in model training

📁 Files Saved:
   - ml/models/scaler_standard.pkl
   - ml/models/scaler_minmax.pkl
   - ml/models/selector_f.pkl
   - ml/models/selector_mi.pkl
   - ml/models/preprocessing_pipeline.pkl
   - ml/models/feature_info.pkl
   - ml/data/processed/featured_data_standard.csv
   - ml/data/processed/featured_data_minmax.csv
   - ml/notebooks/eda_charts/10_scaling_comparison.png
   - ml/notebooks/eda_charts/11_feature_selection.png
""")

print("=" * 60)
print("FEATURE ENGINEERING COMPLETE!")
print("=" * 60)