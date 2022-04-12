from django.contrib import admin
from django.urls import include, path, re_path
from rest_framework.routers import DefaultRouter
from authapp.views import MyTokenObtainPairView
from usersapp.views import UserModelView
from todoapp.views import ProjectModelViewSet, TodoModelViewSet
from rest_framework.authtoken import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from graphene_django.views import GraphQLView

schema_view = get_schema_view(
    openapi.Info(
        title='ToDo',
        default_version='0.1',
        description='Document for this project',
        contact=openapi.Contact(email='admin@localhost'),
        license=openapi.License(name='MIT Licese')
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

router = DefaultRouter()
router.register('users', UserModelView)
router.register('projects', ProjectModelViewSet)
router.register('todos', TodoModelViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'api/(?P<version>\d+\.\d+)/', include(router.urls)),

    # Authentication
    path('api-auth/', include('rest_framework.urls')),
    path('api-token-auth/', views.obtain_auth_token),
    path('api/jwt_token/refresh/', TokenRefreshView.as_view()),
    path('api/jwt_token/', MyTokenObtainPairView.as_view()),

    # GraphQl
    path('graphql/', GraphQLView.as_view(graphiql=True)),

    # Documentation
    re_path(r'^swagger(?P<format>\.json|\.yaml)$',
            schema_view.without_ui(cache_timeout=0)),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0)),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0)),
]
