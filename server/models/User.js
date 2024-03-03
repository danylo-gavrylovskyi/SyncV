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
