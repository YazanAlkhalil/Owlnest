from django.db import models 
from system.models.Course import Course 
class Skill(models.Model):
      course = models.ForeignKey(Course, on_delete=models.CASCADE)
      name = models.CharField(max_length=255)
      rate = models.DecimalField(max_digits=3,decimal_places=2)