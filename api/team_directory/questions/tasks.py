from celery.task import task
from slack import WebClient

from team_directory.users.models import User
from team_directory.questions.models import Question


@task()
def send_questions_to_slack():
    for user in User.objects.all():
        for question in Question.objects.all():
            token = user.token
            slack_client = WebClient(token)
            slack_client.chat_postMessage(
                channel="@" + user.user.username,
                text=question.body
            )
