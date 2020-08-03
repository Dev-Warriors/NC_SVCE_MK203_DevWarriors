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
    print(result)
    attendence = Attendence()
    attendence.worker = User.objects.get(id=user_id) 
    if len(result['FaceMatches']) == 0:
        attendence.is_present = False
    else:
        attendence.is_present = True
    today = datetime.now().strftime("%d_%b_%Y")
    attendence.img_id = user_id + today
    attendence.location = 'chennai'
    attendence.save()
    return HttpResponse("asdf")

def workers(request, work_id):
    resp = []
    users = User.objects.all()
    for user in users: 
        attendences = Attendence.objects.filter(worker=user)
        days_present = 0
        attendences_resp = []
        # calculate days present and build attendences reponse object
        for attendence in attendences: 
            if attendence.is_present:
                days_present += 1
            attendence_resp = {
                "location": attendence.location,
                "timestamp": str(attendence.date_time),
            }
            attendences_resp.append(attendence_resp)
            
        user_resp = {
            "name" : user.username,
            "days_present" : days_present,
            # todo
            "profile_url": ""
        }
        resp.append({
            "user": user_resp,
            "attendences" : attendences_resp
        })
        
    return HttpResponse(json.dumps(resp), content_type="application/json") 