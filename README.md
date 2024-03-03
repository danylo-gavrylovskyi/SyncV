# Logging and Error Handling Strategies

## Logging

Logging is a critical aspect of understanding application behavior and diagnosing issues. In this project, I've implemented a comprehensive logging strategy using both the morgan middleware for HTTP request logging and a custom error logging mechanism.

1. HTTP Request Logging
   HTTP requests are logged using the morgan middleware with the "tiny" format. This format provides concise yet informative logs regarding incoming requests. The logs are written to a dedicated file, myLogFile.log.

```javascript
const morgan = require("morgan");
const logFile = fs.createWriteStream("./logs/myLogFile.log", { flags: "a" });

app.use(morgan("tiny", { stream: logFile }));
```

2. Error Logging
   Error logs are generated using morgan with the "common" format. This format includes detailed information about the request, making it valuable for debugging. Error logs are written to another dedicated file, myLogFileErrors.log. Only errors with a status code of 400 or higher are logged.

```javascript
const logFileErrors = fs.createWriteStream("./logs/myLogFileErrors.log", { flags: "a" });

app.use(
	morgan("common", {
		stream: logFileErrors,
		skip: function (req, res) {
			return res.statusCode < 400;
		},
	})
);
```

## Error Handling

A centralized error-handling middleware is implemented to manage errors throughout the application. This middleware catches errors, logs them, and sends a structured error response to the client.

```javascript
const ErrorHandler = (err, req, res, next) => {
	const errStatus = err.statusCode || 500;
	const errMsg = err.message || "Something went wrong";
	res.status(errStatus).json({
		success: false,
		status: errStatus,
		message: errMsg,
		stack: process.env.NODE_ENV === "development" ? err.stack : {},
	});
};

module.exports = ErrorHandler;
```

# Caching Strategies

Caching is crucial for enhancing performance, and in this project, I use Redis as a caching mechanism to efficiently store and retrieve room data.

## Redis Caching

Redis is employed to cache room data effectively. Below are some examples showcasing caching strategies for different scenarios:

Example 1: Caching Room Data
Caching room data upon creation or update ensures that subsequent requests retrieve data from the cache, reducing database queries.

```javascript
const redisClient = require("../utils/redis");

// Caching room data upon creation
const createNewRoom = (youtubeUrl) => {
	const roomId = uuidv4();
	const room = new Room({ roomId, currentVideo: { videoUrl: youtubeUrl }, users: [] }).save();

	// Cache room data for 1 hour
	redisClient.setex(roomId, 3600, JSON.stringify(room));

	return roomId;
};
```

Example 2: Retrieving Room Data from Cache
When fetching room information, first check if the data is available in the cache. If not, fetch it from the database and store it in the cache for future requests.

```javascript
const redisClient = require("../utils/redis");

router.get("/room-info/:id", async (req, res) => {
	const roomId = req.params.id;

	redisClient.get(roomId, async (err, cachedRoom) => {
		if (cachedRoom) {
			return res.json(JSON.parse(cachedRoom));
		}

		// If not in cache, fetch from the database
		const room = await Room.findOne({ roomId });

		if (room) {
			// Cache room data for 1 hour
			redisClient.setex(roomId, 3600, JSON.stringify(room));

			return res.json(room);
		} else {
			return res.status(404).json({ error: "Room not found" });
		}
	});
});
```

# Performance Optimization

The combination of logging, error handling, and caching contributes to the overall performance optimization of the application.

# Guide for Future Developers

## Logging and Error Handling

### HTTP Request Logging

-  **Implementation:**

   -  Utilize the morgan middleware to log incoming HTTP requests.
   -  Adjust the logging format based on preferences.

-  **Logs Location:**
   -  HTTP request logs are available in the myLogFile.log file.

### Error Logging

-  **Implementation:**

   -  Errors with a status code of 400 or higher are logged using morgan. - Modify error logging configurations as needed.

-  **Logs Location:**
   -  Error logs are stored in the myLogFileErrors.log file.

### Centralized Error Handling

-  **Implementation:**
   -  The ErrorHandler middleware centrally handles errors.
   -  It provides a structured error response to clients.

## Caching

### Redis Caching

-  **Implementation:**

   -  Utilize Redis for caching frequently accessed room data.
   -  Adjust TTL values based on data update frequency.

-  **Examples:**
   -  Cache room data upon creation or update.
   -  Retrieve room data from the cache if available; otherwise, fetch from the database.
