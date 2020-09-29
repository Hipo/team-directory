from django.db import models


class Project(models.Model):

    name = models.CharField(max_length=255)
    users = models.ManyToManyField("users.User", related_name="projects")
    description = models.TextField()
