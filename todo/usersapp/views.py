from urllib import request
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework import mixins
from .models import CustomUser
from .serializers import UserModelSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser


class UserModelView(GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.CreateModelMixin):
    queryset = CustomUser.objects.filter(is_superuser=False)
    serializer_class = UserModelSerializer
    # permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action in ('update', 'create'):
            self.permission_classes = [IsAdminUser, ]
        elif self.action == 'retrieve':
            self.permission_classes = [IsAuthenticated]
        print(self.action)
        return super(self.__class__, self).get_permissions()
