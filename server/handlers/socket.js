const Room = require("../models/Room").Room;

const joinRoom = async ({ roomId, displayName, socket, io }) => {
	try {
		const room = await getRoomData(roomId);

		room.users.push({ socketId: socket.id, displayName });
		await Room.updateOne({ roomId }, { $set: { users: room.users } });

		socket.join(roomId);

		if (room.currentVideo) {
			const videoData = {
				videoUrl: room.currentVideo.videoUrl,
				state: room.currentVideo.state,
				currTime: room.currentVideo.currentTime,
			};
			socket.emit("SYNC", videoData);
		}

		io.to(roomId).emit("NEW_USER");
		socket.on("disconnect", () => disconnect(socket, roomId, io));
	} catch (error) {
		console.error("Error joining room:", error.message);
	}
};

const videoLoad = async (data, io) => {
	const room = await Room.findOne({ roomId: data.roomId });
	room.currentVideo.videoUrl = data.videoUrl;
	await room.save();

	io.to(data.roomId).emit("VIDEO_LOAD", data.videoUrl);
};

const videoPlay = async (io, roomId) => {
	const room = await Room.findOne({ roomId });
	console.log("video play was emmited for room ", roomId);
	try {
		io.to(roomId).emit("VIDEO_PLAY", room.currentVideo.currentTime);
	} catch (error) {
		console.error("Error: ", error);
	}
};

const vidoPause = async (data, roomId, io) => {
	const room = await Room.findOne({ roomId });
	room.currentVideo.state = "pause";
	room.currentVideo.currentTime = data.currTime;
	await room.save();

	io.to(roomId).emit("VIDEO_PAUSE", data.currTime);
};

const videoBuffer = async (data, roomId, socket) => {
	const room = await Room.findOne({ roomId });
	room.currentVideo.currentTime = data.currTime;
	room.save();

	socket.to(roomId).broadcast.emit("VIDEO_BUFFER", room.currentVideo.currentTime);
};

const disconnect = async (socket, roomId, io) => {
	const room = await Room.findOne({ roomId });

	if (room.users.length <= 1) {
		await Room.deleteOne({ roomId });
	} else {
		room.users = room.users.filter((obj) => obj.socketId !== socket.id);
		await room.save();
	}

	const users = room.users;
	io.to(roomId).emit("roomUsers", { users });
};

const createMessage = async (data, io) => {
	const room = await Room.findOne({ roomId: data.roomId });
	room.messages.push({ from: data.from, text: data.text });
	room.save();
	io.to(data.roomId).emit("NEW_MESSAGE");
};

module.exports = {
	joinRoom,
	videoLoad,
	videoPlay,
	vidoPause,
	videoBuffer,
	disconnect,
	createMessage,
};
