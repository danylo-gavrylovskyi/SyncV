from django.http import HttpResponseNotFound
from django.shortcuts import render, redirect

def main_page(request):
    return render(request, 'main_page.html')
    
def get_chat(request):
    return render(request, 'chat.html')
