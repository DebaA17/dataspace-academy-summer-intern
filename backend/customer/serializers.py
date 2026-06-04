from rest_framework import serializers

class CustomerInputSerializer(serializers.Serializer):
    age = serializers.IntegerField()
    income = serializers.FloatField()
    total_spending = serializers.FloatField()
    education = serializers.CharField()
    marital_status = serializers.CharField()
    num_web_purchases = serializers.IntegerField()
    num_store_purchases = serializers.IntegerField()
    num_catalog_purchases = serializers.IntegerField()
    num_web_visits_month = serializers.IntegerField()
    recency = serializers.IntegerField()
    total_children = serializers.IntegerField()

    def validate_age(self, value):
        if value < 1 or value > 120:
            raise serializers.ValidationError("Age must be between 1 and 120.")
        return value


class PredictionResponseSerializer(serializers.Serializer):
    predicted_cluster = serializers.IntegerField()
    cluster_description = serializers.CharField()
    confidence_score = serializers.FloatField()
    message = serializers.CharField()