import time
from django.db import models

class Event(models.Model):
    EVENT_TYPES = [
        (1, "урок"),
        (2, "контрольный урок"),
        (3, "технический зачет"),
        (4, "экзамен"),
        (5, "репетиция"),
        (6, "концерт"),
        (7, "мероприятие"),
        (8, "родительское собрание"),
        (9, "конкурс"),
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
        return "{}, {} - {}".format(
            self.event_date,
            self.event_time.strftime('%H:%M'),
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
        'school.PupilForm',
        related_name="events",
        on_delete=models.SET_NULL, null=True,
        verbose_name="Ученик"
    )
    def __str__(self):
        return "{} - {}".format(
            self.pupil.__str__(),
            self.event.__str__()
        )
    class Meta:
        ordering = ('-event__event_date', '-event__event_time')
        verbose_name = 'Кому'
        verbose_name_plural = verbose_name

class Task(models.Model):
    TASK_TYPES = [
        (1, "Техническая подготовка"),
        (2, "Изучение произведений"),
        (3, "Знание музыки"),
    ]
    event = models.ForeignKey(
        Event,
        related_name="tasks",
        on_delete=models.SET_NULL, null=True,
        verbose_name="Мероприятие"
    )
    task_type = models.SmallIntegerField(
        choices=TASK_TYPES,
        null=True, blank=True,
        verbose_name="Тип задания"
    )
    opus = models.ForeignKey(
        'library.Opus',
        on_delete=models.SET_NULL, null=True, blank=True,
        verbose_name="Произведение"
    )
    drill = models.ForeignKey(
        'library.Drill',
        on_delete=models.SET_NULL, null=True, blank=True,
        verbose_name="Упражнение"
    )
    task_text = models.CharField(
        max_length=200,
        null=True, blank=True,
        verbose_name="Задание"
    )
    def __str__(self):
        return "{} {}{}".format(
            self.drill.__str__() if self.drill else '',
            self.opus.__str__() if self.opus else '',
            ' - ' + self.task_text if self.task_text else ''
        )
    class Meta:
        ordering = ('task_type', 'id')
        verbose_name = 'Задания'
        verbose_name_plural = verbose_name