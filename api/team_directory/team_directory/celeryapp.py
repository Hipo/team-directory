"""
Avoid naming this module as just `celery.py`, it will clash with the main celery package with Django 2.0's project structure.
Renaming to `celeryapp.py` is the most common approach. See https://www.google.es/search?q=%22celeryapp.py%22
"""

from __future__ import absolute_import, unicode_literals

from celery import Celery, schedules
from django.utils import timezone

app = Celery()
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()


app.conf.update(
    CELERYBEAT_SCHEDULE={
        'heartbeat': {
            'task': 'core.tasks.heartbeat',
            'schedule': timezone.timedelta(minutes=1),
        },
        'schedule_nudges': {
           'task': 'users.tasks.schedule_nudges',
           'schedule': schedules.crontab(minute='*', hour='*')
        }
    }
)
