from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework import mixins
from .models import User
from .serializers import UserModelSerializer


class UserModelView(GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
