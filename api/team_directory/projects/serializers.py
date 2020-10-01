from rest_framework import serializers

from team_directory.projects.models import Project


class ProjectSerializer(serializers.ModelSerializer):

    user_count = serializers.ReadOnlyField(source="users.count")

    class Meta:
        model = Project
        fields = [
            "id",
            "name",
            "user_count"
        ]
