from django.db import models

class Klacht(models.Model):
    afvalbak_id = models.IntegerField()
    datum = models.DateTimeField()

    categorie = models.CharField(max_length=128, choices=(
        ('vol', 'Vol'),
        ('defect', 'Werkt niet'),
        ('anders', 'Anders'),
    ))

    opmerking = models.CharField(max_length=256)

    # foto = models.ImageField(upload_to='fotos')

    status = models.CharField(max_length=128, choices=(
        ('gemeld', 'Gemeld'),
        ('onderzocht', 'Wordt onderzocht'),
        ('ingepland', 'Ingepland'),
        ('opgelost', 'Opgelost'),
    ))

    email = models.CharField(max_length=256)