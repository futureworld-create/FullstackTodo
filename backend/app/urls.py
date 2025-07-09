
from django.urls import path
from .views import *

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path("add_todo/", add_todo, name='add_todo'),
    path('list_todo/', list_todo, name='list_todo'),
    path('get_todo/<int:todo_id>/', get_todo, name='get_todo'),
    path('completed_todo/<int:todo_id>/', completed_task, name='update_todo'),
    path('update_todo/<int:todo_id>/', update_todo, name='update_todo'),
    path('delete_todo/<int:todo_id>/', delete_todo, name='delete_todo'),
]