const mongoose = require("mongoose");

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
		type: [
			{
				socketId: String,
				displayName: String,
			},
		],
		default: {},
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
