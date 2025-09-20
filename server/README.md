# Law-Up Server

Express.js backend server for Law-Up legal assistant with Google Gemini AI integration.

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   - Open the `.env` file
   - Replace `your_gemini_api_key_here` with your actual Gemini API key
   - Get your API key from: https://makersuite.google.com/app/apikey

3. **Start the Server**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

4. **Verify Server is Running**
   - Open http://localhost:5000 in your browser
   - Check health endpoint: http://localhost:5000/health

## API Endpoints

### GET /
- **Description**: Root endpoint to verify API is running
- **Response**: JSON with server status

### POST /chat
- **Description**: Chat with legal AI assistant
- **Body**: `{ "prompt": "your question here" }`
- **Response**: `{ "response": "AI response" }`

### GET /health
- **Description**: Health check endpoint
- **Response**: Server status and configuration info

## Environment Variables

- `GEMINI_API_KEY`: Your Google Gemini API key (required)
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment mode (default: development)

## CORS Configuration

The server is configured to accept requests from:
- http://localhost:5173 (Vite dev server)
- http://127.0.0.1:5173

## Error Handling

The server includes comprehensive error handling for:
- Missing API key
- Invalid requests
- Gemini API errors
- Server errors

## Legal AI System Prompt

The server uses a specialized system prompt that:
- Focuses on legal guidance and education
- Explains complex legal concepts simply
- Always includes disclaimers about professional legal advice
- Maintains a professional but approachable tone
