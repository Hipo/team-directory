from rest_framework import serializers

from questions.models import Question, Answer


class QuestionSerializer(serializers.ModelSerializer):

    class Meta:
        fields = '__all__'
        model = Question


class AnswerSerializer(serializers.ModelSerializer):

    class Meta:
        fields = '__all__'
        model = Answer
