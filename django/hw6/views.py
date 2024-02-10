from django.http import HttpResponseNotFound, HttpResponseServerError
from django.shortcuts import render, redirect
from data.users import users
from hw6.helpers import cookie, header

def main_page(request):
    return render(request, 'main_page.html')

def users_list(request):
    try:
        return render(request, 'users_list.html', {'users': users})
    except Exception as e:
        return HttpResponseServerError("An error occurred while fetching user data")

def user_profile(request, id):
    try:
        user = None
        for u in users:
            if (u.get('id') == int(id)):
                user = u
                break

        if user:
            return render(request, 'user_profile.html', {'user': user})
        else:
            return HttpResponseNotFound(f"User with ID {id} not found")
    except Exception as e:
        return HttpResponseServerError("An error occurred while fetching user profile")
    
def create_user(request):
    if request.method == 'POST':
        try:
            fullname = request.POST.get('fullname')
            email = request.POST.get('email')
            password = request.POST.get('password')

            new_user = {'id': len(users) + 1, 'fullname': fullname, 'email': email, 'password': password}
            users.append(new_user)

            return redirect('users_list')
        except Exception as e:
            return HttpResponseServerError("Failed to create new user")
    return render(request, 'create_user.html')

def delete_user(request, id):
    try:
        global users
        user = None
        for u in users:
            if (u.get('id') == int(id)):
                user = u
                break

        if user:
            users = list(filter(lambda e: e['id'] != int(id), users))
            return redirect('users_list')
        else:
            return HttpResponseNotFound(f"Entity with ID {id} not found")
    except Exception as e:
        return HttpResponseServerError("An error occurred while deleting user")
    
def view_image(request):
    try:
        return render(request, 'image.html')
    except Exception as e:
        return HttpResponseNotFound("Image not found")
    
# http://localhost:8000/cookie/get/my
def get_cookie(request, cookieTitle: str):
    try:
        return cookie.getCookie(request, cookieTitle)
    except Exception as e:
        return HttpResponseServerError("An error occurred while getting cookie")

# http://localhost:8000/cookie/set?cookieTitle=my&cookieValue=favorite
def set_cookie(request):
    try:
        cookie_title: str = request.GET.get('cookieTitle')
        cookie_value: str = request.GET.get('cookieValue')
        http_only: bool = request.GET.get('httpOnly') == 'true'
        return cookie.setCookie(cookie_title, cookie_value, http_only)
    except Exception as e:
        return HttpResponseServerError("An error occurred while setting cookie")

# http://localhost:8000/header/get/connection
def get_header(request, headerTitle: str):
    try:
        return header.getHeader(request, headerTitle)
    except Exception as e:
        return HttpResponseServerError("An error occurred while getting header")

# http://localhost:8000/header/set?headerTitle=my&headerValue=favorite
def set_header(request):
    try:
        header_title: str = request.GET.get('headerTitle')
        header_value: str = request.GET.get('headerValue')
        return header.setHeader(header_title, header_value)
    except Exception as e:
        return HttpResponseServerError("An error occurred while setting header")
