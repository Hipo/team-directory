from celeryapp import app
from slack import WebClient

from members.models import Member
from questions.models import Question


@app.task()
<<<<<<< HEAD
def send_questions_to_slack():
    pass
=======
def send_question_to_slack():
    for member in Member.objects.all():
        for question in Question.objects.all():
            token = member.token
            slack_client = WebClient(token)
            slack_client.chat_postMessage(
                channel="@" + member.user.username,
                text=question.body
            )
>>>>>>> 123fce96c84273eb4102710a5c9609988d6cbf52
