from django.db import models


class Project(models.Model):

    name = models.CharField(max_length=255)
    users = models.ManyToManyField("users.User", related_name="projects", blank=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name
