from django.contrib import admin
from django.urls import path
from hw6 import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.main_page),
    path('user/', views.users_list),
    path('user/<int:id>/', views.user_profile),
    path('user/create/', views.create_user),
    path('user/<int:id>/delete/', views.delete_user),
    path('image/', views.view_image),  
    path('cookie/get/<str:cookieTitle>', views.get_cookie),
    path('cookie/set', views.set_cookie),
    path('header/get/<str:headerTitle>', views.get_header),
    path('header/set', views.set_header),
]
