# Generated by Django 4.0.10 on 2023-04-06 23:40

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('bike', '0002_wheelset_maintenance'),
    ]

    operations = [
        migrations.CreateModel(
            name='Ride',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(blank=True, verbose_name='Ride date')),
                ('name', models.CharField(max_length=100, verbose_name='Route')),
                ('distance', models.DecimalField(decimal_places=1, max_digits=5)),
                ('time', models.IntegerField(verbose_name='Ride time in minutes')),
                ('tss', models.IntegerField(verbose_name='TSS')),
                ('comment', models.TextField(blank=True)),
                ('bike', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='bike.bike')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('wheelset', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='bike.wheelset')),
            ],
        ),
    ]
