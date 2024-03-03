from django.contrib import admin
from django.urls import path
from .views import main_page, get_chat

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', main_page, name='main_page'),
    path('ws/', get_chat, name='chat'),
]
