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
    drill = DrillFULLSerializer()
    sources = SourceIndexFULLSerializer(many=True, read_only=True)
    class Meta:
        model = Task
        fields = '__all__'

class EventFULLSerializer(EnhancedModelSerializer):
    tasks = TaskFULLSerializer(many=True)
    event_type_verbose = serializers.SerializerMethodField()
    event_date_formatted = serializers.SerializerMethodField()
    event_time_formatted = serializers.SerializerMethodField()
    class Meta:
        model = Event
        fields = '__all__'
    def get_event_type_verbose(self, instance):
        et = instance.event_type
        try:
            return Event.EVENT_TYPES[et-1][1]
        except:
            return None
    def get_event_date_formatted(self, instance):
        return instance.event_date.strftime("%d.%m.%Y")
    def get_event_time_formatted(self, instance):
        return instance.event_time.strftime("%H:%M")

class PupilFormFULLSerializer(EnhancedModelSerializer):
    pupil = PupilSerializer(read_only=True)
    academic_year = AcademicYearSerializer(read_only=True)
    form_verbose = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = PupilForm
        fields = '__all__'
    def get_form_verbose(self, instance):
        course = instance.course
        form = instance.form
        courses_dict = { 
            1: str(form) + '-й класс (8)', 
            2: str(form) + '-й класс (4)', 
            3: 'подготовительное отделение' 
        }
        try:
            return courses_dict[course]
        except:
            return None

class EventTaskFULLSerializer(EnhancedModelSerializer):
    event = EventFULLSerializer(read_only=True)
    class Meta:
        model = EventPupil
        fields = '__all__'

class DiarySerializer(PupilFormFULLSerializer):
    events = EventTaskFULLSerializer(many=True, read_only=True)
