from rest_framework import routers
from school.views import *

router = routers.DefaultRouter()
router.register(r'pupil', PupilViewSet)
router.register(r'pupil_form', PupilFormViewSet)
router.register(r'event', EventViewSet)
router.register(r'event_pupil', EventPupilViewSet)
router.register(r'task', TaskViewSet)