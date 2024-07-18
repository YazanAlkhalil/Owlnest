from django.db import models
from system.models.Admin_Contract import Admin_Contract


class Admin_Notification(models.Model):
      admin_contract = models.ForeignKey(Admin_Contract,on_delete=models.CASCADE)
      message = models.TextField()
      is_read = models.BooleanField(default=False)
      sent_at = models.DateTimeField(auto_now_add=True)