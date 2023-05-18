from django.contrib import admin
from django.shortcuts import render

from .models import Project
from .forms import ProjectForm

def projects(request):
    projects = Project.objects.all()

    context = {
        'projects': projects,
    }

    return render(request, 'projects/projects.html', context)

def project(request, pk):
    projectObj = Project.objects.get(id=pk)

    context = {
        'project': projectObj,
    }

    return render(request, 'projects/single-project.html', context)

def create_project(request):
    form = ProjectForm()

    context = {
        'form': form,
    }

    return render(request, 'projects/project_form.html', context)