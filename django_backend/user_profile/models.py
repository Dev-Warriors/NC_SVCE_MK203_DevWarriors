from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()


class UserProfile(models.Model):
    user = models.OneToOneField(User)
    # custom fields for user
    website = models.URLField(blank=True, null=True)
    about = models.CharField(max_length=255, blank=True, null=True)

class Attendance(models.Model):
    emp_id = models.CharField(max_length=30)
    date_time=models.DateTimeField(auto_now=True)
    present_absent=models.BooleanField(default=False)
    img_id=models.CharField(max_length=100)
    location=models.CharField(max_length=100,null=True,blank=True)
    
    def __str__(self): 
        return self.emp_id

