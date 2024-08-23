# Generated by Django 5.1 on 2024-08-23 11:41

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0003_alter_event_event_date_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="Training",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("training_name", models.CharField(max_length=255)),
                ("training_description", models.TextField(blank=True, null=True)),
                ("training_link", models.CharField(max_length=255)),
                ("skillset", models.TextField(blank=True, null=True)),
            ],
        ),
    ]
