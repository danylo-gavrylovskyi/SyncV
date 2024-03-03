const express = require("express");
const cors = require("cors");
const fs = require("fs");
const morgan = require("morgan");

const {
	videoLoad,
	videoPlay,
	vidoPause,
	videoBuffer,
	createMessage,
	joinRoom,
} = require("./handlers/socket");
const { originFunction } = require("./utils/originFunction.js");
const routes = require("./routes");

const mongoose = require("./mongooseConnection");
mongoose.set("strictQuery", false);

const ErrorHandler = require("./middlewares/error-handler.js");
const PORT = require("./configs/port");

const corsOptions = {
	origin: originFunction,
};

const logFile = fs.createWriteStream("./logs/myLogFile.log", { flags: "a" });
const logFileErrors = fs.createWriteStream("./logs/myLogFileErrors.log", { flags: "a" });

const app = express();
app.use(morgan("tiny", { stream: logFile }));
app.use(cors(corsOptions));
app.use(express.json());
app.use(
	morgan("common", {
		stream: logFileErrors,
		skip: function (req, res) {
			return res.statusCode < 400;
		},
	})
);
app.use("/", routes.roomRoutes);
app.use("/users", routes.userRoutes);
app.use(ErrorHandler);

const io = require("socket.io")(8000, {
	cors: {
		origin: "*",
	},
});

io.on("connection", (socket) => {
	socket.on("joinRoom", ({ roomId, displayName }) =>
		joinRoom({ roomId, displayName, socket, io })
	);
	socket.on("VIDEO_LOAD", (data) => videoLoad(data, io));
	socket.on("VIDEO_PLAY", (data) => videoPlay(io, data.roomId));
	socket.on("VIDEO_PAUSE", (data) => vidoPause(data, data.roomId, io));
	socket.on("VIDEO_BUFFER", (data) => videoBuffer(data, data.roomId, socket));
	socket.on("CREATE_MESSAGE", (data) => createMessage(data, io));

	socket.on("error", (error) => {
		console.error("Socket error:", error.message);
	});
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
