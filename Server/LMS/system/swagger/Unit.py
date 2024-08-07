# swagger
from drf_yasg import openapi

#########################################################
#                                                       #
#                      Request                          #
#                                                       #
#########################################################

unit_create_request_body = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'title': openapi.Schema(type=openapi.TYPE_STRING, description='title of the unit'),
    },
    required=['title']
)


#########################################################
#                                                       #
#                      Response                         #
#                                                       #
#########################################################


unit_create_respons_body = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        "id": openapi.Schema(type=openapi.TYPE_INTEGER, description='the unit id'),
        "title": openapi.Schema(type=openapi.TYPE_STRING, description='the unit title'),
        "order": openapi.Schema(type=openapi.TYPE_INTEGER, description='the unit order in the whole course perspective'),
        "state": openapi.Schema(type=openapi.TYPE_STRING, description='the unit current state'),
    }
)

unit_retrive_list_response_body = openapi.Schema(
    type=openapi.TYPE_ARRAY,
    items=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            "id": openapi.Schema(type=openapi.TYPE_INTEGER, description='the unit id'),
            "title": openapi.Schema(type=openapi.TYPE_STRING, description='the unit title'),
            "order": openapi.Schema(type=openapi.TYPE_INTEGER, description='the unit order in the whole course perspective'),
            "contents": openapi.Schema(
                type=openapi.TYPE_ARRAY, 
                items=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    # TODO
                ), 
            ),
        }
    )
)
