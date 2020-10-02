from django.contrib import admin
from .models import *


@admin.register(Pupil)
class PupilAdmin(admin.ModelAdmin):
    pass


@admin.register(AcademicYear)
class AcademicYearAdmin(admin.ModelAdmin):
    pass


@admin.register(PupilForm)
class PupilFormAdmin(admin.ModelAdmin):
    pass


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    pass


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    pass