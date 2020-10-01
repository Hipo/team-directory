from drf_extra_fields.relations import PresentablePrimaryKeyRelatedField

from rest_framework import serializers

from .models import Question, Answer


class QuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question
        fields = [
            "category",
            "body"
        ]


class AnswerSerializer(serializers.ModelSerializer):

    question = QuestionSerializer(read_only=True)

    class Meta:
        model = Answer
        fields = [
            "id",
            "question",
            "body"
        ]
