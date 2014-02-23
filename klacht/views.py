from django.shortcuts import render
from django.http import HttpResponse

def home(request):

    return render(request, 'home.html')

def bak(request, id):
    if request.POST:
        return HttpResponse('Formulier verzonden!')

    return render(request, 'bak.html', {'id': id})