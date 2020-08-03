from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()


class UserProfile(models.Model):
    user = models.OneToOneField(User)
    # custom fields for user
    website = models.URLField(blank=True, null=True)
    about = models.CharField(max_length=255, blank=True, null=True)


class Attendence(models.Model):
    worker = models.ForeignKey(User) 
    date_time = models.DateTimeField(auto_now=True)
    is_present = models.BooleanField(default=False)
    img_id = models.CharField(max_length=100)
    location = models.CharField(max_length=100,null=True,blank=True)
    
    def __str__(self):
        return str(self.worker.id) + "---- isPresent ---" + str(self.is_present)