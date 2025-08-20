# Mental Wellness Application

This is a mental wellness application designed to provide users with an AI chatbot, a journal for mood tracking, and a dashboard to visualize progress.

## Features

- **AI Chatbot:** Interact with an AI for conversational support.
- **Journal:** Record daily thoughts and moods.
- **Progress Dashboard:** Visualize mood trends and other aggregated statistics.

## Tech Stack

### Frontend
- React
- TailwindCSS (planned)
- Axios
- Recharts/Chart.js

### Backend
- Django
- Django REST Framework
- SQLite (for development/demo)

### AI Integration
- Google Gemini API (integrated)

## Gemini API Key Setup

1.  **Obtain a Gemini API Key:**
    If you don't have one, you can obtain a Gemini API key from the Google AI Studio: [https://aistudio.google.com/](https://aistudio.google.com/)

2.  **Create a `.env` file:**
    In the **root directory** of the project (where `manage.py` is located), create a file named `.env`.

3.  **Add your API Key to `.env`:**
    Open the `.env` file and add the following line, replacing `YOUR_GEMINI_API_KEY` with your actual key:

    ```
    GEMINI_API_KEY=YOUR_GEMINI_API_KEY
    ```

## Setup Instructions

Follow these steps to set up and run the application locally.

### Prerequisites

- Python 3.8+
- Node.js (LTS version) & npm

### 1. Backend Setup (Django)

Navigate to the `backend` directory:

```bash
cd backend
```

**Install Python Dependencies:**

```bash
pip install -r requirements.txt
```

**Run Database Migrations:**

```bash
python manage.py migrate
```

**Create a Superuser (for Admin Panel and API Authentication):**

This step is interactive. Follow the prompts to create a username, email, and password.

```bash
python manage.py createsuperuser
```

**Start the Backend Development Server:**

```bash
python manage.py runserver
```

The backend API will be accessible at `http://127.0.0.1:8000/`.

### 2. Frontend Setup (React with Vite)

Navigate to the `frontend` directory in a new terminal window:

```bash
cd frontend
```

**Install Node.js Dependencies:**

```bash
npm install
```

**Start the Frontend Development Server:**

```bash
npm run dev
```

The frontend application will typically open in your browser at `http://localhost:5173/`.

## API Endpoints

The following API endpoints are available:

- `GET /api/journal/`: Retrieve all journal entries.
- `POST /api/journal/`: Create a new journal entry.
- `POST /api/chat/`: Send a message to the AI chatbot and receive a reply.
- `GET /api/progress/`: Get aggregated mood statistics.

## Future Enhancements

- Implement actual LLM integration (OpenAI/Hugging Face).
- Add user authentication and registration.
- Develop detailed frontend UI for chat, journal, and dashboard.
- Implement safety layer for AI responses.
- Deployment configurations for Vercel/Netlify and Render/Heroku.
