from django.db import models
from system.models.Company import Company 
from system.models.Trainer_Contract import Trainer_Contract
from system.models.Trainee_Contract import Trainee_Contract
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey 

class Course(models.Model):
    # file will be uploaded to MEDIA_ROOT/course_<course-id>/<filename>
    def course_image_path(instance, filename):
        return f'course_{instance.id}/{filename}'
    # difining the model fields
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    creator_content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    creator_object_id = models.PositiveIntegerField()
    creator = GenericForeignKey('creator_content_type', 'creator_object_id')
    name = models.CharField(max_length=256)
    pref_description = models.TextField()
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to=course_image_path, null=True, blank=True)
    published = models.BooleanField(default= False)
    publish_date = models.DateField(auto_now_add=True) 
    trainers = models.ManyToManyField(Trainer_Contract, through='system.Trainer_Contract_Course')
    trainees = models.ManyToManyField(Trainee_Contract,through='system.Enrollment')
    rate = models.DecimalField(max_digits= 8,decimal_places=2,default=0)
    # when call an instance show just its name
    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['name']