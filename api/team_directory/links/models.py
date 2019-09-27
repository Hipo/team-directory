from django.db import models


class Link(models.Model):
    title = models.CharField(max_length=255)
    url = models.URLField()
    member = models.ForeignKey("members.Member", on_delete=models.CASCADE, related_name="links")
