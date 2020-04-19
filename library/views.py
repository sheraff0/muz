from rest_framework.authentication import TokenAuthentication
from .models import *
from .serializers import *
from muz.helpers import EnhancedModelViewSet

class PersonViewSet(EnhancedModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
    authentication_classes = (TokenAuthentication, )

class OpusViewSet(EnhancedModelViewSet):
    queryset = Opus.objects.all()
    serializer_class = OpusSerializer
    authentication_classes = (TokenAuthentication, )

class SourceViewSet(EnhancedModelViewSet):
    queryset = Source.objects.all()
    serializer_class = SourceSerializer
    authentication_classes = (TokenAuthentication, )

class SourceIndexViewSet(EnhancedModelViewSet):
    queryset = SourceIndex.objects.all()
    serializer_class = SourceIndexSerializer
    authentication_classes = (TokenAuthentication, )

class DrillViewSet(EnhancedModelViewSet):
    queryset = Drill.objects.all()
    serializer_class = DrillSerializer
    authentication_classes = (TokenAuthentication, )
