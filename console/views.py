from django.shortcuts import render, get_object_or_404

import textwrap
import json
from django.http import HttpResponse
from django.views.generic.base import View
from console.models import Pratica
from django.http import *
from django.shortcuts import redirect
from django.template import RequestContext
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.views.decorators.cache import never_cache
from django.core import serializers
from django import template
from .forms import PraticaForm
from django.contrib.auth.models import User
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.forms import PasswordChangeForm

from channels.layers import get_channel_layer

from asgiref.sync import async_to_sync


@never_cache
def login_user(request):
    logout(request)
    username = password = ''
    if request.POST:
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(username=username, password=password)

        request.session.set_expiry(60 * 60 * 8)
        if user is not None:

            if user.is_active:
                login(request, user)
                return HttpResponseRedirect('/')

        else:

            messages.error(request, 'credenziali errate')
            return redirect('/login')

    return render(request, 'login.html')


def logout_user(request):
    logout(request)
    return HttpResponseRedirect('/')


@login_required(login_url='login/')
def pratiche(request):
    objs = Pratica.objects.filter(read=request.user)
    username = request.user
    fields = Pratica._meta.get_fields(include_parents=True, include_hidden=False)[1:-2]
    guests = User.objects.filter(is_superuser=0)
    users = []
    for i in range(guests.count()):
        if Pratica.objects.filter(read=guests[i]).count() != 0:
            pratiche_guest = (Pratica.objects.filter(read=guests[i]))
        else:
            pratiche_guest = [{"pratica": "Nessuna"}]

        users.append({"username": guests[i], "id": guests[i].id, "accesso": pratiche_guest})

    if request.user.is_superuser:
        return render(request, 'home-super.html',
                      {'objs': objs, 'fields': fields, 'username': username, 'users': users})
    else:
        return render(request, 'home.html', {'objs': objs, 'fields': fields, })


def model_edit(request, n_pratica):
    obj = get_object_or_404(Pratica, pratica=n_pratica)
    users = (list(obj.read.all().values_list('username', flat=True).distinct()))

    if request.method == 'POST':
        post_nome = request.POST.get('nome')
        post_indirizzo = request.POST.get('indirizzo')

        response_data = {}
        obj.nome = post_nome
        obj.indirizzo = post_indirizzo
        obj.save()

        response_data['result'] = 'Post successful edited!'
        response_data['nome'] = post_nome
        response_data['indirizzo'] = post_indirizzo

        channel_layer = get_channel_layer()
        for user in users:
            async_to_sync(channel_layer.group_send)(user,
                                                    {"type": "pratica.update",
                                                     "pratica": n_pratica,
                                                     "nome": post_nome,
                                                     "indirizzo": post_indirizzo,
                                                     }, )

        return HttpResponse(
            json.dumps(response_data),
            content_type="application/json"
        )
    else:
        return HttpResponse(
            json.dumps({"nothing to see": "this isn't happening"}),
            content_type="application/json"
        )


def change_password(request):
    if request.method == 'POST':

        old_pass = request.POST.get('oldpassword')
        new_pass = request.POST.get('newpassword')
        response_data = {}

        if request.user.check_password(old_pass):
            request.user.set_password(new_pass)  # replace with your real password
            request.user.save()
            response_data['result'] = 'Password changed successful!'
            update_session_auth_hash(request, request.user)  # Important!

        else:
            raise Exception('Password Errata')

        return HttpResponse(
            json.dumps(response_data),
            content_type="application/json"
        )
    else:
        return HttpResponse(
            json.dumps({"nothing to see": "this isn't happening"}),
            content_type="application/json"
        )


def change_username(request):
    if request.method == 'POST':

        new_username = request.POST.get('username')

        response_data = {}

        if not (request.user.is_superuser):
            response_data = {}
            response_data['result'] = 'Not superuser. Cannot change username!'
            return HttpResponse(
                json.dumps(response_data),
                content_type="application/json"
            )

        else:
            request.user.username = new_username  # replace with your real password
            request.user.save()
            response_data['result'] = 'Username changed successful!'
            update_session_auth_hash(request, request.user)  # Important!

            return HttpResponse(
                json.dumps(response_data),
                content_type="application/json"
            )
    else:
        return HttpResponse(
            json.dumps({"nothing to see": "this isn't happening"}),
            content_type="application/json"
        )


def guest_edit(request, n_user):
    if request.method == 'POST':
        checked = json.loads(request.POST.get('checked'))
        unchecked = json.loads(request.POST.get('unchecked'))

        print(checked)

        for a in checked:
            obj = get_object_or_404(Pratica, pratica=a)
            obj.read.add(n_user)

        for a in unchecked:
            obj = get_object_or_404(Pratica, pratica=a)
            obj.read.remove(n_user)

        response_data = {}

        return HttpResponse(
            json.dumps(response_data),
            content_type="application/json"
        )
    else:
        return HttpResponse(
            json.dumps({"nothing to see": "this isn't happening"}),
            content_type="application/json"
        )


def model_delete(request, n_pratica):
    obj = get_object_or_404(Pratica, pratica=n_pratica)
    users = (list(obj.read.all().values_list('username', flat=True).distinct()))

    if request.method == 'POST':

        obj.delete()
        response_data = {'result': 'Deletion post successful!'}
        channel_layer = get_channel_layer()
        for user in users:
            async_to_sync(channel_layer.group_send)(user,
                                                    {"type": "pratica.del",
                                                     "pratica": n_pratica,
                                                     }, )

        return HttpResponse(
            json.dumps(response_data),
            content_type="application/json"
        )
    else:
        return HttpResponse(
            json.dumps({"nothing to see": "this isn't happening"}),
            content_type="application/json"
        )


def model_add(request):
    if request.method == 'POST':
        if not (request.user.is_superuser):

            response_data = {}
            response_data['result'] = 'Not superuser. Cannot create posts!'
            return HttpResponse(
                json.dumps(response_data),
                content_type="application/json"
            )

        else:
            post_pratica = request.POST.get('pratica')
            post_nome = request.POST.get('nome')
            post_indirizzo = request.POST.get('indirizzo')
            users = User.objects.filter(is_superuser=1)
            user_usernames = list(User.objects.filter(is_superuser=1).values_list('username', flat=True).distinct())
            response_data = {}
            post = Pratica(pratica=post_pratica, nome=post_nome, indirizzo=post_indirizzo)
            post.save()
            for user in users:
                post.edit.add(user.id)
                post.read.add(user.id)
            post.edit.add(request.user)
            post.read.add(request.user)

            response_data['result'] = 'Create post successful!'
            response_data['pratica'] = post.pratica
            response_data['nome'] = post.nome
            response_data['indirizzo'] = post.indirizzo
            channel_layer = get_channel_layer()
            for user in user_usernames:
                async_to_sync(channel_layer.group_send)(user,
                                                        {"type": "pratica.add",
                                                         "pratica": post_pratica,
                                                         "nome": post_nome,
                                                         "indirizzo": post_indirizzo,
                                                         }
                                                        , )

            return HttpResponse(
                json.dumps(response_data),
                content_type="application/json"
            )
    else:
        return HttpResponse(
            json.dumps({"nothing to see": "this isn't happening"}),
            content_type="application/json"
        )
