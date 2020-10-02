import json
from datetime import timedelta

from django.db import transaction
from django.utils import timezone

import requests
from django.conf import settings
from rest_framework.authtoken.models import Token
from rest_framework.generics import RetrieveUpdateAPIView, GenericAPIView, RetrieveAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from slack import WebClient

from team_directory.projects.models import Project
from team_directory.questions.models import Answer
from .serializers import UserSerializer, UserMeSerializer, UserDetailSerializer
from .models import User, TEAM_CHOICES, OneLiner


class UsersView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def get_queryset(self):
        users = User.objects.all()
        if self.request.GET.get("team"):
            users = users.filter(team=self.request.GET.get("team"))

        if self.request.GET.get("project"):
            users = users.filter(project=self.request.GET.get("project"))

        if self.request.GET.get("search"):
            users = users.filter(first_name__icontains=self.request.GET.get("search"))

        return users


class UserDetailView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserDetailSerializer
    queryset = User.objects.all()


class UserMeView(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserMeSerializer

    def get_object(self, queryset=None):
        return self.request.user


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
        print(response_data)
        import ipdb; ipdb.set_trace()
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
                image=user_data["profile"].get("image_original") or "",
                timezone=user_data["tz"],
                agora_initialized=True,
            )
        else:
            user.slack_access_token = access_token
            user.agora_initialized = True
            user.save()

        if not user.agora_welcome_message_sent:
            slack_client = WebClient(settings.SLACK_BOT_USER_ACCESS_TOKEN)
            message = f"""
Welcome back, and nice to meet you {user.first_name}!

Slack already told me your name and gave me your avatar. If you want to change any of those, you can change them in your <{settings.WEB_APP_PROFILE_URL}|Slack Profile>  and it’ll get updated automatically on Agora.
            """
            slack_client.chat_postMessage(channel=user.slack_user_id, text=message, as_user=True)
            attachments = [
                {
                    "callback_id": "set_team",
                    "fallback": "What team are you a part of at Hipo? This helps teammates find you more easily.",
                    "actions": [
                        {
                            "type": "select",
                            "name": "set_team",
                            "text": "What team are you a part of at Hipo? This helps teammates find you more easily.",
                            "options": [
                                {
                                    "text": c[1],
                                    "value": c[0],
                                }
                                for c in TEAM_CHOICES
                            ]
                        }
                    ]
                }
            ]
            slack_client.chat_postMessage(channel=user.slack_user_id, text="What team are you a part of at Hipo? This helps teammates find you more easily.", attachments=attachments, as_user=True)
            user.agora_welcome_message_sent = True
            user.save()

        token, created = Token.objects.get_or_create(user=user)
        data = UserSerializer(user, context=self.get_serializer_context()).data
        data["token"] = token.key
        return Response(data)


class SlackInteractionsView(GenericAPIView):

    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        payload = json.loads(request.POST["payload"])
        user = User.objects.get(slack_user_id=payload["user"]["id"])
        had_team = user.team
        if payload["callback_id"] == "set_team":
            user.team = payload["actions"][0]["selected_options"][0]["value"]
            user.save()

            if not had_team:
                text = f"""
You’re now a proper resident of the Agora! Here’s what your <{settings.WEB_APP_PROFILE_URL}|Agora Profile> looks like.

I’ll also add this link to your Slack bio, so teammates can access it more easily. You’ll also see that everyone’s Slack bio is updated with their Agora profile.

From now on, every few days, I’ll be asking a quirky ice-breaker question about you. Your answers will be added to your Agora profile. The aim here is to get to know you in a way that regular social media cannot capture, and share it only with your coworkers.

If you want to keep answering these questions without waiting a few days, just message me with “question” and I’ll send a new one for you. If you don’t like a question, just type “skip” and you’ll see a new one.
            """
                slack_client = WebClient(settings.SLACK_BOT_USER_ACCESS_TOKEN)
                slack_client.chat_postMessage(channel=user.slack_user_id, text=text, as_user=True)
        elif payload["callback_id"] == "add_project":
            project = Project.objects.get(pk=payload["actions"][0]["selected_options"][0]["value"])
            project.users.add(user)
            requests.post(payload["response_url"], data=json.dumps({
                "text": f"Project `{project.name}` is added.",
                "replace_original": True
            }))
        elif payload["callback_id"] == "remove_project":
            project = Project.objects.get(pk=payload["actions"][0]["selected_options"][0]["value"])
            project.users.remove(user)
            requests.post(payload["response_url"], data=json.dumps({
                "text": f"Project `{project.name}` is removed.",
                "replace_original": True
            }))
        elif payload["callback_id"] == "remove_one_liner":
            one_liner = OneLiner.objects.get(user=user, pk=payload["actions"][0]["selected_options"][0]["value"])
            one_liner.delete()
            requests.post(payload["response_url"], data=json.dumps({
                "text": f"One-liner`{one_liner.body}` is removed.",
                "replace_original": True
            }))

        return Response()


