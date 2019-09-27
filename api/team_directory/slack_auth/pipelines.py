import requests

from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

from members.models import Member


def authenticate(request, data):
    if data['ok']:
        access_token = data.pop('access_token')
        user_id = data.pop('user_id')
        response = requests.get(
            url="https://slack.com/api/users.info",
            params={
                'token': access_token,
                'user': user_id,
                'include_local': 'true'
            }
        ).json()

        slack_user = response["user"]
        member = Member.objects.filter(slack_user_id=slack_user["id"])

        if not member.exists():
            user = User.objects.create(
                username=slack_user["name"]
            )
            member = Member.objects.create(
                slack_user_id=slack_user["id"],
                slack_team_id=slack_user["team_id"],
                user=user,
                name=slack_user["real_name"],
                image=slack_user["profile"]["image_original"],
                timezone=slack_user["tz"],
                token=access_token
            )

        else:
            user = member.first().user

    token, created = Token.objects.get_or_create(user=user)
    request.session["token"] = token.key

    return request, data
