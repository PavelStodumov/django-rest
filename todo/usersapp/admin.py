from django.contrib import admin
from .models import CustomUser
from todoapp.models import Project, Todo
# Register your models here.
admin.site.register(CustomUser)
admin.site.register(Project)
admin.site.register(Todo)
