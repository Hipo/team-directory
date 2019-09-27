from django.db import models
from django.contrib.auth.models import User


class Member(models.Model):
    slack_user_id = models.CharField(max_length=255)
    slack_team_id = models.CharField(max_length=255)

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="member")
    team = models.ForeignKey("projects.Team", on_delete=models.CASCADE, related_name="members", null=True)
    name = models.CharField(max_length=255)
    image = models.CharField(max_length=255)
    timezone = models.CharField(max_length=255)

    token = models.CharField(max_length=255)
