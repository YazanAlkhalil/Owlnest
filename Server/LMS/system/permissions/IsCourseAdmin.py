from rest_framework import permissions
from ..models.Course import Course
from ..models.Unit import Unit
from ..models.Temp_unit import Temp_Unit
class IsCourseAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        # Check if the user is authenticated
        if not request.user.is_authenticated:
            return False
        return True
    def has_object_permission(self, request, view, obj):
        if isinstance(obj, Course):
            # Check if the user is the admin or a trainer of the course
            if request.user.is_admin:
                if obj.admin_contract.employed:
                    return obj.admin_contract.admin == request.user.admin
            return False
        elif isinstance(obj, Unit) or isinstance(obj, Temp_Unit):
            # Check if the user is the admin or a trainer of the course
            if request.user.is_admin:
                if obj.course.admin_contract.employed:
                    return obj.course.admin_contract.admin == request.user.admin
            return False