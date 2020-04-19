from .models import *
from rest_framework import serializers
from muz.helpers import EnhancedModelSerializer
from library.serializers import *

class PupilSerializer(EnhancedModelSerializer):
    class Meta:
        model = Pupil
        fields = '__all__'

class AcademicYearSerializer(EnhancedModelSerializer):
    class Meta:
        model = AcademicYear
        fields = '__all__'

class PupilFormSerializer(EnhancedModelSerializer):
    class Meta:
        model = PupilForm
        fields = '__all__'

class TaskSerializer(EnhancedModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

class EventSerializer(EnhancedModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class EventPupilSerializer(EnhancedModelSerializer):
    class Meta:
        model = EventPupil
        fields = '__all__'




# Detailed `diary` serializer

class TaskFULLSerializer(EnhancedModelSerializer):
    opus = OpusFULLSerializer()
    drill = DrillSerializer()
    class Meta:
        model = Task
        fields = '__all__'

class EventFULLSerializer(EnhancedModelSerializer):
    tasks = TaskFULLSerializer(many=True)
    class Meta:
        model = Event
        fields = '__all__'

class PupilFormFULLSerializer(EnhancedModelSerializer):
    pupil = PupilSerializer()
    academic_year = AcademicYearSerializer()
    class Meta:
        model = PupilForm
        fields = '__all__'

class EventTaskFULLSerializer(EnhancedModelSerializer):
    event = EventFULLSerializer()
    class Meta:
        model = EventPupil
        fields = '__all__'

class DiarySerializer(PupilFormFULLSerializer):
    events = EventTaskFULLSerializer(many=True)
