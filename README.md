# Documentation and Guide for Developers

### Chat Application Overview

The chat application is a real-time messaging system implemented using Django channels for WebSocket communication. It includes a backend implemented in Django and a frontend built with HTML, CSS, and JavaScript.

## Prerequisites

-  Python
-  Django
-  Channels
-  Bootstrap

## Project Structure

### Backend (Django)

URLs (urls.py):

-  Specifies the project's URL patterns, including the main page and the WebSocket chat endpoint.

Views (views.py):

-  Implements the main page view and the WebSocket chat view.

ASGI (asgi.py):

-  Configures the ASGI application.

### Frontend (HTML, CSS, JavaScript)

HTML (chat.html):

-  Provides the structure for the chat application.
-  Includes input fields for the username and message, a chat container, and a button to send messages.

CSS (styles/style.css):

-  Defines styles for the chat application, such as message formatting and layout.

JavaScript (chat.js):

-  Manages WebSocket communication.
-  Defines functions for sending messages, receiving messages, and updating the chat display.
-  Utilizes local storage for storing chat history.

## Developer Guide

Setting Up the Development Environment

1. Install Python

2. Create a virtual environment (optional but recommended):

```bash
python -m venv venv
venv\Scripts\activate  # For Windows
```

3. Install Django and Channels:

```bash
pip install Django==4.2.9 channels==3.0.4
```

Running the Chat Application Locally

1. Clone the repository:

```bash
git clone <https://github.com/danylo-gavrylovskyi/SyncV.git>
cd <repository_directory>
git checkout hw9
```

2. Run the development server:

```bash
python manage.py runserver
```

3. Access the chat application in your browser: http://127.0.0.1:8000/ws

## WebSocket Communication

-  WebSocket communication is handled by Django channels.
-  The WebSocket connection is established at ws://127.0.0.1:8000/ws.
-  Messages are sent and received using the chatSocket object in JavaScript.

## Frontend Implementation

-  The frontend includes an HTML structure with input fields for the username and message, a chat container, and a button to send messages.
-  JavaScript (chat.js) manages user input, sends messages via WebSocket, and updates the chat display.
-  Local storage is used to store and retrieve chat history.

## Features

1. Real-Time Chat
   -  <b>WebSocket Communication:</b> Utilizes Django channels to establish a WebSocket connection for real-time bidirectional communication between - the server and clients.
   -  <b>Instant Message Delivery:</b> Messages are sent and received in real-time, providing users with a seamless and responsive chat experience.
2. Chat History
   -  <b>Local Storage:</b> Persists chat history on the client-side using local storage, allowing users to view previous messages even after - refreshing the page.
   -  <b>Automatic Loading:</b> Loads chat history from local storage on page load, providing a seamless continuation of the conversation.
3. Clear Chat History
   -  <b>Clear Button:</b> Includes a "Clear" button that allows users to remove all messages from the chat container.
   -  <b>Local Storage Update:</b> Clears the chat history from local storage, ensuring that the chat history is also reset for subsequent sessions.
4. Responsive Design
   -  <b>Mobile-Friendly Layout:</b> The frontend is designed to be responsive, ensuring optimal user experience across various devices, including - desktops, tablets, and mobile phones.
   -  <b>Bootstrap Integration:</b> Utilizes Bootstrap CSS framework for responsive and visually appealing UI components.

## Screenshots

User send message

![image](https://github.com/danylo-gavrylovskyi/SyncV/assets/118884527/a0d29286-0770-4b64-96f7-fd6883e21939)

User receive message

![image](https://github.com/danylo-gavrylovskyi/SyncV/assets/118884527/87522ecd-2813-4d7d-8f06-f3bcf308c7ac)

User didn't enter his name

![image](https://github.com/danylo-gavrylovskyi/SyncV/assets/118884527/d634a3d2-8950-46ad-a087-2f1b529b5474)
