from django.db import models
from django.contrib.auth.models import User
from django.shortcuts import render , reverse
from django.utils.translation import ugettext_lazy as _

# Create your models here.
class University(models.Model):

    name = models.CharField(max_length=150, unique = True)
    location = models.CharField(max_length=150)
    def __str__(self):
        return self.name

    class Meta:
        # db_table = ''
        # managed = True
        verbose_name = 'University'
        verbose_name_plural = 'Universities'


class Department(models.Model):

    name = models.CharField(max_length=150, unique = True)
    location = models.CharField(max_length=150)
    university = models.ForeignKey(University, related_name='departments', on_delete=models.CASCADE)
    def __str__(self):
        return self.name

    # class Meta:
    #     db_table = ''
    #     managed = True
    #     verbose_name = 'ModelName'
    #     verbose_name_plural = 'ModelNames'



class Member(models.Model):

    user = models.OneToOneField(User , on_delete=models.CASCADE)
    member_id = models.CharField(max_length=11 , unique = True)
    mobile_phone = models.CharField(blank=True, null=True,max_length=11 , unique = True)
    profile_pic = models.ImageField(upload_to = 'profile_pics' , blank=True)
    Telegram_link = models.URLField(blank=True, null=True , max_length=200 , unique = True)
    department = models.ForeignKey(Department, related_name='members', on_delete=models.CASCADE)
    


    def __str__(self):
        return str(self.user.username) + str(' : ') + str(f'{self.member_id} : ') + str(self.user.first_name) + str(' - ') + str(self.user.last_name)

    # class Meta:
    #     db_table = ''
    #     managed = True
    #     verbose_name = 'ModelName'
    #     verbose_name_plural = 'ModelNames'

    @property
    def user__username(self):
        return self.user.username





class Place(models.Model):

    name = models.CharField(max_length=150, unique = True)
    capacity = models.IntegerField(default = 0)
    location = models.CharField(max_length=150)
    department = models.ForeignKey(Department, related_name='places', on_delete=models.CASCADE)
    def __str__(self):
        return str(self.department) + ' : ' + str(self.name)

    # class Meta:
    #     db_table = ''
    #     managed = True
    #     verbose_name = 'ModelName'
    #     verbose_name_plural = 'ModelNames'



class DateTimeSlot(models.Model):

    datetime = models.DateTimeField(auto_now=False, auto_now_add=False)
    place = models.ForeignKey(Place, related_name='related_datetimeslots', on_delete=models.CASCADE)
    isReserved = models.BooleanField(default= False)
    # class Meta:
    #     db_table = ''
    #     managed = True
    #     verbose_name = 'ModelName'
    #     verbose_name_plural = 'ModelNames'
    class Meta:
        unique_together = ('datetime', 'place',)    
    
    def __str__(self):
        return str(self.datetime) + ' : ' +  str(self.place) + (' - Reserved' if self.isReserved else ' - Free')
    


class Reservation(models.Model):

    member = models.ForeignKey(Member, related_name='reserved_places', on_delete=models.CASCADE)
    slot = models.ForeignKey(DateTimeSlot, related_name='reservations_on_this_datetimeslot', on_delete=models.CASCADE)
    desciption = models.CharField(max_length=150,blank=True, null=True)
    
    def __str__(self):
        return str(self.member) + ' : ' + str(self.desciption)

    # class Meta:
    #     db_table = ''
    #     managed = True
    #     verbose_name = 'ModelName'
    #     verbose_name_plural = 'ModelNames'

