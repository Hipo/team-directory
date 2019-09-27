from celeryapp import app



@app.task()
def send_questions_to_slack():
    pass