
from http import client
from urllib import response
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Project, Todo
from mixer.backend.django import mixer
from usersapp.models import CustomUser


class TestProjectsViewSet(APITestCase):

    def setUp(self):
        self.admin = CustomUser.objects.create_superuser(
            'admin', 'admin@localhost', 'admin')
        self.project = mixer.blend(Project)

    def test_get_list(self):
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_project(self):
        response = self.client.get(f'/api/projects/{self.project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_guest(self):
        response = self.client.post('/api/projects/', {'name': 'new_project'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_post_admin(self):
        self.client.login(username='admin', password='admin')
        response = self.client.post('/api/projects/', {'name': 'new_project'})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_put_guest(self):
        response = self.client.put(
            f'/api/projects/{self.project.id}/', {'name': 'new_project'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_put_admin(self):
        self.client.login(username='admin', password='admin')
        response = self.client.put(
            f'/api/projects/{self.project.id}/', {'name': 'new_project'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
