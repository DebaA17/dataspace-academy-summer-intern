from django.db import models

class LoginAttempt(models.Model):
    username = models.CharField(max_length=150)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=[('SUCCESS', 'Success'), ('FAILED', 'Failed')])
    login_source = models.CharField(max_length=20, choices=[('FRONTEND', 'Frontend'), ('BACKEND', 'Backend')], default='BACKEND')
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.username} - {self.status} - {self.login_source} - {self.timestamp}"
