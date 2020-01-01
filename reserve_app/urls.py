from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .views import *

app_name = 'reserve_app'

urlpatterns = [
    path("members/" , MemberList.as_view(), name="member_list"),
    path("members/<int:user__id>/" , MemberDetailByUserID.as_view(), name="member_detail_by_id"),
    path("members/<str:user__username>/" , MemberDetailByUserUsername.as_view(), name="member_detail_by_username"),
    path("universities/", UniversityList.as_view(), name="university_list"),
    path("universities/<int:pk>/" , UniversityDetail.as_view(), name = "university_detail"),
    path("departments/", DepartmentListForIUT.as_view(), name="department_list"), #default
    path("departments/<int:uni_id>/", DepartmentListForUniversity.as_view(), name="department_list"),
    path("places/<int:dept_id>/" ,PlaceListForDepartment.as_view() , name="place_list"),
    path("places/<int:dept_id>/<int:pk>/" ,PlaceDetailForDepartment.as_view() , name="place_detail"),
    path("places/<int:dept_id>/<int:pk>/datetimeslots/" , PlaceDateTimeSlotList.as_view() , name="place_datetime_slot"),

]