from django.shortcuts import render

def tycoon(request):
    return render(request, 'tycoon.html', {})