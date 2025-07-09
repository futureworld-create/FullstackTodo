

from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer, LoginSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth import login
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt



@api_view(['POST'])
@permission_classes((AllowAny,))
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({"registration successfull"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['POST'])
@permission_classes((AllowAny,))
def login_view(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data
        login(request, user)
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key,
                             "userId": user.id,
                            'username': user.username,
                            'email': user.email,
                         
                         }, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['GET'])
def logout_view(request):
    request.user.auth_token.delete()
    return Response(status=status.HTTP_200_OK)



