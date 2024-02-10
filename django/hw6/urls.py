from django.contrib import admin
from django.urls import path
from .views import main_page, users_list, user_profile, create_user, delete_user, view_image

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', main_page, name='main_page'),
    path('user/', users_list, name='users_list'),
    path('user/<int:id>/', user_profile, name='user_profile'),
    path('user/create/', create_user, name='create_user'),
    path('user/<int:id>/delete/', delete_user, name='delete_user'),
    path('image/', view_image, name='view_image'),  
]
