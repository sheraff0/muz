from django.db import models
from .pupils import PupilForm

class Event(models.Model):
    EVENT_TYPES = [
        (1, "урок"),
        (2, "контрольный урок"),
        (3, "технический зачет"),
        (4, "экзамен"),
        (5, "концерт"),
        (6, "мероприятие"),
        (7, "родительское собрание"),
    ]
    SUBJECTS = [
        (1, "специальность"),
        (2, "ансамбль"),
        (3, "музыкальный инструмент"),
    ]
    event_type = models.PositiveIntegerField(
        choices=EVENT_TYPES,
        verbose_name="Тип события"
    )
    event_date = models.DateField(
        verbose_name="Дата"
    )
    event_time = models.TimeField(
        verbose_name="Время"
    )
    subject = models.PositiveIntegerField(
        choices=SUBJECTS,
        null=True, blank=True,
        verbose_name="Предмет"
    )
    def __str__(self):
        et = self.event_type
        return "{} {} - {}".format(
            self.event_date,
            self.event_time,
            self.EVENT_TYPES[et-1][1]
        )
    class Meta:
        ordering = ('-event_date', '-event_time')
        verbose_name = 'Мероприятия'
        verbose_name_plural = verbose_name

class EventPupil(models.Model):
    event = models.ForeignKey(
        Event,
        on_delete=models.SET_NULL, null=True,
        verbose_name="Мероприятие"
    )
    pupil = models.ForeignKey(
        PupilForm,
        on_delete=models.SET_NULL, null=True,
        verbose_name="Ученик"
    )
    def __str__(self):
        return self.pupil.__str__()
    class Meta:
        verbose_name = 'Кому'
        verbose_name_plural = verbose_name

class Task(models.Model):
    event = models.ForeignKey(
        Event,
        on_delete=models.SET_NULL, null=True,
        verbose_name="Мероприятие"
    )
    task_text = models.CharField(
        max_length=200,
        null=True, blank=True,
        verbose_name="Задание"
    )
    class Meta:
        verbose_name = 'Задания'
        verbose_name_plural = verbose_name