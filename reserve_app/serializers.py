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


class DateTimeSlotSerializer(ModelSerializer):

    class Meta:
        model = DateTimeSlot
        fields = '__all__'
        