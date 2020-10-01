from rest_framework.generics import ListAPIView, GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from team_directory.projects.serializers import ProjectSerializer
from team_directory.projects.models import Project
from team_directory.users.models import TEAM_CHOICES, User


class ProjectsView(ListAPIView):

    permission_classes = [IsAuthenticated]
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()


class TeamsView(GenericAPIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):

        return Response({
            "results": [
                {
                    "id": c[0],
                    "name": c[1],
                    "user_count": User.objects.filter(team=c[0]).count()
                }
                for c in TEAM_CHOICES
            ]
        })
