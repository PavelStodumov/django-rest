from uuid import uuid4
from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    uid = models.UUIDField(primary_key=True, default=uuid4)
    email = models.EmailField(unique=True)

    class Meta:
        ordering = ['username']

    def __str__(self):
        return f'{self.username}'
