from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from .models import *
from .serializers import *
from muz.helpers import EnhancedModelViewSet

class PupilViewSet(EnhancedModelViewSet):
    queryset = Pupil.objects.all()
    serializer_class = PupilSerializer
    authentication_classes = (TokenAuthentication, )

class AcademicYearViewSet(EnhancedModelViewSet):
    queryset = AcademicYear.objects.all()
    serializer_class = AcademicYearSerializer
    authentication_classes = (TokenAuthentication, )

class PupilFormViewSet(EnhancedModelViewSet):
    queryset = PupilForm.objects.all()
    serializer_class = PupilFormSerializer
    authentication_classes = (TokenAuthentication, )

class EventViewSet(EnhancedModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    authentication_classes = (TokenAuthentication, )

class EventPupilViewSet(EnhancedModelViewSet):
    queryset = EventPupil.objects.all()
    serializer_class = EventPupilSerializer
    authentication_classes = (TokenAuthentication, )

class TaskViewSet(EnhancedModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    authentication_classes = (TokenAuthentication, )

class DiaryViewSet(EnhancedModelViewSet):
    queryset = PupilForm.objects.all()
    serializer_class = DiarySerializer
    authentication_classes = (TokenAuthentication, )
    def list(self, request):
        queryset = self.get_queryset()
        filter = {'pupil__user_id': request.user.id} if request.user.id > 1 else {}
        objects = queryset.filter(**filter)
        serializer = self.get_serializer(objects, many=True)
        return Response(serializer.data)