from celeryapp import app



@app.task()
def send_question_to_slack():
    pass