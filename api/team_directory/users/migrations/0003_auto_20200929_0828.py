# Generated by Django 2.2.5 on 2020-09-29 08:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_auto_20200928_1349'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='agora_initialization_message_sent',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='user',
            name='agora_initialized',
            field=models.BooleanField(default=False),
        ),
    ]
