from celery.task import task
from django.conf import settings
from slack import WebClient

from team_directory.users.models import User


@task()
def sync_slack_users():
    # https://api.slack.com/methods/users.list
    slack_client = WebClient(settings.SLACK_BOT_USER_ACCESS_TOKEN)
    users = slack_client.api_call("users.list")["members"]
    for user in users:
        profile = user["profile"]

        if user["deleted"]:
            # User deleted from slack. Deactivate it.
            user = User.objects.filter(slack_user_id=user["id"]).first()  # Get or none.
            if user:
                user.is_active = False
                user.save()
            continue

        if user.get("is_bot"):
            continue

        if user.get("is_restricted"):
            continue

        if user.get("is_ultra_restricted"):
            continue

        if profile.get("first_name"):
            first_name = profile["first_name"]
            last_name = profile["last_name"]
        else:
            first_name = user["name"]
            last_name = ""

        if first_name == "slackbot":
            continue

        default_values = {
            'slack_username': user["name"],
            "first_name": first_name,
            "last_name": last_name,
            "image": profile.get("image_original") or "",
            "timezone": user["tz"] or "",
            'email': profile["email"],
        }
        User.objects.update_or_create(slack_user_id=user["id"], defaults=default_values)

    return "Slack users synced successfully."
