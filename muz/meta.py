# Preparing models metadata export from API to frontend

from django.apps import apps
from django.urls import path
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from .helpers import cook_data

FRONTEND_APPS = [
    'school',
]

def indexedChoices(field_details):
    try:
        choices = field_details['choices']
        field_details['choices'] = dict(choices)
        return field_details
    except:
        return field_details

class ModelsMetaView(APIView):
    authentication_classes = (TokenAuthentication, )

    def get(self, request, format=None):
        response_data = {}
        models = apps.get_models()
        selected_models = list(filter(lambda x: x._meta.app_label in FRONTEND_APPS, models))
        for m in selected_models:
            m_app, m_name = m._meta.app_label, m._meta.object_name
            k, v0, v1, v2 = zip(*[x.deconstruct() for x in m._meta.fields])
            fields_dict = {k[i]: {
                'type': v0[i].split('.')[-1],
                'details': v2[i] #indexedChoices(v2[i])
            } for i in range(len(k))}
            related_models = [ {
                'model': x[1].related_model._meta.object_name,
                'field_name': x[1].field.name,
#                'field_attname': x[1].field.attname,
            } for x in list(m._meta.fields_map.items()) ]
            response_data[m_name] = {
                #'model': m_name,
                'model_app': m_app,
                'model_verbose_name': m._meta.verbose_name,
                'fields': fields_dict,
            }
            if related_models:
                response_data[m_name]['related_models'] = related_models
        return cook_data(response_data)

def ModelsAppsShortView(request):
    models = apps.get_models()
    selected_models = filter(lambda x: x._meta.app_label in FRONTEND_APPS, models)
    response_data = [{m._meta.object_name: m._meta.app_label} for m in list(selected_models)]
    return cook_data(response_data)

urlpatterns = [
    path('', ModelsMetaView.as_view()),
    path('short/', ModelsAppsShortView)
]
