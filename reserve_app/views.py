from django.shortcuts import render

from django.contrib.auth import authenticate

from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    DestroyAPIView,
    UpdateAPIView,
    ListCreateAPIView,
    RetrieveDestroyAPIView,
    RetrieveUpdateAPIView,
    RetrieveUpdateDestroyAPIView,
    GenericAPIView,

    #Generic Api Views for doing some actions
)
# from .generics import *

from rest_framework.permissions import (
    IsAdminUser,
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
    AllowAny,
)

from .permissions import *

from rest_framework.response import Response  #different from django response its for rest framework
from rest_framework.status import *  #HTTP_200_OK , HTTP_400_BAD_REQUEST , ......
from rest_framework.views import APIView  #for totally customized api view its better than functions - good for implementing
from django.shortcuts import reverse, get_object_or_404, get_list_or_404
#reverse for url dispatch , get_object/list_or_404 for better exception handling

# from .pagination import *
from .models import *
from .serializers import *
# Create your views here.


class UniversityList(ListAPIView):
    queryset = University.objects.all()
    serializer_class = UniversityListSerializer
    permission_classes = [AllowAny, ]


class DepartmentListForUniversity(ListAPIView):
    def get_queryset(self):
        return Department.objects.filter(university__id = self.kwargs["uni_id"])
    
    serializer_class = DepartmentListSerializer
    permission_class = [AllowAny]
    

class DepartmentListForIUT(ListAPIView):
    def get_queryset(self):
        return Department.objects.filter(university__id = 1)
        
    serializer_class = DepartmentListSerializer
    permission_class = [AllowAny]



class PlaceListForDepartment(ListCreateAPIView):
    def get_queryset(self):
        return Place.objects.filter(department__id = self.kwargs["dept_id"])
    
    serializer_class = PlaceListSerializer
    permission_class = [AllowAny]