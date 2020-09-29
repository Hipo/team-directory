from drf_extra_fields.relations import PresentablePrimaryKeyRelatedField

from rest_framework import serializers

from .models import Question, Answer


class QuestionSerializer(serializers.ModelSerializer):

    class Meta:
        fields = '__all__'
        model = Question


class AnswerSerializer(serializers.ModelSerializer):
    question = PresentablePrimaryKeyRelatedField(queryset=Question.objects.all(), presentation_serializer=QuestionSerializer)

    class Meta:
        fields = '__all__'
        model = Answer
