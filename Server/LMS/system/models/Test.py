from django.db import models
from ..models.Content import Content
from ..models.Temp_Content import Temp_Content

class Test(models.Model):
    content = models.OneToOneField(Content, on_delete=models.CASCADE, null=True)
    temp_content = models.OneToOneField(Temp_Content, on_delete=models.CASCADE, null=True)
    full_mark = models.FloatField()
    def __str__(self):
        return f"Test for {self.content.title}"