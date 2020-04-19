from django.db import models
from .opera import *
from .drills import *

class Source(models.Model):
    SOURCE_TYPES = [
        (1, "документ"),
        (2, "аудио"),
        (3, "видео"),
    ]
    source_type = models.PositiveIntegerField(
        choices=SOURCE_TYPES,
        null=True, blank=True,
        verbose_name="Тип источника"
    )
    source_title = models.CharField(
        max_length=100,
        null=True, blank=True,
        verbose_name="Название"
    )
    source_description = models.CharField(
        max_length=300,
        null=True, blank=True,
        verbose_name="Описание"
    )
    url = models.CharField(
        max_length=300,
        null=True, blank=True,
        verbose_name="Ссылка"
    )
    def __str__(self):
        st = self.source_type
        return '{} ({})'.format(
            self.source_title or '?',
            self.SOURCE_TYPES[st-1][1] if st else '?'
        )
    class Meta:
        verbose_name = "Источники"
        verbose_name_plural = verbose_name

class SourceIndex(models.Model):
    source = models.ForeignKey(
        Source,
        related_name="source_index",
        on_delete=models.SET_NULL, null=True,
        verbose_name="Источник"
    )
    person = models.ForeignKey(
        Person,
        on_delete=models.SET_NULL, null=True,
        verbose_name="Личность"
    )    
    opus = models.ForeignKey(
        Opus,
        on_delete=models.SET_NULL, null=True,
        verbose_name="Произведение"
    )
    drill = models.ForeignKey(
        Drill,
        on_delete=models.SET_NULL, null=True,
        verbose_name="Упражнение"
    )
    task = models.ForeignKey(
        'school.Task',
        on_delete=models.SET_NULL, null=True, blank=True,
        verbose_name="Задание"
    )
    def __str__(self):
        return '{}'.format(
            self.source.__str__()
        )
    class Meta:
        verbose_name = "Указатель источников"
        verbose_name_plural = verbose_name
