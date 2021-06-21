# Generated by Django 3.1.7 on 2021-05-11 05:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('gp', '0022_auto_20210426_0714'),
    ]

    operations = [
        migrations.AddField(
            model_name='holder',
            name='parents',
            field=models.ManyToManyField(blank=True, related_name='_holder_parents_+', through='gp.Parent', to='gp.Holder'),
        ),
        migrations.AddField(
            model_name='parent',
            name='parent',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='parent_parent', to='gp.holder'),
        ),
        migrations.AlterField(
            model_name='parent',
            name='name',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='name_parent', to='gp.holder'),
        ),
        migrations.AlterUniqueTogether(
            name='parent',
            unique_together={('name', 'parent')},
        ),
        migrations.RemoveField(
            model_name='parent',
            name='child',
        ),
    ]
