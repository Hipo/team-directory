from drf_extra_fields.relations import PresentablePrimaryKeyRelatedField

from rest_framework import serializers

from team_directory.questions.serializers import AnswerSerializer
from .models import User
from team_directory.projects.models import Project
from team_directory.projects.serializers import ProjectSerializer


class UserSerializer(serializers.ModelSerializer):

    projects = PresentablePrimaryKeyRelatedField(queryset=Project.objects.all(), presentation_serializer=ProjectSerializer, many=True)

    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "team",
            "image",
            "timezone",
            "projects",
        ]


class UserDetailSerializer(UserSerializer):

    answers = AnswerSerializer(many=True)

    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "team",
            "image",
            "timezone",
            "projects",
            "answers",
        ]


class UserMeSerializer(UserSerializer):

    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "image",
            "timezone",
            "projects",
        ]
