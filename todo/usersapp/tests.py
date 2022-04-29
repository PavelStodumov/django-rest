from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient
from mixer.backend.django import mixer
from .views import UserModelView
from .models import CustomUser


class TestUserModelView(TestCase):
    def test_get_user_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = UserModelView.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_user_admin(self):
        factory = APIRequestFactory()
        request = factory.post(
            '/api/users/', {'username': 'user', 'email': 'user@localhost'}, format='json')
        admin = CustomUser.objects.create_superuser(
            'admin', 'admin@localhost', 'admin')
        force_authenticate(request, admin)
        view = UserModelView.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_user_user(self):
        factory = APIRequestFactory()
        request = factory.post(
            '/api/users/', {'username': 'user', 'email': 'user@localhost'}, format='json')
        user = CustomUser.objects.create_user(
            username='user1', email='user1@localhost', password='user1')
        force_authenticate(request, user)
        view = UserModelView.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_user_guest(self):
        factory = APIRequestFactory()
        request = factory.post(
            '/api/users/', {'username': 'user', 'email': 'user@localhost'}, format='json')
        view = UserModelView.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_detail_user(self):
        user = mixer.blend(CustomUser)
        client = APIClient()
        response = client.get(f'/api/users/{user.uid}/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_user_guest(self):
        user = mixer.blend(CustomUser)
        client = APIClient()
        response = client.put(
            f'/api/users/{user.uid}/', {'username': 'vasiliy'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_user_admin(self):
        admin = CustomUser.objects.create_superuser(
            'admin', 'admin@localhost', 'admin')
        user = CustomUser.objects.create_user(
            username='user', email='user@localhost', password='user')
        client = APIClient()
        client.login(username='admin', password='admin')
        response = client.put(
            f'/api/users/{user.uid}/', {'username': 'vasiliy', 'email': 'vasiliy@localhost'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_user_user(self):
        user = CustomUser.objects.create(
            username='user', email='user@localhost', password='user')
        updated_user = mixer.blend(CustomUser)
        client = APIClient()
        client.login(username='user', password='user')
        response = client.put(
            f'/api/users/{updated_user.uid}/', {'username': 'vasiliy', 'email': 'vasiliy@localhost'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
