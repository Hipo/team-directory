from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated

from members.serializers import MemberSerializer
from members.models import Member


class MembersView(ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = MemberSerializer
    queryset = Member.objects.all()


class MemberDetailView(RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = MemberSerializer
    queryset = Member.objects.all()


class MyMemberDetailView(RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = MemberSerializer
    queryset = Member.objects.all()

    def get_object(self, queryset=None):
        obj = Member.objects.get(user=self.request.user)
        return obj
