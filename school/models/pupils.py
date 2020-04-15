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

    def __str__(self):
        return '{} {}.{}. ({})'.format(
            self.last_name,
            (self.first_name or '?')[0],
            (self.middle_name or '?')[0],
            self.birth_date,
        )
    class Meta:
        verbose_name = "Ученики"
        verbose_name_plural = verbose_name

class PupilForm(models.Model):
    ACADEMIC_YEARS = [
        (1, '2019-2020'),
    ]
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
    academic_year = models.SmallIntegerField(
        choices=ACADEMIC_YEARS,
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
            self.form,
        )
    class Meta:
        verbose_name = "Классы"
        verbose_name_plural = verbose_name