class SlackEventsView(GenericAPIView):

    permission_classes = [AllowAny]

    @transaction.atomic
    def post(self, request, *args, **kwargs):
        if request.data.get("challenge"):
            # Activate events subscription.
            return Response(request.data["challenge"])

        event = request.data["event"]
        if event["type"] == "message" and event["user"] != User.BOT_USER_SLACK_ID:
            user = User.objects.get(slack_user_id=event["user"])
            message = event["text"]
            command = message.replace(" ", "").lower()
            if command in ["question", "skip"]:
                user.send_next_question()
            elif command in ["cancel"]:
                # Cancel active commands.
                user.clear_last_asked_question()
            elif command in ["selam", "hi"]:
                # Cancel active commands.
                user.clear_last_asked_question()
                user.send_slack_message(text=f"a.s")
            elif command in ["addproject"]:
                user.clear_last_asked_question()
                attachments = [
                    {
                        "callback_id": "add_project",
                        "fallback": "Add project.",
                        "actions": [
                            {
                                "type": "select",
                                "name": "add_project",
                                "text": "Add project.",
                                "options": [
                                    {
                                        "text": c[1],
                                        "value": c[0],
                                    }
                                    for c in Project.objects.values_list("id", "name")
                                ]
                            }
                        ]
                    }
                ]
                user.send_slack_message(attachments=attachments)
            elif command in ["removeproject"]:
                user.clear_last_asked_question()
                if not user.projects.exists():
                    user.send_slack_message(text="You don't have any project.")
                else:
                    attachments = [
                        {
                            "callback_id": "remove_project",
                            "fallback": "Remove project.",
                            "actions": [
                                {
                                    "type": "select",
                                    "name": "remove_project",
                                    "text": "Remove project.",
                                    "options": [
                                        {
                                            "text": c[1],
                                            "value": c[0],
                                        }
                                        for c in user.projects.values_list("id", "name")
                                    ]
                                }
                            ]
                        }
                    ]
                    user.send_slack_message(attachments=attachments)
            elif command in ["removeoneliner"]:
                user.clear_last_asked_question()
                if not user.one_liners.exists():
                    user.send_slack_message(text="You don't have any one-liner.")
                else:
                    attachments = [
                        {
                            "callback_id": "remove_one_liner",
                            "fallback": "Remove one-liner.",
                            "actions": [
                                {
                                    "type": "select",
                                    "name": "remove_one_liner",
                                    "text": "Remove one-liner.",
                                    "options": [
                                        {
                                            "text": c[1],
                                            "value": c[0],
                                        }
                                        for c in user.one_liners.values_list("id", "body")
                                    ]
                                }
                            ]
                        }
                    ]
                    user.send_slack_message(attachments=attachments)
            elif message.startswith("addoneliner"):
                user.clear_last_asked_question()
                one_liner = message.replace("addoneliner", "").strip()
                if not one_liner:
                    user.send_slack_message(text="Please provide one-liner. Sample command: addoneliner Lives in istanbul")
                else:
                    OneLiner.objects.create(user=user, body=one_liner)
                    user.send_slack_message(text=f"One-liner `{one_liner}` is added.")
            else:
                is_waiting_for_answer = user.last_question_asked_datetime and (user.last_question_asked_datetime > (timezone.now() - timedelta(minutes=5)))
                if is_waiting_for_answer:
                    Answer.objects.create(
                        question=user.last_question_asked,
                        body=message,
                        user=user
                    )
                    user.last_question_asked = None
                    user.last_question_asked_datetime = None
                    user.save()
                    user.send_slack_message(text=f"Good answer! I’ll save that in your <{settings.WEB_APP_PROFILE_URL}|Agora Profile>. If you want to change your answer, you can do it from there.")
                else:
                    user.clear_last_asked_question()
                    user.send_slack_message(text=self.get_help_text())

        return Response()

    def get_help_text(self):
        return "Available commands are: `addproject`, `removeproject`, `addoneliner`, `removeoneliner`, `cancel`, 'question' and 'skip'"
