from dataclasses import fields
from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import User


class UserModelSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['uid', 'first_name', 'last_name', 'email']


class UserNameModelSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name']
