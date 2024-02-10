from django.http import HttpResponseNotFound
from django.shortcuts import render, redirect
from data.users import users

def main_page(request):
    return render(request, 'main_page.html')

def users_list(request):
    try:
        return render(request, 'users_list.html', {'users': users})
    except Exception as e:
        return HttpResponseNotFound("An error occurred while fetching user data")

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
            raise ValueError(f"User with ID {id} not found")
    except Exception as e:
        return HttpResponseNotFound("An error occurred while fetching user profile")
    
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
            print(e)
            return HttpResponseNotFound("Failed to create new user")
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
            raise ValueError(f"Entity with ID {id} not found")
    except Exception as e:
        return HttpResponseNotFound("An error occurred while deleting user")
    

def view_image(request):
    try:
        return render(request, 'image.html')
    except Exception as e:
        return HttpResponseNotFound("Image not found")
