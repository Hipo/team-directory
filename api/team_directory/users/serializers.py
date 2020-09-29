from drf_extra_fields.relations import PresentablePrimaryKeyRelatedField

from rest_framework import serializers

from .models import User
from team_directory.projects.models import Project
from team_directory.projects.serializers import ProjectSerializer


class SimpleUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "image",
            "timezone",
        ]


class UserSerializer(SimpleUserSerializer):
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
        ]
