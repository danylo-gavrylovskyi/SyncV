const express = require("express");
const router = express.Router();
const Room = require("../models/Room").Room;
const { v4: uuidv4 } = require("uuid");

const createNewRoom = (youtubeUrl) => {
	const roomId = uuidv4();
	const room = new Room({ roomId, currentVideo: { videoUrl: youtubeUrl }, users: [] }).save();
	return roomId;
};

router.post("/room", (req, res) => {
	const youtubeUrl = req.body.youtubeUrl;
	const room = createNewRoom(youtubeUrl);
	res.send({ room });
});

router.get("/join", async (req, res) => {
	const room = await Room.findOne({ roomId: req.query.roomId });
	if (room) {
		res.send(`${req.query.roomId}`);
	} else {
		res.send("/");
	}
});

router.get("/room-info/:id", async (req, res) => {
	const room = await Room.findOne({ roomId: req.params.id });
	return res.json(room);
});

module.exports = router;
