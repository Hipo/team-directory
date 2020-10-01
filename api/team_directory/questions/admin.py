from django.contrib import admin

from .models import Question, Answer


class QuestionAdmin(admin.ModelAdmin):

    list_display = ["id", "category", "body"]


class AnswerAdmin(admin.ModelAdmin):

    list_display = ["id", "user", "body", "question"]

admin.site.register(Question, QuestionAdmin)
admin.site.register(Answer, AnswerAdmin)
