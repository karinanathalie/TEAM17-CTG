# Generated by Django 4.2.15 on 2024-08-24 14:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_alter_profile_ethnicity_alter_profile_nationality'),
    ]

    operations = [
        migrations.CreateModel(
            name='VolunteerApplication',
            fields=[
                ('application_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='api.application')),
                ('reason_joining', models.TextField()),
                ('cv_file', models.FileField(blank=True, null=True, upload_to='cv_files/')),
            ],
            options={
                'verbose_name': 'Volunteer Application',
                'verbose_name_plural': 'Volunteer Applications',
            },
            bases=('api.application',),
        ),
    ]
