from django.conf.urls import include, url 
from django.contrib import admin
from django.views.generic import TemplateView
from rest_framework import routers
from . import views 
urlpatterns = [
    url(r'image/', views.takeAttendance, name="takeAttendance"),
]