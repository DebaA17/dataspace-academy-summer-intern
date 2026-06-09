from django.apps import apps
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class CustomerAppTests(TestCase):
	def test_customer_app_is_installed(self):
		self.assertTrue(apps.is_installed('customer'))


class PredictClusterAPITests(APITestCase):
	def test_predict_endpoint_get(self):
		url = reverse('predict')
		response = self.client.get(url)
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(response.data['status'], 'active')
		self.assertEqual(response.data['model_status'], 'ML model active')

	def test_predict_endpoint_post_valid(self):
		url = reverse('predict')
		payload = {
			"age": 35,
			"income": 50000,
			"total_spending": 500,
			"education": "Graduation",
			"marital_status": "Married",
			"num_web_purchases": 5,
			"num_store_purchases": 8,
			"num_catalog_purchases": 2,
			"num_web_visits_month": 10,
			"recency": 30,
			"total_children": 2
		}
		response = self.client.post(url, payload, format='json')
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertIn('predicted_cluster', response.data)
		self.assertIn('cluster_description', response.data)
		self.assertIn('confidence_score', response.data)
