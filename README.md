# SyncV App

SyncV is a real-time video synchronization and chat application that allows users to watch videos together in sync.

## Getting Started

These instructions will help you set up and run the SyncV application on your local machine.

### Starting the Server

1. Open a terminal window.
2. Clone project and navigate to the server directory of your project using the cd command:

```bash
git clone https://github.com/danylo-gavrylovskyi/SyncV.git
cd path/to/your/server
```

3. Install the server dependencies:

```bash
npm install
```

4. Start the server:

```bash
npm run start
```

This will run server, and it will listen for incoming connections on the `3400` port

### Starting the Client

1. Open a terminal window.
2. Navigate to the server directory of your project using the cd command:

```bash
cd path/to/your/client
```

3. Install the client dependencies:

```bash
npm install
```

4. Start the client:

```bash
npm run start
```

This will run your React app, and it will be accessible in your web browser. Make sure that both the server and client are running concurrently for the application to work properly. If you encounter any issues or error messages during this process, check the terminal outputs for more information on what might be causing the problem.

## Server

### Technologies Used

-  Node.js
-  Express.js
-  Socket.io
-  MongoDB (Mongoose)

### File Structure

```plaintext
server
│   server.js
│   package.json
│   mongooseConnection.js
├───logs
├───configs
│       mongoConnection.js
│       port.js
├───handlers
│       socket.js
├───middlewares
│       error-handler.js
├───models
│       Room.js
├───routes
│       roomRoutes.js
└───utils
        originFunction.js
```

### API Endpoints

#### POST /room

Creates a new room with the provided YouTube URL.

Example:

```javascript
axios.post("http://localhost:3400/room", { youtubeUrl });
```

#### GET /join

Joins an existing room using the provided room ID.

Example:

```javascript
axios.get("http://localhost:3400/join", { params: { roomId } });
```

#### GET /room-info/:id

Retrieves information about a specific room.

### WebSocket Events

-  joinRoom: Handles user joining a room.
-  VIDEO_LOAD: Handles loading a new video in a room.
-  VIDEO_PLAY: Handles playing a video in sync.
-  VIDEO_PAUSE: Handles pausing a video in sync.
-  VIDEO_BUFFER: Handles buffering events.
-  CREATE_MESSAGE: Handles creating a new chat message.

### Database Schema

The MongoDB schema includes a Room model with fields for room ID, current video details, users, and messages.

```javascript
const RoomSchema = new mongoose.Schema({
	roomId: String,
	currentVideo: {
		videoUrl: String,
		state: String,
		currentTime: Number,
	},
	users: [
		{
			socketId: String,
			displayName: String,
		},
	],
	messages: [
		{
			from: String,
			text: String,
		},
	],
});
```

## Client

The client is a React application that provides a user interface for creating/joining rooms, watching videos, and chatting.

### Technologies Used

-  React
-  React Router
-  Axios
-  Socket.io-client
-  React Player
-  Modal

```plaintext
client
├───src
│       App.js
│       index.js
├───────components
├───────pages
├───────styles
```

### Major Components

#### Home Component

The landing page where users can create a new room or join an existing one.

-  Features:
   -  Create a new room with display name and YouTube URL.
   -  Join an existing room with display name and room ID.

Example:

```javascript
const joinRoom = (roomId) => {
	axios.get("http://localhost:3400/join", { params: { roomId } }).then((res) => {
		navigate("room=/" + `${res.data}`);
	});
};
```

#### Room Component

The main interface for users within a room, including video playback, chat, and modals.

-  Features:
   -  Real-time video synchronization.
   -  Chat functionality for communication.
   -  Modal dialogs for changing the video and inviting friends.

Example:

```javascript
socket.on("VIDEO_PLAY", (data) => {
	setPlaying(true);
});
```

#### Chat Component

Handles real-time messaging between users within a room.

-  Features:
   -  Displays participants.
   -  Shows real-time messages.

Example:

```javascript
<div className={styles.container}>
	{messages &&
		messages.map((message) => (
			<Message user={message.from} key={message._id}>
				{message.text}
			</Message>
		))}
</div>
```

### Modals

#### Change Video Modal

-  Opens when the "Change Video" button is clicked.
-  Allows users to input a new video URL.
-  Sends a VIDEO_LOAD socket event to synchronize the video with other users.

#### Invite Friends Modal

-  Opens when the "Invite Friends" button is clicked.
-  Displays the room ID and provides a "Copy to Clipboard" button.

## Application Screenshots

### Home Page

![image](https://github.com/danylo-gavrylovskyi/SyncV/assets/118884527/b5a0c25b-7690-4eca-a626-e8b877e40e35)

### Room Page

![image](https://github.com/danylo-gavrylovskyi/SyncV/assets/118884527/72f360be-3a6a-49b5-ba76-27579e0c8ad4)

### Chat

![image](https://github.com/danylo-gavrylovskyi/SyncV/assets/118884527/7bc5bc33-0117-40c1-8607-72b3160a4547)

### Change Video Modal

![image](https://github.com/danylo-gavrylovskyi/SyncV/assets/118884527/251afc15-aae3-4a11-b934-052657578d99)

### Invite Friends Modal

![image](https://github.com/danylo-gavrylovskyi/SyncV/assets/118884527/5096ce5f-3493-470f-8286-edd2939482ae)

