import re  #regular expression package for extra validation on serializer fields

from rest_framework.serializers import ModelSerializer, HyperlinkedIdentityField, SerializerMethodField, Serializer

from .models import *

from rest_framework.exceptions import (
    ValidationError,
    AuthenticationFailed,
    NotAuthenticated,
    MethodNotAllowed,
    APIException,
    NotAcceptable,
    NotFound,
)


class UniversitySerializer(ModelSerializer):
    class Meta:
        model = University
        fields = '__all__'

class DepartmentListSerializer(ModelSerializer):
    class Meta:
        model = University
        fields = '__all__'


class PlaceListSerializer(ModelSerializer):
    class Meta:
        model = Place
        fields = '__all__'


class PlaceDetailSerializer(ModelSerializer):
    class Meta:
        model = Place
        fields = '__all__'


class UserSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = [
            "id",
            "is_superuser",
            "username",
            "first_name",
            "last_name",
            "email",
            "is_staff",
            "is_active",
        ]

class MemberSerializer(ModelSerializer):

    user = UserSerializer(read_only = True)

    class Meta:
        model = Member
        fields = '__all__'
        depth = 2


class ReservationSerializer(ModelSerializer):

    begin_time = SerializerMethodField()
    end_time = SerializerMethodField()
    date = SerializerMethodField()
    place = SerializerMethodField()
    class Meta:
        model = Reservation
        fields = [
            'id',
            'description',
            'member',
            'slot',
            'begin_time',
            'end_time',
            'date',
            'place'
        ]

    def get_begin_time(self , obj):
        return obj.slot.begin_time
    def get_end_time(self , obj):
        return obj.slot.end_time
    def get_date(self , obj):
        return obj.slot.date
    def get_place(self , obj):
        return obj.slot.place.name


class DateTimeSlotSerializer(ModelSerializer):
    reservation = ReservationSerializer(read_only = True)
    class Meta:
        model = DateTimeSlot
        fields = [
            'id',
            'date',
            'begin_time',
            'end_time',
            'place',
            'reservation'
        ]
        
