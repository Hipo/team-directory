from rest_framework import serializers

from projects.models import Project, Team


class ProjectSerializer(serializers.ModelSerializer):

    class Meta:
        fields = '__all__'
        model = Project


class TeamSerializer(serializers.ModelSerializer):
    members = serializers.PrimaryKeyRelatedField(read_only=True, many=True)

    class Meta:
        fields = '__all__'
        model = Team