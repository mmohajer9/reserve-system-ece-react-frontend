from django.contrib import admin
from .models import *
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField
# Register your models here.


admin.site.register(University)
admin.site.register(Department)
admin.site.register(Place)
admin.site.register(Member)
admin.site.register(Reservation)
admin.site.register(DateTimeSlot)