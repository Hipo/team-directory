from drf_extra_fields.relations import PresentablePrimaryKeyRelatedField

from rest_framework import serializers

from team_directory.questions.serializers import AnswerSerializer
from .models import User, OneLiner
from team_directory.projects.models import Project
from team_directory.projects.serializers import ProjectSerializer


class OneLinerSerializer(serializers.Serializer):

    class Meta:
        model = OneLiner
        fields = [
            "id",
            "body"
        ]


class UserSerializer(serializers.ModelSerializer):

    projects = ProjectSerializer(many=True)
    one_liners = OneLinerSerializer(many=True)

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
            "one_liners",
            "birth_date",
            "phone_number",
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
            "one_liners",
            "birth_date",
            "phone_number",
        ]


class UserMeSerializer(UserSerializer):

    projects = PresentablePrimaryKeyRelatedField(queryset=Project.objects.all(), presentation_serializer=ProjectSerializer, many=True)

    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "image",
            "timezone",
            "projects",
            "birth_date",
            "phone_number",
        ]
