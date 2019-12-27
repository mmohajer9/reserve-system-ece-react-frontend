from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .views import *

app_name = 'reserve_app'

urlpatterns = [
    path("members/" , MemberList.as_view(), name="member_list"),
    path("members/<int:pk>" , MemberDetail.as_view(), name="member_detail"),
    path("universities/", UniversityList.as_view(), name="university_list"),
    path("departments/", DepartmentListForIUT.as_view(), name="department_list"), #default
    path("departments/<int:uni_id>/", DepartmentListForUniversity.as_view(), name="department_list"),
    path("places/<int:dept_id>/" ,PlaceListForDepartment.as_view() , name="place_list"),
    path("places/<int:dept_id>/<int:pk>/" ,PlaceDetailForDepartment.as_view() , name="place_detail"),

]