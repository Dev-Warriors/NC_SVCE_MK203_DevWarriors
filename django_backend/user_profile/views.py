from django.contrib.auth import get_user_model
from .serializers import UserSerializer
from rest_framework import viewsets
from django.http import HttpResponse
from .models import Attendence
import json
from Rekog import AwsRekog
from datetime import datetime


User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

def takeAttendence(request):
    data = json.loads(request.body)
    user_id = data["data"]["fileName"]
    base64_img = data["data"]["imageSrc"]
    recog = AwsRekog(user_id, bytes(base64_img[22:],'utf-8'))
    recog.convert()
    result = recog.compare()
    attendence = Attendence()
    attendence.emp_id = user_id 
    if len(result['FaceMatches']) == 0:
        attendence.present_absent = False
    else:
        attendence.present_absent = True
    today = datetime.now().strftime("%d_%b_%Y")
    attendence.img_id = user_id + today
    attendence.location = 'chennai'
    attendence.save()
    return HttpResponse("asdf")