from django.db import models

class Drill(models.Model):
    drill = models.CharField(
        max_length=50,
        verbose_name="Упражнение"
    )
    def __str__(self):
        return self.drill
    class Meta:
        verbose_name = "Упражнения"
        verbose_name_plural = verbose_name