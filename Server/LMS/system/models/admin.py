from django.db import models
from authentication.models.User import User

class Admin(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)