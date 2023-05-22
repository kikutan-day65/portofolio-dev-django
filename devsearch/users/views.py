from django.shortcuts import render

from .models import Profile

def profiles(request):
    profiles = Profile.objects.all()

    context = {
        'profiles': profiles
    }

    return render(request, 'users/profiles.html', context)


def user_profile(request, pk):

    context = {
        
    }

    return render(request, 'users/user_profile.html', context)