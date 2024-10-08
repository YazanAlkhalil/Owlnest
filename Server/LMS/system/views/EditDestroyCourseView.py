#DRF 
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
#models 
from system.models.Course import Course 

#serializers 
from system.serializers.EditCourseInformationSerializer import EditCourseInformationSerializer


class EditDestroyCourseView(RetrieveUpdateDestroyAPIView):
      serializer_class = EditCourseInformationSerializer
      permission_classes = [IsAuthenticated]
      queryset = Course.objects.all()