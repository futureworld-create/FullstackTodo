from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    # You can add more fields here if needed

    def __str__(self):
        return self.username
