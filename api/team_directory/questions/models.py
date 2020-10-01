from django.db import models


class Question(models.Model):

    QUESTION_CATEGORY_CHOICES = (
        ('childhood', 'Childhood'),
        ('what_if', 'What if...'),
        ('lifestyle', 'Lifestyle'),
        ('work_experience', 'Work Experience'),
        ('hobbies', 'Hobbies')
    )

    category = models.CharField(max_length=255, choices=QUESTION_CATEGORY_CHOICES)
    body = models.TextField()

    def __str__(self):
        return self.body


class Answer(models.Model):
    body = models.TextField()
    user = models.ForeignKey("users.User", on_delete=models.CASCADE, related_name="answers")
    question = models.ForeignKey("questions.Question", on_delete=models.CASCADE, related_name="answers")

    def __str__(self):
        return self.body
