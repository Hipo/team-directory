import requests
from django.conf import settings
from rest_framework.authtoken.models import Token
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView, GenericAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from .serializers import UserSerializer
from .models import User


class UsersView(ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer
    queryset = User.objects.all()


class UserDetailView(RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer
    queryset = User.objects.all()


class MyUserDetailView(RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_object(self, queryset=None):
        obj = User.objects.get(user=self.request.user)
        return obj


class AuthenticationView(GenericAPIView):

    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        code = request.data["code"]
        params = {
            'client_id': settings.SLACK_CLIENT_ID,
            'client_secret': settings.SLACK_CLIENT_SECRET,
            'code': code,
            'redirect_uri': settings.SLACK_REDIRECT_URL,
        }
        response_data = requests.get("https://slack.com/api/oauth.v2.access", params=params).json()

        assert response_data["app_id"] == "ANVQNHT4N"

        access_token = response_data["authed_user"]["access_token"]
        slack_user_id = response_data["authed_user"]["id"]

        user = User.objects.filter(slack_user_id=slack_user_id).first()

        if not user:
            user_data = requests.get(
                url="https://slack.com/api/users.info",
                params={
                    'token': access_token,
                    'user': slack_user_id,
                    'include_local': 'true'
                }
            ).json()["user"]

            user = User.objects.create(
                slack_user_id=user_data["id"],
                slack_access_token=access_token,
                slack_username=user_data["name"],
                email=user_data["profile"]["email"],
                first_name=user_data["profile"].get("first_name") or user_data["name"],
                last_name=user_data["profile"].get("last_name") or "",
                image=user_data["profile"]["image_original"],
                timezone=user_data["tz"],
                agora_initialized=True,
            )
        else:
            user.slack_access_token = access_token
            user.agora_initialized = True
            user.save()

        token, created = Token.objects.get_or_create(user=user)
        data = UserSerializer(user, context=self.get_serializer_context()).data
        data["token"] = token.key
        return Response(data)
