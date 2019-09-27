from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated

from projects.serializers import ProjectSerializer, TeamSerializer
from projects.models import Project, Team


class ProjectsView(ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()


class ProjectDetailView(RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()


class TeamsView(ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = TeamSerializer
    queryset = Team.objects.all()


class TeamDetailView(RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = TeamSerializer
    queryset = Team.objects.all()
