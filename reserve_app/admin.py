from django.contrib import admin
from .models import *
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField
# Register your models here.


# admin.site.register(model_name)