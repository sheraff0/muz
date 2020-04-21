from django.db import models

class Pupil(models.Model):
    GENDERS = [
        (1, "мужской"),
        (2, "женский")
    ]
    last_name = models.CharField(
        max_length=20,
        verbose_name='Фамилия'
    )
    first_name = models.CharField(
        max_length=20,
        verbose_name='Имя'
    )
    middle_name = models.CharField(
        max_length=20,
        verbose_name='Отчество'
    )
    birth_date = models.DateField(
        verbose_name='Дата рождения'
    )
    gender = models.SmallIntegerField(
        choices=GENDERS,
        verbose_name="Пол"
    )
    user_id = models.PositiveIntegerField(
        null=True, blank=True,
        verbose_name='ID пользователя'
    )
    def __str__(self):
        return '{} {}'.format(
            self.last_name,
            self.first_name
        )
    class Meta:
        verbose_name = "Ученики"
        verbose_name_plural = verbose_name

class AcademicYear(models.Model):
    academic_year = models.CharField(
        max_length=10,
        verbose_name='Учебный год'
    )
    year_start = models.DateField(
        verbose_name="Начало года"
    )
    year_end = models.DateField(
        verbose_name="Конец года"
    )
    def __str__(self):
        return self.academic_year
    class Meta:
        verbose_name = "Учебные годы"
        verbose_name_plural = verbose_name


class PupilForm(models.Model):
    COURSES = [
        (1, 'предпрофессиональная'),
        (2, 'общеразвивающая '),
        (3, 'подготовительная'),
    ]
    pupil = models.ForeignKey(
        Pupil,
        on_delete=models.SET_NULL, null=True,
        verbose_name='Ученик'
    )
    academic_year = models.ForeignKey(
        AcademicYear,
        on_delete=models.SET_NULL, null=True, blank=True,
        verbose_name="Учебный год"
    )
    form = models.PositiveIntegerField(
        null=True, blank=True,
        verbose_name="Класс"
    )
    course = models.SmallIntegerField(
        choices=COURSES,
        verbose_name="Программа обучения"
    )
    def __str__(self):
        return "{} ({})".format(
            self.pupil.__str__(),
            self.form or "ПО",
        )
    class Meta:
        ordering = ('-academic_year__academic_year', 'pupil__last_name')
        verbose_name = "Классы"
        verbose_name_plural = verbose_name

