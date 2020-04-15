from .models import *
from rest_framework import serializers
from muz.helpers import EnhancedModelSerializer

class PupilSerializer(EnhancedModelSerializer):
    class Meta:
        model = Pupil
        fields = '__all__'

class PupilFormSerializer(EnhancedModelSerializer):
    class Meta:
        model = PupilForm
        fields = '__all__'

class EventSerializer(EnhancedModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class EventPupilSerializer(EnhancedModelSerializer):
    class Meta:
        model = EventPupil
        fields = '__all__'

class TaskSerializer(EnhancedModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'