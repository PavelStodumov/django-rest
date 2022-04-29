
from .models import Project, Todo
from rest_framework.serializers import ModelSerializer, StringRelatedField
from usersapp.serializers import UserNameModelSerializer
from rest_framework import serializers


class ProjectNameModelSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = ['name']


class ProjectModelSerializer(ModelSerializer):
    users = StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = ['name', 'link', 'users']


class TodoModelSerializer(ModelSerializer):
    user = UserNameModelSerializer()
    project = ProjectNameModelSerializer()
    created_at = serializers.DateTimeField(
        format='%d.%m.%Y %H:%M', read_only=True)
    updated_at = serializers.DateTimeField(
        format='%d.%m.%Y %H:%M', read_only=True)

    class Meta:
        model = Todo
        fields = ['id', 'project', 'text', 'user',
                  'created_at', 'updated_at', 'is_active']
