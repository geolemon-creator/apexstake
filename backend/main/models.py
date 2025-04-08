from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


class Wallets(models.Model):
    title = models.CharField("Название", max_length=100)
    wallet = models.CharField("Адрес кошелька", max_length=48)

    class Meta:
        verbose_name = "Кошелёк"
        verbose_name_plural = "Кошельки"

    def __str__(self):
        short_wallet = self.wallet[:16] + '...' if len(self.wallet) > 16 else self.wallet
        return f'{self.title} {short_wallet}'
    
    
class Contest(models.Model):
    title = models.CharField("Название конкурса", max_length=28)
    badge_content = models.CharField("Бейдж", max_length=12, null=True, blank=True)
    img = models.ImageField("Изображение")
    end_date = models.DateTimeField("Дата окончания")

    class Meta:
        verbose_name = "Конкурс"
        verbose_name_plural = "Конкурсы"

    def __str__(self):
        return self.title


class Banner(models.Model):
    title = models.CharField("Заголовок", max_length=18)
    description = models.CharField("Описание", max_length=18)
    img = models.ImageField("Изображение")
    link = models.URLField("Ссылка")

    class Meta:
        verbose_name = "Баннер"
        verbose_name_plural = "Баннеры"

    def __str__(self):
        return self.title


class Commission(models.Model):
    percent = models.IntegerField(
        "Процент комиссии",
        default=10,
        validators=[
            MinValueValidator(0),
            MaxValueValidator(100)
        ]
    )

    class Meta:
        verbose_name = "Комиссия"
        verbose_name_plural = "Комиссия"

    def save(self, *args, **kwargs):
        if not self.pk and Commission.objects.exists():
            raise ValueError("Можно создать только один объект Commission.")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Комиссия: {self.percent}%"