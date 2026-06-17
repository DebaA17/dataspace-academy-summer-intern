class SecurityHeadersMiddleware:
    """
    Custom middleware to add Content-Security-Policy and Permissions-Policy 
    headers to all HTTP responses, securing the Django API and Admin views.
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        
        # Content-Security-Policy (CSP) - restrictive defaults but compatible with Django Admin/REST API UI
        response['Content-Security-Policy'] = (
            "default-src 'self'; "
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'; "
            "style-src 'self' 'unsafe-inline'; "
            "img-src 'self' data:; "
            "frame-ancestors 'none'; "
            "form-action 'self';"
        )
        
        # Permissions-Policy - disable access to sensitive browser features for security hardening
        response['Permissions-Policy'] = (
            "geolocation=(), "
            "camera=(), "
            "microphone=(), "
            "payment=(), "
            "usb=()"
        )
        
        return response
