from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework import mixins
from .models import CustomUser
from .serializers import UserModelSerializer
from rest_framework.permissions import IsAuthenticated


class UserModelView(GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin):
    queryset = CustomUser.objects.filter(is_superuser=False)
    serializer_class = UserModelSerializer

    permission_classes = [IsAuthenticated]
