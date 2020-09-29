from django.db import models
from django.contrib.auth.models import AbstractUser

TEAM_CHOICES = (
    ("ios", "iOS"),
    ("android", "Android"),
    ("backend", "Backend"),
    ("frontend", "Frontend"),
    ("qa", "QA"),
    ("design", "Design"),
)


class User(AbstractUser):

    slack_user_id = models.CharField(max_length=255, unique=True)
    slack_username = models.CharField(max_length=255)
    slack_access_token = models.CharField(max_length=255, blank=True)

    username = None
    email = models.EmailField(unique=True)

    image = models.CharField(max_length=255)
    timezone = models.CharField(max_length=255)

    team = models.CharField(max_length=255, choices=TEAM_CHOICES, blank=True)

    agora_initialized = models.BooleanField(default=False)
    agora_initialization_message_sent = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
