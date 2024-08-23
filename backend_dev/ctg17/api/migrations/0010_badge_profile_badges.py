# Generated by Django 5.1 on 2024-08-23 16:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_profile_phone'),
    ]

    operations = [
        migrations.CreateModel(
            name='Badge',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('badge_name', models.CharField(max_length=255)),
                ('badge_image', models.ImageField(blank=True, null=True, upload_to='')),
            ],
        ),
        migrations.AddField(
            model_name='profile',
            name='badges',
            field=models.ManyToManyField(blank=True, related_name='volunteer_badges', to='api.badge'),
        ),
    ]
