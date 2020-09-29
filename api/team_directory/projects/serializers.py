from rest_framework import serializers

from team_directory.projects.models import Project


class ProjectSerializer(serializers.ModelSerializer):
    users = serializers.PrimaryKeyRelatedField(read_only=True, many=True)

    class Meta:
        fields = '__all__'
        model = Project

    def to_representation(self, instance):
        from team_directory.users.serializers import SimpleUserSerializer

        data = super(ProjectSerializer, self).to_representation(instance)
        data["users"] = SimpleUserSerializer(instance.users, many=True, context=self.context).data

        return data
