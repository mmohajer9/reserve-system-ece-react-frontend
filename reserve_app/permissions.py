from rest_framework.permissions import BasePermission
from .models import *
class SampleCustomPermission(BasePermission):


    ''' First Priority : has_object_permission() will be executed for the first time '''
    #ONLY FOR A API VIEW THAT IS DEDICATED FOR A SPECIFIC OBJECT LIKE : RetrieveUpdateAPIView and not like : ListAPIView
    def has_object_permission(self, request, view, obj):
        """
        Return `True` if permission is granted, `False` otherwise.
        """
        return True




    '''After the first priority the second priority that is has_permission() will be executed'''
    def has_permission(self, request, view):
        """
        Return `True` if permission is granted, `False` otherwise.
        """
        return True


