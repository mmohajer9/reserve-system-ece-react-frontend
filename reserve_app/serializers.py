import re #regular expression package for extra validation on serializer fields

from rest_framework.serializers import ModelSerializer , HyperlinkedIdentityField , SerializerMethodField , Serializer

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