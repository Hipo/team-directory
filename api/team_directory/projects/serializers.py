from rest_framework import serializers

from projects.models import Project, Team


class ProjectSerializer(serializers.ModelSerializer):
    members = serializers.PrimaryKeyRelatedField(read_only=True, many=True)

    class Meta:
        fields = '__all__'
        model = Project

    def to_representation(self, instance):
        from members.serializers import SimpleMemberSerializer

        data = super(ProjectSerializer, self).to_representation(instance)
        data["members"] = SimpleMemberSerializer(instance.members, many=True, context=self.context).data

        return data


class TeamSerializer(serializers.ModelSerializer):
    members = serializers.PrimaryKeyRelatedField(read_only=True, many=True)

    class Meta:
        fields = '__all__'
        model = Team

    def to_representation(self, instance):
        from members.serializers import SimpleMemberSerializer

        data = super(TeamSerializer, self).to_representation(instance)
        data["members"] = SimpleMemberSerializer(instance.members, many=True, context=self.context).data

        return data
