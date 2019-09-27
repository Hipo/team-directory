from django.db import models


class Project(models.Model):
    name = models.CharField(max_length=255)
    members = models.ManyToManyField("members.Member", related_name="projects")
    description = models.TextField()
    is_active = models.BooleanField(default=True)


class Team(models.Model):
    name = models.CharField(max_length=255)
