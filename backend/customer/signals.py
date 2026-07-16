from django.contrib.auth.signals import user_logged_in, user_login_failed
from django.dispatch import receiver
from .models import LoginAttempt

def get_client_ip(request):
    if not request:
        return None
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0].strip()
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

def get_user_agent(request):
    if not request:
        return None
    return request.META.get('HTTP_USER_AGENT')

def determine_login_source(request):
    if not request:
        return 'BACKEND'
    if '/admin' in request.path:
        return 'BACKEND'
    return 'FRONTEND'

@receiver(user_logged_in)
def log_successful_login(sender, request, user, **kwargs):
    LoginAttempt.objects.create(
        username=user.username,
        ip_address=get_client_ip(request),
        user_agent=get_user_agent(request),
        status='SUCCESS',
        login_source=determine_login_source(request)
    )

@receiver(user_login_failed)
def log_failed_login(sender, credentials, request, **kwargs):
    username = credentials.get('username', 'Unknown')
    LoginAttempt.objects.create(
        username=username,
        ip_address=get_client_ip(request),
        user_agent=get_user_agent(request),
        status='FAILED',
        login_source=determine_login_source(request)
    )
