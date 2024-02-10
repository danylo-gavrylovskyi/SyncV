from django.http import HttpResponse

def setCookie(cookie_title: str, cookie_value: str, http_only: bool = False):
    if cookie_title and cookie_value is not None:
        response = HttpResponse(f'Cookie with title "{cookie_title}" and value "{cookie_value}" was set')
        response.set_cookie(cookie_title, cookie_value, httponly=http_only)
        return response
    else:
        return HttpResponse('Error: cookie title and/or cookie value was not specified')
    
def getCookie(request, cookieTitle: str):
    cookie_value = request.COOKIES.get(cookieTitle, 'Error: No such cookie')
    return HttpResponse(f'Cookie value: {cookie_value}')