from django.shortcuts import render
from django.http import HttpResponse
from .models import Klacht
import datetime, csv
import json


def home(request):
    reader = csv.DictReader(open('afvalbakken.csv'))
    bakken = json.dumps( [ row for row in reader ] )

    return render(request, 'home.html', {'bakken': bakken})

def bak(request, id):
    if request.POST:
        klacht = Klacht()
        klacht.afvalbak_id = int(id)
        klacht.datum = datetime.datetime.now()
        klacht.categorie = request.POST['categorie']
        klacht.save()
        return HttpResponse('Formulier verzonden!')

    return render(request, 'bak.html', {'id': id})