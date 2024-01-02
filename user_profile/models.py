from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True)

    GENDER_CHOICES = [
        ('мужской', 'мужской'),
        ('женский', 'женский'),
    ]

    gender = models.CharField(max_length=7, choices=GENDER_CHOICES, blank=True)
    date_of_birth = models.DateField(blank=True, null=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pictures', blank=True, null=True)
    profession = models.CharField(max_length=100, blank=True, null=True)
    practice = models.CharField(max_length=10, blank=True, null=True)
    sphere_of_interest = models.TextField(blank=True, null=True)

    def __str__(self):
        return f'{self.user.username} Profile'


class TeamMemberSpeciality(models.Model):
    profile = models.ManyToManyField('Profile')
    speciality = models.CharField(max_length=100)

    def __str__(self):
        return f'Team Member Speciality {self.speciality}'