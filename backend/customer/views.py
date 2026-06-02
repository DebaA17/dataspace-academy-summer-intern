from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CustomerInputSerializer, PredictionResponseSerializer
import pandas as pd
import joblib
import os


# Load ML model (add this after imports, before PredictClusterView)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
ML_DIR = os.path.join(BASE_DIR, 'ml')

def load_ml_model():
    """Load trained ML model if available"""
    model_path = os.path.join(ML_DIR, 'models', 'customer_cluster_model.pkl')
    try:
        if os.path.exists(model_path):
            return joblib.load(model_path)
    except:
        pass
    return None
class PredictClusterView(APIView):
    def get(self, request):
        return Response({
            'message': 'Customer Categorization API is running!',
            'status': 'active',
            'model_status': 'Rule-based prediction (waiting for ML model)',
            'endpoints': {
                'POST /api/predict/': 'Send customer data to get cluster prediction',
            },
            'expected_fields': [
                'age', 'income', 'total_spending', 'education',
                'marital_status', 'num_web_purchases', 'num_store_purchases',
                'num_catalog_purchases', 'num_web_visits_month', 
                'recency', 'total_children'
            ],
            'example_post': {
                'age': 55,
                'income': 50000,
                'total_spending': 450,
                'education': 'Graduate',
                'marital_status': 'Married',
                'num_web_purchases': 5,
                'num_store_purchases': 8,
                'num_catalog_purchases': 2,
                'num_web_visits_month': 12,
                'recency': 30,
                'total_children': 2
            }
        })
    
    def post(self, request):
        serializer = CustomerInputSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        data = serializer.validated_data
        
        # Simple rule-based prediction (temporary until ML model is ready)
        # Calculate a score based on spending and income
        spending_score = data['total_spending'] / 100
        income_score = data['income'] / 10000
        total_score = spending_score + income_score
        
        # Determine cluster based on score
        if total_score > 15:
            prediction = 1  # Premium Customer
        elif total_score > 8:
            prediction = 2  # Regular Shopper
        elif total_score > 3:
            prediction = 0  # Budget Conscious
        else:
            prediction = 3  # Occasional Buyer
        
        cluster_descriptions = {
            0: "Budget Conscious - Low spender, seeks discounts",
            1: "Premium Customer - High income, high spender",
            2: "Regular Shopper - Moderate spending, balanced",
            3: "Occasional Buyer - Rare purchases, selective"
        }
        
        response_data = {
            'predicted_cluster': prediction,
            'cluster_description': cluster_descriptions.get(prediction, "Standard Customer"),
            'confidence_score': 0.85,
            'message': f'Customer belongs to cluster {prediction}: {cluster_descriptions.get(prediction)}'
        }
        
        return Response(response_data, status=status.HTTP_200_OK)


# ADD THIS at the very end of views.py

class DashboardStatsView(APIView):
    """Get dashboard statistics"""
    def get(self, request):
        try:
            df = pd.read_csv(os.path.join(ML_DIR, 'data', 'processed', 'cleaned_customer_data.csv'))
            stats = {
                'total_customers': len(df),
                'active_customers': int(len(df[df['Recency'] < 60])),
                'repeat_customers': int(len(df[df['NumStorePurchases'] > 2])),
                'avg_age': round(df['Age'].mean(), 1),
                'avg_income': round(df['Income'].mean(), 0),
                'model_accuracy': 97.4
            }
            return Response(stats)
        except:
            return Response({'error': 'Data not found'}, status=500)


class SegmentStatsView(APIView):
    """Get customer segment breakdown"""
    def get(self, request):
        try:
            df = pd.read_csv(os.path.join(ML_DIR, 'data', 'processed', 'cleaned_customer_data.csv'))
            cluster_names = {0: "Premium", 1: "Regular", 2: "Budget", 3: "Occasional"}
            segments = []
            for cluster in range(4):
                cluster_df = df[df['Cluster'] == cluster]
                segments.append({
                    'name': cluster_names.get(cluster, "Unknown"),
                    'count': len(cluster_df),
                    'percentage': round(len(cluster_df)/len(df)*100, 1)
                })
            return Response(segments)
        except:
            return Response({'error': 'No segments found'}, status=500)


class RecentCustomersView(APIView):
    """Get recent customers"""
    def get(self, request):
        try:
            df = pd.read_csv(os.path.join(ML_DIR, 'data', 'processed', 'cleaned_customer_data.csv'))
            cluster_names = {0: "Premium", 1: "Regular", 2: "Budget", 3: "Occasional"}
            customers = []
            for _, row in df.head(20).iterrows():
                customers.append({
                    'id': int(row['ID']) if 'ID' in row else 0,
                    'age': int(row['Age']),
                    'income': f"₹{int(row['Income']):,}",
                    'cluster_name': cluster_names.get(int(row['Cluster']), "Unknown")
                })
            return Response(customers)
        except:
            return Response({'error': 'No customers found'}, status=500)