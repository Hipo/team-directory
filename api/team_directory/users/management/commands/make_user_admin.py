from django.conf import settings
from django.core.management.base import BaseCommand

from team_directory.users.models import User


class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument(
            '--email',
            dest='email',
        )

    def handle(self, *args, **options):
        assert settings.DEBUG
        user = User.objects.get(email=options["email"])
        user.is_staff = True
        user.is_superuser = True
        user.set_password("123123")
        user.save()
        print('User became an admin. Password is "123123"')
