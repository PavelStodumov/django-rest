from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from authapp.views import MyTokenObtainPairView
from usersapp.views import UserModelView
from todoapp.views import ProjectModelViewSet, TodoModelViewSet
from rest_framework.authtoken import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register('users', UserModelView)
router.register('projects', ProjectModelViewSet)
router.register('todos', TodoModelViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('api-token-auth/', views.obtain_auth_token),
    # path('api/jwt_token/', TokenObtainPairView.as_view()),
    path('api/jwt_token/refresh/', TokenRefreshView.as_view()),
    path('api/jwt_token/', MyTokenObtainPairView.as_view()),
]
