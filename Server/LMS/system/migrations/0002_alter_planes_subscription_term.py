# Generated by Django 5.0.6 on 2024-07-10 17:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('system', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='planes',
            name='subscription_term',
            field=models.DurationField(),
        ),
    ]
