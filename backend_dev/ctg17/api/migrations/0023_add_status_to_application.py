# Generated by Django 4.2.15 on 2024-08-25 13:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0022_whatsapptemplate'),
    ]

    operations = [
        migrations.AddField(
            model_name='application',
            name='status',
            field=models.TextField(choices=[('SUCCESSFUL', 'successful'), ('PENDING', 'pending'), ('UNSUCCESSFUL', 'unsuccessful')], default='pending'),
            preserve_default=False,
        ),
    ]