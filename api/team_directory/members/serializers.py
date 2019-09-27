from drf_extra_fields.relations import PresentablePrimaryKeyRelatedField

from rest_framework import serializers

from members.models import Member
from projects.models import Project, Team
from projects.serializers import ProjectSerializer, TeamSerializer
from links.models import Link
from links.serializers import LinkSerializer


class MemberSerializer(serializers.ModelSerializer):
    projects = PresentablePrimaryKeyRelatedField(queryset=Project.objects.all(), presentation_serializer=ProjectSerializer, many=True)
    links = PresentablePrimaryKeyRelatedField(queryset=Link.objects.all(), presentation_serializer=LinkSerializer, many=True)
    team = PresentablePrimaryKeyRelatedField(queryset=Team.objects.all(), presentation_serializer=TeamSerializer)

    class Meta:
        fields = '__all__'
        model = Member
