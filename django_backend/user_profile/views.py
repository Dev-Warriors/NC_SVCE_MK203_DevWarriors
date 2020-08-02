from django.contrib.auth import get_user_model
from .serializers import UserSerializer
from rest_framework import viewsets
from django.http import HttpResponse
from .models import Attendance
import Rekog

User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
def takeAttendance(request):
    print (request.POST)
    attendance = Attendance()
    attendance.emp_id = '1'
    attendance.present_absent = True
    attendance.img_id = '1'
    attendance.location = 'chennai'
    attendance .save()
