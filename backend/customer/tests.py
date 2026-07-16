from django.apps import apps
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class CustomerAppTests(TestCase):
	def test_customer_app_is_installed(self):
		self.assertTrue(apps.is_installed('customer'))


from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class PredictClusterAPITests(APITestCase):
	def setUp(self):
		self.user = User.objects.create_user(username='testuser', password='testpassword')  # nosec B106
		self.token = Token.objects.create(user=self.user)
		self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

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


class LoginAttemptSignalTests(TestCase):
	def test_successful_login_logged(self):
		from django.contrib.auth.signals import user_logged_in
		from django.test import RequestFactory
		from customer.models import LoginAttempt

		factory = RequestFactory()
		request = factory.post('/api/login/')
		user = User.objects.create_user(username='signalsuccess', password='password123')  # nosec B106

		user_logged_in.send(sender=user.__class__, request=request, user=user)

		log = LoginAttempt.objects.filter(username='signalsuccess').first()
		self.assertIsNotNone(log)
		self.assertEqual(log.status, 'SUCCESS')
		self.assertEqual(log.login_source, 'FRONTEND')

	def test_failed_login_logged(self):
		from django.contrib.auth.signals import user_login_failed
		from django.test import RequestFactory
		from customer.models import LoginAttempt

		factory = RequestFactory()
		request = factory.post('/api/login/')

		user_login_failed.send(sender=None, credentials={'username': 'signalfailed'}, request=request)

		log = LoginAttempt.objects.filter(username='signalfailed').first()
		self.assertIsNotNone(log)
		self.assertEqual(log.status, 'FAILED')
		self.assertEqual(log.login_source, 'FRONTEND')

	def test_backend_login_logged(self):
		from django.contrib.auth.signals import user_logged_in
		from django.test import RequestFactory
		from customer.models import LoginAttempt

		factory = RequestFactory()
		request = factory.post('/admin/login/')
		user = User.objects.create_user(username='admin_success', password='password123')  # nosec B106

		user_logged_in.send(sender=user.__class__, request=request, user=user)

		log = LoginAttempt.objects.filter(username='admin_success').first()
		self.assertIsNotNone(log)
		self.assertEqual(log.status, 'SUCCESS')
		self.assertEqual(log.login_source, 'BACKEND')


