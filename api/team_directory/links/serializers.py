from rest_framework import serializers

from links.models import Link


class LinkSerializer(serializers.ModelSerializer):

    class Meta:
        fields = '__all__'
        model = Link
