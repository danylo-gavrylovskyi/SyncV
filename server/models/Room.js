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
