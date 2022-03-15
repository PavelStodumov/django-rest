from uuid import uuid4
from django.db import models


class User(models.Model):
    uid = models.UUIDField(primary_key=True, default=uuid4)
    last_name = models.CharField(max_length=64, verbose_name='Имя')
    first_name = models.CharField(max_length=64, verbose_name='Фамилия')
    age = models.PositiveIntegerField(blank=True, null=True)
    email = models.CharField(
        max_length=64, verbose_name='Электронная почта', unique=True)
