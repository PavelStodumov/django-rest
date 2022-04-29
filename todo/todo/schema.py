from dataclasses import fields
from msilib import schema
from turtle import update
import graphene
from graphene_django import DjangoObjectType
from todoapp.models import Project, Todo
from usersapp.models import CustomUser


class UserType(DjangoObjectType):
    class Meta:
        model = CustomUser
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'


class TodoMutation(graphene.Mutation):
    class Arguments:
        text = graphene.String(required=True)
        id = graphene.ID()

    todo = graphene.Field(TodoType)

    @classmethod
    def mutate(cls, self, info, text, id):
        todo = Todo.objects.get(pk=id)
        todo.text = text
        todo.save()
        return TodoMutation(todo=todo)


class Mutation(graphene.ObjectType):
    update_todo = TodoMutation.Field()


class Query(graphene.ObjectType):
    all_users = graphene.List(UserType)
    all_projects = graphene.List(ProjectType)
    all_todos = graphene.List(TodoType)
    project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=True))
    projects_by_user_name = graphene.List(
        ProjectType, user_name=graphene.String())

    def resolve_all_users(root, info):
        return CustomUser.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_todos(self, info):
        return Todo.objects.all()

    def resolve_project_by_id(self, info, id):
        try:
            return Project.objects.get(pk=id)
        except Project.DoesNotExist:
            return None

    def resolve_projects_by_user_name(self, info, user_name=None):
        if user_name:
            try:
                return Project.objects.filter(users__username=user_name)
            except Project.DoesNotExist:
                return None


schema = graphene.Schema(query=Query, mutation=Mutation)
