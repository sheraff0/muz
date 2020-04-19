from django.db import models

class Person(models.Model):
    last_name = models.CharField(
        max_length=20,
        verbose_name="Фамилия"
    )
    first_name = models.CharField(
        max_length=20,
        verbose_name="Имя"
    )
    middle_name = models.CharField(
        max_length=20,
        null=True, blank=True,
        verbose_name="Отчество"
    )
    birth_date = models.DateField(
        verbose_name='Дата рождения'
    )
    death_date = models.DateField(
        null=True, blank=True,
        verbose_name='Дата смерти'
    )
    composer = models.BooleanField(
        null=True, blank=True,
        verbose_name="Композитор"
    )
    artist = models.BooleanField(
        null=True, blank=True,
        verbose_name="Исполнитель"
    )
    author = models.BooleanField(
        null=True, blank=True,
        verbose_name="Автор"
    )
    def __str__(self):
        return "{} {}.{}".format(
            self.last_name,
            (self.first_name or '?')[0],
            (self.middle_name or '?')[0] + '.' if self.middle_name else ''
        )
    class Meta:
        ordering = ('last_name', 'first_name')
        verbose_name = "Личности"
        verbose_name_plural = verbose_name

class Opus(models.Model):
    composer = models.ForeignKey(
        Person,
        on_delete=models.SET_NULL, null=True,
        verbose_name="Композитор"
    )
    opus_title = models.CharField(
        max_length=100,
        verbose_name="Название"
    )
    opus_subtitle = models.CharField(
        max_length=100,
        null=True, blank=True,
        verbose_name="Подзаголовок"
    )
    opus_number = models.CharField(
        max_length=10,
        null=True, blank=True,
        verbose_name="Опус"
    )
    def __str__(self):
        return "{} {}{}{}".format(
            self.composer.__str__(),
            self.opus_title,
            "(" + self.opus_subtitle + ")" if self.opus_subtitle else '',
            "(op. " + self.opus_number + ")" if self.opus_number else '',
        )
    class Meta:
        verbose_name = "Произведения"
        verbose_name_plural = verbose_name
