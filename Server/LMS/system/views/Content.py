# rest_framework
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from django.shortcuts import get_object_or_404
from rest_framework import status
# models
from ..models.Temp_unit import Temp_Unit
from ..models.Temp_Content import Temp_Content
from ..models.Content import Content
from ..models.Pdf import Pdf
from ..models.Video import Video
from ..models.Test import Test
# serialzers
from ..serializers.Temp_Content import Temp_Content_Serializer
from ..serializers.Content import Content_Serializer
# permissions
from ..permissions.IsCourseTrainer import IsCourseTrainer
from ..permissions.IsCourseAdminOrTrainer import IsCourseAdminOrTrainer
# swagger
from drf_yasg.utils import swagger_auto_schema
from ..swagger.Content import content_create_request_body

# GET : api/admin/company/:company_id/courses/:course_id/unit/:unit_id/contents
# GET : api/trainer/company/:company_id/courses/:course_id/unit/:unit_id/contents
class ContentList(generics.ListAPIView):
    # set the serializer class
    serializer_class = Content_Serializer
    # set the permission class
    permission_classes = [IsAuthenticated, IsCourseAdminOrTrainer]
    # set the lookup field to match the URL keyword argument
    lookup_url_kwarg = 'unit_id'
    # Document the view
    # @swagger_auto_schema(
    #     operation_description='for presenting the list of courses for a specific company showing only the important data',
    #     responses={200: unit_retrive_list_response_body}
    # )
    # def get(self, request, *args, **kwargs):
    #     return super().get(request, *args, **kwargs)
    def get_queryset(self):
        unit_id = self.kwargs['unit_id']
        try:
            content = Content.objects.filter(unit=unit_id)
        except Content.DoesNotExist:
            raise ValidationError('No content for this unit')
        return content

# GET: api/admin/company/:company_id/courses/:course_id/unit/:unit_id/contents
# GET: api/trainer/company/:company_id/courses/:course_id/unit/:unit_id/contents
class ContentRetrieve(generics.RetrieveAPIView):
    # set the serializer class
    serializer_class = Content_Serializer
    # set the permission class
    permission_classes = [IsAuthenticated, IsCourseAdminOrTrainer]
    # set the lookup field to match the URL keyword argument
    lookup_url_kwarg = 'content_id'
    # Document the view
    # @swagger_auto_schema(
    #     operation_description='for presenting a specific course from a specific company showing only the important data',
    #     responses={200: unit_retrive_list_response_body}
    # )
    # def get(self, request, *args, **kwargs):
    #     return super().get(request, *args, **kwargs)
    def get_queryset(self):
        content_id = self.kwargs['content_id']
        try:
            content = Content.objects.filter(id=content_id)
        except Content.DoesNotExist:
            raise ValidationError('No such content for this unit')
        return content

# POST : api/trainer/company/:company_id/courses/:course_id/unit/:unit_id/content
class ContentCreate(generics.CreateAPIView):
    # set the serializer class
    serializer_class = Temp_Content_Serializer
    # set the permission class
    permission_classes = [IsAuthenticated, IsCourseTrainer]
    # Document the view
    @swagger_auto_schema(
        operation_description='for creating a new unit to a specific course',
        request_body=content_create_request_body,
        responses={200: content_create_request_body}
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)
    # save the cours to the temp_content
    def perform_create(self, serializer):
        course_id = self.kwargs['course_id']
        temp_unit_id = self.kwargs['unit_id']
        try:
            temp_unit = Temp_Unit.objects.get(id=temp_unit_id, course__id=course_id)
        except Temp_Unit.DoesNotExist:
            raise ValidationError({'message': 'Unit does not exists'})
        # Check the type of content and save accordingly
        content_type = self.request.data.get('content_type')
        if content_type == 'pdf':
            file_path = self.request.data.get('file_path')
            if file_path is None:
                raise ValidationError({'message': 'The "file_path" field is required for pdf content.'})
            temp_content = serializer.save(temp_unit=temp_unit, state='PR', is_pdf=True)
            Pdf.objects.create(
                temp_content=temp_content, 
                file_path=file_path
            )
        elif content_type == 'video':
            description = self.request.data.get('description')
            file_path = self.request.data.get('file_path')
            if description is None or file_path is None:
                raise ValidationError({'message': 'The "description" and "file_path" field is required for video content.'})
            temp_content = serializer.save(temp_unit=temp_unit, state='PR', is_video=True)
            Video.objects.create(
                temp_content=temp_content, 
                file_path=file_path,
                description=description
            )
        elif content_type == 'test':
            temp_content = serializer.save(temp_unit=temp_unit, state='PR', is_test=True)
            Test.objects.create(
                temp_content=temp_content, 
                full_mark=self.request.data.get('full_mark')
            )
        else:
            raise ValidationError({'message': 'Invalid content type'})
        # Update temp_unit state
        temp_unit.state = 'PR'
        temp_unit.save()

