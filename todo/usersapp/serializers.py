from dataclasses import fields
from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import CustomUser


class UserModelSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['uid', 'username', 'first_name', 'last_name', 'email']
        # fields = '__all__'


class UserNameModelSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['first_name']
