# Generated by Django 2.2.5 on 2019-09-27 07:39

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Member',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slack_user_id', models.CharField(max_length=255)),
                ('slack_team_id', models.CharField(max_length=255)),
                ('name', models.CharField(max_length=255)),
                ('image', models.CharField(max_length=255)),
                ('timezone', models.CharField(max_length=255)),
                ('token', models.CharField(max_length=255)),
            ],
        ),
    ]