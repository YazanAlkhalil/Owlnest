# Generated by Django 5.0.6 on 2024-06-19 15:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0004_alter_user_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='joining_date',
            field=models.DateField(auto_now=True),
        ),
    ]