# Generated by Django 5.0.6 on 2024-07-01 11:54

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("system", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="enrollment",
            name="completed_at",
            field=models.DateField(blank=True, null=True),
        ),
    ]
