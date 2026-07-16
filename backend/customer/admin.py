from django.contrib import admin
from .models import LoginAttempt

@admin.register(LoginAttempt)
class LoginAttemptAdmin(admin.ModelAdmin):
    list_display = ('username', 'status', 'login_source', 'ip_address', 'timestamp')
    list_filter = ('status', 'login_source', 'timestamp')
    search_fields = ('username', 'ip_address', 'user_agent')
    readonly_fields = ('username', 'ip_address', 'user_agent', 'status', 'login_source', 'timestamp')

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

