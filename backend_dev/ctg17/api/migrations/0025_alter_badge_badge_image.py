# Generated by Django 4.2.15 on 2024-08-25 22:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0024_add_role_type_to_application'),
    ]

    operations = [
        migrations.AlterField(
            model_name='badge',
            name='badge_image',
            field=models.ImageField(blank=True, null=True, upload_to='static/badges/'),
        ),
    ]