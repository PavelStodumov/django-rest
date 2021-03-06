from requests import request
from rest_framework.viewsets import ModelViewSet

from usersapp.serializers import UserModelSerializer
from .models import Project, Todo
from .serializers import ProjectModelSerializer, TodoModelSerializer, TodoPostSeralizer
from .filters import ProjectFilter, TodoFilter
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class TodoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    filter_class = ProjectFilter
    pagination_class = ProjectLimitOffsetPagination


class TodoModelViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer
    pagination_class = TodoLimitOffsetPagination
    filter_class = TodoFilter

    def get_serializer_class(self):
        if self.action == 'create':
            self.serializer_class = TodoPostSeralizer
        return super().get_serializer_class()

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     instance.is_active = False
    #     instance.save()
    #     return Response(TodoModelSerializer(instance).data)
