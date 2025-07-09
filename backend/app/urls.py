
from django.urls import path
from .views import *

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path("add_todo/", add_todo, name='add_todo'),
    path('list_todo/', list_todo, name='list_todo'),
]