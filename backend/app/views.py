

from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer, LoginSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth import login
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt
from .models import TodoItem
from .serializers import TodoListSerializer


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


#==========Todo add ======
@csrf_exempt
@api_view(['POST'])
@permission_classes((AllowAny,))
def add_todo(request):
    user = request.user
    if not user.is_authenticated:
        return Response({"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

    title = request.data.get('title')
    description = request.data.get('description', '')
    completed = request.data.get('completed', False)
    due_date = request.data.get('due_date', None)

    if not title:
        return Response({"error": "Title is required"}, status=status.HTTP_400_BAD_REQUEST)

    todo_item = TodoItem.objects.create(
        user=user,
        title=title,
        description=description,
        completed=completed,
        due_date=due_date
    )

    return Response({"message": "Todo item added successfully", "todo_id": todo_item.id}, status=status.HTTP_201_CREATED)

@csrf_exempt
@api_view(['GET'])
def list_todo(request):
    user = request.user
    if not user.is_authenticated:
        return Response({"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

    todos = TodoItem.objects.filter(user=user)
   
    
    serializer = TodoListSerializer(todos, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
@csrf_exempt
@api_view(['GET'])
def get_todo(request, todo_id):
    user = request.user
    if not user.is_authenticated:
        return Response({"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

    try:
        todo = TodoItem.objects.get(id=todo_id, user=user)
    except TodoItem.DoesNotExist:
        return Response({"error": "Todo item not found"}, status=status.HTTP_404_NOT_FOUND)
    serializer = TodoListSerializer(todo)
    return Response(serializer.data, status=status.HTTP_200_OK)
@csrf_exempt
@api_view(['PUT'])
def completed_task(request, todo_id):
    user = request.user
    if not user.is_authenticated:
        return Response({"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

    try:
        todo = TodoItem.objects.get(id=todo_id, user=user)
    except TodoItem.DoesNotExist:
        return Response({"error": "Todo item not found"}, status=status.HTTP_404_NOT_FOUND)

    todo.completed = request.data.get('completed', todo.completed)
    todo.save()

    serializer = TodoListSerializer(todo)
    return Response(serializer.data, status=status.HTTP_200_OK)

@csrf_exempt
@api_view(['PUT'])
def update_todo(request, todo_id):
    user = request.user
    if not user.is_authenticated:
        return Response({"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

    try:
        todo = TodoItem.objects.get(id=todo_id, user=user)
    except TodoItem.DoesNotExist:
        return Response({"error": "Todo item not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = TodoListSerializer(todo, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['DELETE'])
def delete_todo(request, todo_id):
    user = request.user
    if not user.is_authenticated:
        return Response({"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

    try:
        todo = TodoItem.objects.get(id=todo_id, user=user)
    except TodoItem.DoesNotExist:
        return Response({"error": "Todo item not found"}, status=status.HTTP_404_NOT_FOUND)

    todo.delete()
    return Response({"message": "Todo item deleted successfully"}, status=status.HTTP_204_NO_CONTENT)