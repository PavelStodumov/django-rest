from django.core.management.base import BaseCommand
from django.contrib.auth.models import User as superuser
from django.contrib.auth.hashers import make_password
from usersapp.models import User
import argparse


class Command(BaseCommand):
    help = 'Create superuser and test users'

    def add_arguments(self, parser):
        # parser = argparse.ArgumentParser()
        parser.add_argument(
            '--quantity', default=3, type=int)

    def handle(self, *args, **options):
        quantity_users = options['quantity']
        for i in range(1, quantity_users + 1):
            user = User(
                first_name=f'user{i}', last_name=f'user{i}_last', email=f'user{i}@localhost')
            user.save()

        s_user = superuser(
            username='admin', email='admin@localhost', password=make_password('admin'))
        s_user.is_superuser = True
        s_user.is_staff = True
        s_user.save()
