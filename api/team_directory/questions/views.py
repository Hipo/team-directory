from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated

from .serializers import QuestionSerializer, AnswerSerializer
from .models import Question, Answer


class QuestionsView(ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()


class QuestionDetailView(RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()


class AnswersView(ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = AnswerSerializer
    queryset = Answer.objects.all()


class AnswerDetailView(RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = AnswerSerializer
    queryset = Answer.objects.all()
