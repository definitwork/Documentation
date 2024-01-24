from django.contrib import admin

from user_profile.models import Profile, TeamMemberSpeciality


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user',
                    'gender',
                    'date_of_birth',
                    'phone_number',
                    'profile_picture',
                    'profession',
                    'practice',
                    'sphere_of_interest',
                    )

@admin.register(TeamMemberSpeciality)
class TeamMemberSpecialityAdmin(admin.ModelAdmin):
    list_display = ('speciality',)