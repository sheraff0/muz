from django.contrib import admin
from django.urls import path, re_path, include
#from django.views.generic import TemplateView
from rest_framework.authtoken.views import obtain_auth_token
from .api import router
from . import views

urlpatterns = [
    path('', views.index),
    path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
    path('auth/', obtain_auth_token),
    path('meta/', include('muz.meta')),
    re_path('^tycoon/.*$', views.tycoon),
    re_path('^diary/.*$', views.diary),
]
