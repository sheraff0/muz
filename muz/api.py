from rest_framework import routers
from school.views import *
from library.views import *

router = routers.DefaultRouter()
router.register(r'pupil', PupilViewSet)
router.register(r'academic_year', AcademicYearViewSet)
router.register(r'pupil_form', PupilFormViewSet)
router.register(r'event', EventViewSet)
router.register(r'event_pupil', EventPupilViewSet)
router.register(r'task', TaskViewSet)
router.register(r'diary', DiaryViewSet)
router.register(r'person', PersonViewSet)
router.register(r'opus', OpusViewSet)
router.register(r'source', SourceViewSet)
router.register(r'source_index', SourceIndexViewSet)
router.register(r'drill', DrillViewSet)
