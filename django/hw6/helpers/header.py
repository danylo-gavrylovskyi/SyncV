from django.http import HttpResponse

def setHeader(header_title: str, header_value: str):
    if header_title and header_value:
        response = HttpResponse(f'Header with title "{header_title}" and value "{header_value}" was set')
        response[header_title] = header_value
        return response
    else:
        return HttpResponse('Error: header title and/or value was not specified')
    
def getHeader(request, header_title: str):
    header_value = request.headers.get(header_title, 'Error: No such header')
    return HttpResponse(f'Header value: {header_value}')