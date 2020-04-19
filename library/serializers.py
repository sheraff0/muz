from .models import *
from rest_framework import serializers
from muz.helpers import EnhancedModelSerializer

class PersonSerializer(EnhancedModelSerializer):
    class Meta:
        model = Person
        fields = '__all__'

class OpusSerializer(EnhancedModelSerializer):
    class Meta:
        model = Opus
        fields = '__all__'

class SourceIndexSerializer(EnhancedModelSerializer):
    class Meta:
        model = SourceIndex
        fields = '__all__'

class SourceSerializer(EnhancedModelSerializer):
    source_index = SourceIndexSerializer(many=True, read_only=True)
    class Meta:
        model = Source
        fields = '__all__'

class DrillSerializer(EnhancedModelSerializer):
    class Meta:
        model = Drill
        fields = '__all__'



# Detailes `diary` serializers

class OpusFULLSerializer(EnhancedModelSerializer):
    
    class Meta:
        model = Opus
        fields = '__all__'