# PUT : api/trainer/company/:company_id/courses/:course_id/unit/:unit_id/content/:content_id/update
class ContentUpdate(generics.UpdateAPIView):
    # set the serializer class
    serializer_class = Temp_Content_Serializer
    # set the permission class
    permission_classes = [IsAuthenticated, IsCourseTrainer]
    @swagger_auto_schema(
        operation_description='for updating a specific content',
        # responses={200: content_retrive_list_response_body}
    )
    def put(self, request, *args, **kwargs):
        return super().put(request, *args, **kwargs)
    def get_object(self):
        temp_unit_id = self.kwargs['unit_id']
        content_id = self.kwargs['content_id']
        try:
            Temp_Content.objects.get(id=content_id, temp_unit__id=temp_unit_id)
        except Temp_Content.DoesNotExist:
            raise ValidationError({'message': 'Unit does not exists'})
    def perform_update(self, serializer):
        temp_content = self.get_object()
        # Check the type of content and update accordingly
        content_type = self.request.data.get('content_type')
        if not content_type == None:
            if content_type == 'pdf':
                Pdf.objects.create(temp_content=temp_content, defaults={'file_path': self.request.data.get('file_path')})
                # Set state to 'PR' (in progress)
                temp_content.state = 'PR'  
                serializer.save()
            elif content_type == 'video':
                Video.objects.create(temp_content=temp_content, defaults={'file_path': self.request.data.get('file_path'), 'description': self.request.data.get('description')})
                # Set state to 'PR' (in progress)
                temp_content.state = 'PR'  
                serializer.save()
            elif content_type == 'test':
                Test.objects.create(temp_content=temp_content, defaults={'full_mark': self.request.data.get('full_mark')})
                # Set state to 'PR' (in progress)
                temp_content.state = 'PR'  
                serializer.save()
            else:
                raise ValidationError({'message':'did not provide a valid content type'})
        else:
            raise ValidationError({'message':'did not provide a content type'})

# DELETE : api/trainer/company/:company_id/courses/:course_id/unit/:unit_id/contents/:content_id/delete
class ContentDelete(generics.DestroyAPIView):    
    # set the serializer class
    serializer_class = Content_Serializer
    # set the permission class
    permission_classes = [IsAuthenticated, IsCourseTrainer]
    # set the lookup field to match the URL keyword argument
    lookup_url_kwarg = 'content_id'
    lookup_field = 'content_id'
    # Document the endpoint
    @swagger_auto_schema(
        operation_description='obviously for deleteing a specific content',
        responses={204: 'Content set to delete state'}
    )
    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)
    def get_queryset(self):
        unit_id = self.kwargs['unit_id']
        content_id = self.kwargs['content_id']
        content = get_object_or_404(Content, id=content_id, unit__id=unit_id)
        temp_content = get_object_or_404(Temp_Content, content=content)
        return Temp_Content.objects.filter(id=temp_content.id)
    def perform_destroy(self, instance):
        instance.state = 'DE'
        instance.save()

# PATCH : api/trainer/company/:company_id/courses/:course_id/unit/:unit_id/contents/:content_id/restore
class ContentRestore(generics.UpdateAPIView):    
    # set the serializer class
    serializer_class = Content_Serializer
    # set the permission class
    permission_classes = [IsAuthenticated, IsCourseTrainer]
    # set the lookup field to match the URL keyword argument
    lookup_url_kwarg = 'content_id'
    lookup_field = 'content_id'
    # Document the endpoint
    @swagger_auto_schema(
        operation_description='obviously for restoring a deleted content',
        responses={200: 'Content set to InProgress state'}
    )
    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)
    def get_queryset(self):
        unit_id = self.kwargs['unit_id']
        content_id = self.kwargs['content_id']
        content = get_object_or_404(Content, id=content_id, unit__id=unit_id)
        temp_content = get_object_or_404(Temp_Content, content=content)
        return Temp_Content.objects.filter(id=temp_content.id)
    def perform_update(self, serializer):
        temp_content = serializer.instance
        temp_content.state = 'PR'
        temp_content.save()
        return Response({'message': f'restored {temp_content.title} sucessfully'}, status=status.HTTP_200_OK)

# DELETE : api/trainer/company/:company_id/courses/:course_id/unit/:unit_id/contents/:content_id/not_published/delete
class TempContentDelete(generics.DestroyAPIView):    
    # set the serializer class
    serializer_class = Temp_Content_Serializer
    # set the permission class
    permission_classes = [IsAuthenticated, IsCourseTrainer]
    # set the lookup field to match the URL keyword argument
    lookup_url_kwarg = 'content_id'
    lookup_field = 'content_id'
    # Document the endpoint
    @swagger_auto_schema(
        operation_description='obviously for deleteing a specific content',
        responses={204: 'Content set to delete state'}
    )
    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)
    def get_queryset(self):
        content_id = self.kwargs['content_id']
        return get_object_or_404(Temp_Content, id=content_id)
    def perform_destroy(self, instance):
        instance.delete()
        return Response({'message':'Unit Deleted'}, status=204)