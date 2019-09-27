from django.db import models


class Question(models.Model):
    QUESTION_TYPE_UPDATE = 'update'
    QUESTION_TYPE_INFORM = 'inform'

    QUESTION_TYPE_CHOICES = (
        (QUESTION_TYPE_UPDATE, 'update'),
        (QUESTION_TYPE_INFORM, 'inform')
    )

    type = models.CharField(choices=QUESTION_TYPE_CHOICES, max_length=255, null=True, blank=True)
    category = models.CharField(max_length=255, null=True, blank=True)
    body = models.TextField()


class Answer(models.Model):
    body = models.TextField()
    member = models.ForeignKey("members.Member", on_delete=models.CASCADE, related_name="answers")
    question = models.ForeignKey("questions.Question", on_delete=models.CASCADE, related_name="answers")
