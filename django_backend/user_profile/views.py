from django.contrib.auth import get_user_model
from .serializers import UserSerializer
from rest_framework import viewsets
from django.http import HttpResponse
from .models import Attendence
import json
from Rekog import AwsRekog
from datetime import datetime
from twilio.rest import Client
from django.conf import Settings
from project import settings
import geocoder

User = get_user_model()

def broadcast_sms_not_present():
    message_to_broadcast = ("Seems like you're attendence process did not go through! Meet your Panchayat officer.")
    client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
    client.messages.create(to="ADD_YOUR_PHONE_NUMBER",from_=settings.TWILIO_NUMBER,body=message_to_broadcast)
    return HttpResponse("messages sent!", 200)

def broadcast_sms_present():
    message_to_broadcast = ("Attendance for mngrega registered successfully")
    client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
    client.messages.create(to="ADD_YOUR_PHONE_NUMBER",from_=settings.TWILIO_NUMBER,body=message_to_broadcast)
    return HttpResponse("messages sent!", 200)

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
        broadcast_sms_not_present()
        # attendence.is_present = False
    else:
        # broadcast_sms_present()
        attendence.is_present = True
    today = datetime.now().strftime("%d_%b_%Y")
    attendence.img_id = user_id + today
    location = geocoder.ip('me')
    attendence.location = location.latlng
    attendence.save()
    return HttpResponse("asdf")

def workers(request, work_id):
    resp = []
    users = User.objects.all()
    print("debug")
    for user in users: 
        attendences = Attendence.objects.filter(worker=user)
        days_present = 0
        attendences_resp = []
        # calculate days present and build attendences reponse object
        for attendence in attendences: 
            if attendence.is_present:
                days_present += 1
            attendence_resp = {
                "is_present": attendence.is_present,
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
