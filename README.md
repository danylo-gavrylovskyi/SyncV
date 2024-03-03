# Database Integration and API Documentation

## User Model

### User Schema

The `User` model is defined by the following schema:

```javascript
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	socketId: {
		type: String,
		required: true,
		unique: true,
	},
	displayName: {
		type: String,
		required: true,
	},
	password: {
		type: String,
	},
	isHost: {
		type: Boolean,
		default: false,
	},
});

const User = mongoose.model("User", UserSchema);

module.exports = {
	UserSchema,
	User,
};
```

Fields

-  `socketId`: A unique identifier for the user's socket connection.
-  `displayName`: The user's display name.
-  `password`: The user's password (optional).
-  `isHost`: A boolean indicating whether the user is a host (default is false).

### User Controller

The CRUD operations for the `User` model are implemented in the `userController.js`

### API Endpoints

1. Create User

-  **Endpoint:** POST /users/
-  **Request Body:** JSON with user details.
-  **Response: JSON** representation of the created user.
-  **Error Handling:** Returns a 500 Internal Server Error if an issue occurs during user creation.

2. Get All Users

-  **Endpoint:** GET /users/
-  **Response:** JSON array of all users.
-  **Error Handling:** Returns a 500 Internal Server Error if an issue occurs during retrieval.

3. Get User by ID

-  **Endpoint:** GET /users/:id
-  **Response:** JSON representation of the user with the specified ID.
-  **Error Handling:** Returns a 404 User Not Found if the user is not found. Returns a 500 Internal Server Error for other issues.

4. Update User by ID

-  **Endpoint:** PUT /users/:id
-  **Request Body:** JSON with updated user details.
-  **Response:** JSON representation of the updated user.
-  **Error Handling:** Returns a 404 User Not Found if the user is not found. Returns a 500 Internal Server Error for other issues.

5. Delete User by ID

-  **Endpoint:** DELETE /users/:id
-  **Response:** JSON representation of the deleted user.
-  **Error Handling:** Returns a 404 User Not Found if the user is not found. Returns a 500 Internal Server Error for other issues.

## Room Model

### Room Schema

The `Room` model includes the `User` schema as a subdocument:

```javascript
const mongoose = require("mongoose");
const { UserSchema } = require("./User");

const RoomSchema = new mongoose.Schema({
	roomId: {
		type: String,
		required: true,
		unique: true,
	},
	currentVideo: {
		type: {
			videoUrl: String,
			state: String,
			currentTime: Number,
		},
		default: null,
	},
	users: {
		type: [UserSchema],
		default: [],
	},
	messages: {
		type: [
			{
				from: {
					type: String,
					required: true,
				},
				text: {
					type: String,
					required: true,
				},
			},
		],
		default: [],
	},
});

const Room = mongoose.model("Room", RoomSchema);

module.exports = {
	RoomSchema,
	Room,
};
```

Fields

-  roomId: A unique identifier for the room.
-  currentVideo: Details about the current video being played.
-  users: An array of users in the room.
-  messages: An array of messages in the room.

This schema includes the UserSchema as a subdocument within the users field.
