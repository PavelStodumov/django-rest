from .models import Project, Todo
from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer, StringRelatedField
from usersapp.serializers import UserModelSerializer, UserNameModelSerializer
from rest_framework import serializers


class ProjectSimpleModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = ['name']


class ProjectModelSerializer(HyperlinkedModelSerializer):
    users = StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = ['name', 'link', 'users']


class TodoModelSerializer(ModelSerializer):
    user = UserNameModelSerializer()
    project = ProjectSimpleModelSerializer()
    created_at = serializers.DateTimeField(format='%d.%m.%Y %H:%M')
    updated_at = serializers.DateTimeField(format='%d.%m.%Y %H:%M')

    class Meta:
        model = Todo
        fields = ['id', 'project', 'text', 'user',
                  'created_at', 'updated_at', 'is_active']
