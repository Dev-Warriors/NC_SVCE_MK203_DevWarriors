# -*- coding: utf-8 -*-
# Generated by Django 1.11.17 on 2020-08-02 08:59
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_profile', '0002_attendance'),
    ]

    operations = [
        migrations.AddField(
            model_name='attendance',
            name='location',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
