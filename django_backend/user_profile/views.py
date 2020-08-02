from django.contrib.auth import get_user_model
from .serializers import UserSerializer
from rest_framework import viewsets
from django.http import HttpResponse
from .models import Attendence
import json
# import Rekog

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

def takeAttendence(request):
    data = json.loads(request.body)
    attendence = Attendence()
    attendence.emp_id = '1'
    attendence.present_absent = True
    attendence.img_id = '1'
    attendence.location = 'chennai'
    attendence.save()
    return HttpResponse("asdf")