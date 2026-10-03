# StudyRAG — AI-Powered Study Assistant

> Upload your PDF notes and ask questions. StudyRAG explains concepts using **only** the content from your own documents — no hallucinations, no outside knowledge.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
  - [1. Clone the repository](#1-clone-the-repository)
  - [2. Set up the Backend](#2-set-up-the-backend)
  - [3. Set up the Frontend](#3-set-up-the-frontend)
- [API Reference](#api-reference)
- [How It Works](#how-it-works)
- [Features](#features)

---

## Overview

**StudyRAG** is a full-stack **Retrieval-Augmented Generation (RAG)** application built for students. You upload PDF study notes, and the AI answers your questions based strictly on the content of those documents — making it ideal for exam preparation and concept revision.

---

## Tech Stack

### Backend
| Layer | Technology |
|---|---|
| Runtime | Node.js (ES Modules) |
| Framework | Express 5 |
| LLM | Groq (`openai/gpt-oss-120b`) via `@langchain/groq` |
| Embeddings | Google Gemini (`gemini-embedding-001`) via `@langchain/google-genai` |
| Vector Store | Qdrant via `@langchain/qdrant` |
| PDF Parsing | `pdf-parse` |
| Text Splitting | `@langchain/textsplitters` (RecursiveCharacterTextSplitter) |
| File Upload | `multer` (in-memory storage, 10 MB limit) |

### Frontend
| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS 4 |
| Routing | React Router DOM 7 |
| Animations | Framer Motion 14 |
| Icons | Lucide React |
| Markdown | `react-markdown` |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                             │
│                                                             │
│   ┌─────────────┐          ┌──────────────────────────┐    │
│   │  Home Page  │  Upload  │       Chat Page          │    │
│   │  (UploadZone│ ───────► │  (ChatWindow + Sidebar)  │    │
│   │   FilePreview)         │                          │    │
│   └─────────────┘          └──────────────────────────┘    │
│           │                          │                      │
│      POST /api/upload           POST /api/ai               │
└───────────┼──────────────────────────┼─────────────────────┘
            │                          │
            ▼                          ▼
┌───────────────────────────────────────────────────────────┐
│                  Express Backend (port 5000)               │
│                                                           │
│  ┌─────────────────┐       ┌──────────────────────────┐  │
│  │  PDF Controller  │       │      AI Controller        │  │
│  │                  │       │                           │  │
│  │  1. Parse PDF    │       │  1. Embed user query      │  │
│  │  2. Split chunks │       │  2. Similarity search     │  │
│  │  3. Embed chunks │       │     (top-5 docs)          │  │
│  │  4. Store in     │       │  3. Build prompt (context │  │
│  │     Qdrant       │       │     + FAQ context)        │  │
│  └─────────────────┘       │  4. Call Groq LLM         │  │
│                             │  5. Return answer + sources│  │
│                             └──────────────────────────┘  │
│                                                           │
│  ┌─────────────────────────────────────────────────────┐  │
│  │          Qdrant Vector Database (self-hosted)        │  │
│  └─────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────┘
```

---

## Project Structure

```
BmsitNotes/
├── backend/
│   ├── index.js                  # Server entry point
│   ├── package.json
│   ├── .env                      # Backend environment variables
│   └── src/
│       ├── app.js                # Express app setup & CORS
│       ├── config/
│       │   ├── ai.js             # LLM, Embeddings & Vector Store config
│       │   └── env.js            # Environment variable loader
│       ├── controllers/
│       │   ├── ai.controller.js  # Handles /api/ai — RAG query logic
│       │   └── pdf.controller.js # Handles /api/upload — PDF ingestion
│       ├── middleware/
│       │   └── upload.js         # Multer config (memory storage, 10 MB)
│       ├── routes/
│       │   └── ai.routes.js      # Route definitions
│       └── services/
│           └── pdf.service.js    # PDF parsing & vector store ingestion
│
└── frontend/
    ├── index.html
    ├── vite.config.js            # Vite + proxy config (/api → :5000)
    ├── package.json
    ├── .env.example              # Frontend environment variables template
    └── src/
        ├── main.jsx              # React entry point
        ├── App.jsx               # Router, page transitions, background
        ├── index.css             # Global styles
        ├── api/
        │   └── ragApi.js         # API client (upload, ask, local document store)
        ├── components/
        │   ├── ChatInput.jsx     # Message input bar
        │   ├── ChatMessage.jsx   # Renders user/assistant messages (Markdown)
        │   ├── ChatWindow.jsx    # Scrollable chat container
        │   ├── DocumentCard.jsx  # Sidebar document entry
        │   ├── DocumentList.jsx  # Sidebar document list
        │   ├── EmptyChat.jsx     # Placeholder when no messages exist
        │   ├── FilePreview.jsx   # Selected file preview before upload
        │   ├── Navbar.jsx        # Top navigation bar
        │   ├── ProcessingState.jsx # Upload progress indicator
        │   ├── SourceList.jsx    # Renders RAG source references
        │   └── UploadZone.jsx    # Drag-and-drop / click upload area
        ├── hooks/
        │   └── useChat.js        # Chat state (messages, loading, send, retry, clear)
        ├── pages/
        │   ├── Home.jsx          # PDF upload flow (idle → uploading → success/error)
        │   └── Chat.jsx          # Chat interface with sidebar + mobile drawer
        └── utils/
            └── format.js         # Utility formatting helpers
```

---

## Prerequisites

Before you begin, ensure you have the following installed and configured:

- **Node.js** v18+
- **npm** v9+
- **Qdrant** — a running Qdrant instance (local Docker or cloud)
  ```bash
  # Quick start with Docker
  docker pull qdrant/qdrant
  docker run -p 6333:6333 qdrant/qdrant
  ```
- A **Groq API key** — [console.groq.com](https://console.groq.com)
- A **Google Gemini API key** — [aistudio.google.com](https://aistudio.google.com)

> [!IMPORTANT]
> You must create the Qdrant collection **before** starting the backend. The app connects to an existing collection on startup.

---

## Environment Variables

### Backend — `backend/.env`

```env
PORT=5000

# Groq
GROQ_API_KEY=your_groq_api_key_here

# Google Gemini (for embeddings)
GOOGLE_API_KEY=your_google_api_key_here

# Qdrant
QDRANT_URL=http://localhost:6333
QDRANT_COLLECTION=RagPratice
```

### Frontend — `frontend/.env`

```env
# Leave empty to use the Vite dev proxy (/api → http://localhost:5000).
# For separate deployments, set the full backend URL:
VITE_API_URL=
```

> [!NOTE]
> In development, the Vite dev server automatically proxies all `/api/*` requests to `http://localhost:5000`, so `VITE_API_URL` can remain empty.

---

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd BmsitNotes
```

### 2. Set up the Backend

```bash
cd backend

# Install dependencies
npm install

# Create and fill in your environment file
cp .env.example .env
# (Edit .env with your API keys and Qdrant URL)

# Start in development mode (requires nodemon)
npm run dev

# OR start in production mode
npm start
```

The backend server will start on **http://localhost:5000**.

### 3. Set up the Frontend

Open a **new terminal** in the project root:

```bash
cd frontend

# Install dependencies
npm install

# (Optional) Copy the env example
cp .env.example .env

# Start the development server
npm run dev
```

The frontend will be available at **http://localhost:5173**.

---

## API Reference

### `POST /api/upload`

Upload a PDF file to be parsed, chunked, embedded, and stored in the Qdrant vector database.

**Request:** `multipart/form-data`

| Field | Type | Description |
|---|---|---|
| `file` | `File` | A PDF file (max 10 MB) |

**Response:**
```json
{ "msg": "PDF uploaded successfully" }
```

**Error responses:**

| Status | Body |
|---|---|
| `400` | `{ "error": "No file uploaded" }` |
| `500` | `{ "error": "<error message>" }` |

---

### `POST /api/ai`

Ask a question. The backend retrieves the top-5 most relevant document chunks from Qdrant and passes them as context to the Groq LLM.

**Request:** `application/json`

```json
{ "input": "What is the difference between a stack and a queue?" }
```

**Response:**
```json
{
  "ai": "Based on your notes, a stack follows LIFO (Last In, First Out)...",
  "sources": []
}
```

**Error responses:**

| Status | Body |
|---|---|
| `500` | `{ "error": "<error message>" }` |

---

## How It Works

1. **Upload** — A PDF is sent to `POST /api/upload`.
2. **Parse** — The backend extracts raw text from the PDF using `pdf-parse`.
3. **Chunk** — Text is split into overlapping chunks (1000 chars, 200 char overlap) using `RecursiveCharacterTextSplitter`.
4. **Embed** — Each chunk is converted to a 768-dimensional vector using Google Gemini's `gemini-embedding-001` model.
5. **Store** — Vectors are upserted into the configured Qdrant collection.
6. **Query** — When a user sends a question, it is embedded using the same model and a cosine similarity search retrieves the top-5 matching chunks.
7. **Generate** — The retrieved chunks are injected as context into a carefully crafted system prompt, and the Groq LLM generates an answer grounded strictly in the provided context.
8. **Display** — The frontend renders the response with full Markdown support.

---

## Features

- 📄 **PDF ingestion** — Drag-and-drop or click-to-upload with live progress feedback
- 🧠 **Context-grounded answers** — The AI is strictly instructed to answer only from your documents
- 📝 **Exam-mode answers** — Structured responses with definitions, key points, examples, and complexity where available
- 💬 **Chat interface** — Persistent conversation with retry support for failed messages
- 📚 **Knowledge base sidebar** — View all uploaded documents; responsive with a mobile drawer
- ✨ **Smooth animations** — Page transitions and UI state changes powered by Framer Motion
- 🌑 **Dark UI** — Glassmorphism design with a deep dark theme
