from django.urls import path
from .views import JournalEntryListCreate, ChatView, ProgressView
from .auth_views import RegisterView, LoginView # Import new views

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('journal/', JournalEntryListCreate.as_view(), name='journal-list-create'),
    path('chat/', ChatView.as_view(), name='chat'),
    path('progress/', ProgressView.as_view(), name='progress'),
]