from .models import Project, Todo
from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer
from usersapp.serializers import UserModelSerializer


class ProjectSimpleModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = ['name']


class ProjectModelSerializer(HyperlinkedModelSerializer):
    users = UserModelSerializer(many=True)

    class Meta:
        model = Project
        fields = ['name', 'link', 'users']


class TodoModelSerializer(ModelSerializer):
    user = UserModelSerializer()
    project = ProjectSimpleModelSerializer()

    class Meta:
        model = Todo
        fields = ['project', 'text', 'user', 'created_at', 'updated_at']
