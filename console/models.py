# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Pratica(models.Model):
    pratica = models.IntegerField(unique=True)

    class Meta:
        ordering = ['pratica']

    nome = models.TextField()
    indirizzo = models.TextField()
    pianta = models.FileField()
    edit = models.ManyToManyField(User, related_name='edit')
    read = models.ManyToManyField(User, related_name='read')



