from django.contrib import admin
from django.contrib import messages
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .models import User


class UserAdmin(admin.ModelAdmin):

    ordering = ['id']
    list_display = ['id', 'email', 'first_name', 'last_name', 'is_staff']
    actions = ["send_agora_initialization_message"]

    def send_agora_initialization_message(self, request, queryset):
        """
        Fetch and synchronize pre-trade-queue orders from Prive
        """
        for user in queryset:
            user.send_agora_initialization_message(force=True)

        self.message_user(
            request,
            "Agora setup messages have been sent.",
            messages.SUCCESS
        )

    send_agora_initialization_message.short_description = 'Send Agora Setup Message'


admin.site.register(User, UserAdmin)
