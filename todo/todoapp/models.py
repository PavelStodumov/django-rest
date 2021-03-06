from django.db import models
from usersapp.models import CustomUser


class Project(models.Model):
    name = models.CharField(verbose_name='Название проекта', max_length=128)
    link = models.URLField(verbose_name='Ссылка', blank=True, null=True)
    users = models.ManyToManyField(CustomUser, verbose_name='Пользователи')

    def __str__(self):
        return self.name


class Todo(models.Model):
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, verbose_name='Название проекта')
    text = models.TextField()
    created_at = models.DateTimeField(auto_now=True, editable=True,
                                      verbose_name='Дата создания', blank=True, null=True)
    updated_at = models.DateTimeField(auto_now_add=True, editable=True,
                                      verbose_name='Дата обновления', blank=True, null=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    is_active = models.BooleanField(
        default=True, verbose_name='Активна', null=True)

    def __str__(self):
        return self.project.name
