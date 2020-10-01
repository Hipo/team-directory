from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import transaction
from django.utils import timezone
from slack import WebClient

from team_directory.questions.models import Question

TEAM_CHOICES = (
    ("ios", "iOS"),
    ("android", "Android"),
    ("backend", "Backend"),
    ("frontend", "Frontend"),
    ("qa", "QA"),
    ("design", "Design"),
    ("strategy", "Strategy"),
)


class User(AbstractUser):

    BOT_USER_SLACK_ID = "UNG50K5QB"

    slack_user_id = models.CharField(max_length=255, unique=True)
    slack_username = models.CharField(max_length=255)
    slack_access_token = models.CharField(max_length=255, blank=True)

    username = None
    email = models.EmailField(unique=True)

    image = models.CharField(max_length=255)
    timezone = models.CharField(max_length=255)

    team = models.CharField(max_length=255, choices=TEAM_CHOICES, blank=True)

    agora_initialized = models.BooleanField(default=False)
    agora_initialization_message_sent = models.BooleanField(default=False)
    agora_welcome_message_sent = models.BooleanField(default=False)

    birth_date = models.DateField(null=True, blank=True)
    phone_number = models.CharField(max_length=255, blank=True)

    last_question_asked = models.ForeignKey("questions.Question", on_delete=models.SET_NULL, null=True, blank=True)
    last_question_asked_datetime = models.DateTimeField(blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def send_agora_initialization_message(self, force=False):
        slack_login_url = f"https://slack.com/oauth/v2/authorize?client_id=2183021064.777838605158&user_scope=users:read,users:read.email,team:read&redirect_uri={settings.SLACK_REDIRECT_URL}"
        message = f"""
Hi, and welcome to the Agora of Hipo.

The Agora is a social gathering place, reserved for the Hipo team. It’s a spot where you get to know other team members, and tell them a bit more about yourself in a way that goes beyond simple information you can find elsewhere.

Let’s get you in! First, I’ll need you to log into Agora with your Hipo Slack account, so we can keep things private between Hipo members.

Click the button below, and I’ll see you when you’re done.

<{slack_login_url}|Connect Slack>
        """

        if not force and self.agora_welcome_message_sent:
            assert False, 'initialization message already sent.'

        assert self.is_active
        self.send_slack_message(text=message)
        self.agora_initialization_message_sent = True
        self.save()

    def send_slack_message(self, **kwargs):
        kwargs["as_user"] = True
        slack_client = WebClient(settings.SLACK_BOT_USER_ACCESS_TOKEN)
        slack_client.chat_postMessage(channel=self.slack_user_id, **kwargs)

    @transaction.atomic
    def send_next_question(self):
        exclude_question_ids = list(self.answers.values_list("question_id", flat=True))
        if self.last_question_asked:
            exclude_question_ids.append(self.last_question_asked_id)

        question = Question.objects.exclude(id__in=exclude_question_ids).order_by("?").first()

        if question:
            self.last_question_asked = question
            self.last_question_asked_datetime = timezone.now()
            self.save()
            self.send_slack_message(text=question.body)
        else:
            self.send_slack_message(text="Congrats! You have answered all the questions.")

    def clear_last_asked_question(self):
        self.last_question_asked = None
        self.last_question_asked_datetime = None
        self.save()


class OneLiner(models.Model):

    body = models.CharField(max_length=255)
    user = models.ForeignKey("users.User", related_name="one_liners", on_delete=models.CASCADE)
