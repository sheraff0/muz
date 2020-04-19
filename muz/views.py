from django.shortcuts import render


def index(request):
    return render(request, "index.html")

def tycoon(request):
    return render(request, 'tycoon.html', {})