from django.http import HttpResponse
from django.db.models import F
import json
from django.core import serializers
from rest_framework.serializers import ModelSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response

def cook_data(response_data):
    return HttpResponse(
        json.dumps(
            response_data,
            ensure_ascii=False,
            default=lambda output: '<non-serializable>'
        ), content_type="application/json")

class EnhancedModelSerializer(ModelSerializer):
    def to_representation(self, instance):
        item = super().to_representation(instance)
        item['verbose_name'] = instance.__str__()
        return item

class EnhancedModelViewSet(ModelViewSet):
    @action(detail=False, methods=['GET'])
    def shortlist(self, request):
        queryset = self.get_queryset()
        objects = [ [x.id, x.__str__()] 
            for x in queryset ]
        return Response(objects)

    @action(detail=False, methods=['DELETE'])
    def destroy_list(self, request):
        ids = request.data.pop('ids', [])
        self.get_queryset().filter(id__in=ids).delete()
        return cook_data({})
    
    @action(detail=False, methods=['GET', 'POST'])
    def partial_list(self, request):
        filter = request.data.pop("filter", {"id__in": []})
        queryset = self.get_queryset().filter(**filter)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)