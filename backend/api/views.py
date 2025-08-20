import os
from google import genai
from django.conf import settings # Import settings to access GEMINI_API_KEY

from rest_framework import generics
from .models import JournalEntry, ChatHistory
from .serializers import JournalEntrySerializer, ChatHistorySerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Count
from rest_framework.permissions import IsAuthenticated

# Configure Gemini API
client = genai.Client(api_key=settings.GEMINI_API_KEY)
# genai.configure(api_key=settings.GEMINI_API_KEY)
chat = client.chats.create(model="gemini-2.5-flash")
# model = genai.GenerativeModel('gemini-2.5-flash')

class JournalEntryListCreate(generics.ListCreateAPIView):
    queryset = JournalEntry.objects.all()
    serializer_class = JournalEntrySerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            print("Serializer Errors:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class ChatView(APIView):
    def post(self, request, *args, **kwargs):
        user_message = request.data.get('message')
        if not user_message:
            return Response({"error": "No message provided"}, status=status.HTTP_400_BAD_REQUEST)

        # Basic safety check (can be expanded)
        if "distress" in user_message.lower() or "help me" in user_message.lower():
            llm_response = "I understand you might be going through a difficult time. Please consider reaching out to a professional helpline or a trusted person. You are not alone."
        else:
            try:
                # Call Gemini API
                response = chat.send_message(user_message)
                llm_response = response.text
            except Exception as e:
                print(f"Gemini API error: {e}")
                llm_response = "I'm sorry, I couldn't process your request at the moment. Please try again later."

        # Save chat history
        chat_history = ChatHistory.objects.create(
            user=request.user, # Assuming user is authenticated
            message=user_message,
            response=llm_response
        )
        serializer = ChatHistorySerializer(chat_history)

        return Response(serializer.data, status=status.HTTP_200_OK)

class ProgressView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        mood_counts = JournalEntry.objects.filter(user=request.user).values('mood').annotate(count=Count('mood'))
        return Response(mood_counts, status=status.HTTP_200_OK)