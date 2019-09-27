from rest_framework import serializers

from members.models import Member


class MemberSerializer(serializers.ModelSerializer):
    projects = serializers.PrimaryKeyRelatedField(read_only=True, many=True)
    links = serializers.PrimaryKeyRelatedField(read_only=True, many=True)

    class Meta:
        fields = '__all__'
        model = Member
