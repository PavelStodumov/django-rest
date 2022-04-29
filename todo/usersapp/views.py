
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework import mixins
from .models import CustomUser
from .serializers import UserModelSerializer, UserNameModelSerializer, UserFullSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser


class UserModelView(GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.CreateModelMixin):
    queryset = CustomUser.objects.filter(is_superuser=False)

    def get_permissions(self):
        if self.action in ('update', 'create'):
            self.permission_classes = [IsAdminUser, ]
        elif self.action == 'retrieve':
            self.permission_classes = [IsAuthenticated]
        return super(self.__class__, self).get_permissions()

    def get_serializer_class(self):
        print(self.request.version)
        if self.request.version == '0.1':
            return UserFullSerializer
        return UserNameModelSerializer
