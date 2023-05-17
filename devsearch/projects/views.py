from django.contrib import admin
from django.shortcuts import render
from django.http import HttpResponse


def projects(request):
    page = 'projects page'
    number = 100

    context = {
        'page': page,
        'number': number,
    }

    return render(request, 'projects/projects.html', context)

def project(request, pk):
    return render(request, 'projects/single-project.html')