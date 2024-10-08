from django.contrib import admin
from system.models.Admin import Admin
from system.models.Admin_Contract import Admin_Contract
from system.models.Notification import Notification
from system.models.Owner import Owner 
from system.models.Trainer import Trainer
from system.models.Trainer_Contract import Trainer_Contract 
from system.models.Trainee import Trainee
from system.models.Trainee_Contract import Trainee_Contract 
from system.models.Company import Company
from system.models.Planes import Planes
from system.models.Company_Planes import Company_Planes
from system.models.Courses_In_Plane import Courses_In_Plane
from system.models.Deposit import Deposit
from system.models.Wallet import Wallet
from system.models.Withdraw import Withdraw
from system.models.Courses_In_Plane import Courses_In_Plane


from system.models.Course import Course
from system.models.Unit import Unit
from system.models.Content import Content
from system.models.Pdf import Pdf
from system.models.Video import Video
from system.models.Test import Test
from system.models.Question import Question
from system.models.Answer import Answer 
from system.models.Additional_Resources import Additional_Resources

from system.models.Comment import Comment
from system.models.Enrollment import Enrollment
from system.models.Favorite import Favorite
from system.models.Finished_Content import Finished_Content
from system.models.Finished_Unit import Finished_Unit
from system.models.Grade import Grade
from system.models.Reply import Reply
from system.models.Review import Review 
from system.models.Trainer_Contract_Course import Trainer_Contract_Course
from system.models.Trainee_skills import Trainee_Skills
from system.models.Skill import Skill



from system.models.DraftAdditionalResources import DraftAdditionalResources
from system.models.DraftAnswer import DraftAnswer
from system.models.DraftContent import DraftContent
from system.models.DraftPDF import DraftPDF
from system.models.DraftVideo import DraftVideo
from system.models.DraftTest import DraftTest
from system.models.DraftQuestion import DraftTest
from system.models.DraftAnswer import DraftAnswer
from system.models.DraftSkill import DraftSkill
from system.models.DraftQuestion import DraftQuestion
from system.models.DraftUnit import DraftUnit
# Register your models here.
admin.site.register(DraftUnit)
admin.site.register(DraftAdditionalResources)
admin.site.register(DraftAnswer)
admin.site.register(DraftContent)
admin.site.register(DraftPDF)
admin.site.register(DraftVideo)
admin.site.register(DraftTest)
admin.site.register(DraftSkill)
admin.site.register(DraftQuestion)


admin.site.register(Admin)
admin.site.register(Admin_Contract)
admin.site.register(Notification)
admin.site.register(Owner) 
admin.site.register(Trainer)
admin.site.register(Trainer_Contract) 
admin.site.register(Trainee)
admin.site.register(Trainee_Contract) 
admin.site.register(Company)
admin.site.register(Company_Planes)
admin.site.register(Planes)
admin.site.register(Courses_In_Plane)

admin.site.register(Course)
admin.site.register(Unit)
admin.site.register(Content)
admin.site.register(Pdf)
admin.site.register(Video)
admin.site.register(Test)
admin.site.register(Question)
admin.site.register(Answer)  
admin.site.register(Additional_Resources)

admin.site.register(Comment)
admin.site.register(Enrollment)
admin.site.register(Favorite)
admin.site.register(Finished_Unit)
admin.site.register(Finished_Content)
admin.site.register(Grade)
admin.site.register(Reply)
admin.site.register(Review)
admin.site.register(Skill)
admin.site.register(Trainer_Contract_Course)
admin.site.register(Trainee_Skills)


class WalletAdmin(admin.ModelAdmin):
    list_display = ['id', 'owner', 'balance']

class DepositAdmin(admin.ModelAdmin):
    list_display = ['id', 'wallet', 'amount', 'deposited_at']

class WithdrawAdmin(admin.ModelAdmin):
    list_display = ['id', 'wallet', 'amount', 'withdrawn_at']

admin.site.register(Wallet, WalletAdmin)
admin.site.register(Deposit, DepositAdmin)
admin.site.register(Withdraw, WithdrawAdmin)