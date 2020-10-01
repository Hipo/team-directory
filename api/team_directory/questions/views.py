from rest_framework.generics import UpdateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated

from .serializers import AnswerSerializer
from .models import Answer


class AnswerDetailView(UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = AnswerSerializer

    def get_queryset(self):
        return Answer.objects.filter(user=self.request.user)
