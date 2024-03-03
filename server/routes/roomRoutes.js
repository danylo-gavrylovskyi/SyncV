const express = require("express");
const router = express.Router();
const Room = require("../models/Room").Room;
const { v4: uuidv4 } = require("uuid");

const redisClient = require("../utils/redis");

const createNewRoom = (youtubeUrl) => {
	const roomId = uuidv4();
	const room = new Room({ roomId, currentVideo: { videoUrl: youtubeUrl }, users: [] }).save();
	return roomId;
};

router.post("/room", (req, res) => {
	const youtubeUrl = req.body.youtubeUrl;
	const roomId = createNewRoom(youtubeUrl);

	redisClient.setex(roomId, 3600, JSON.stringify({ youtubeUrl }));

	res.send({ room: roomId });
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
	const roomId = req.params.id;

	redisClient.get(roomId, async (err, cachedRoom) => {
		if (cachedRoom) {
			return res.json(JSON.parse(cachedRoom));
		}

		// If not in cache fetch from the database
		const room = await Room.findOne({ roomId });

		if (room) {
			// Cache room data for future requests
			redisClient.setex(roomId, 3600, JSON.stringify(room));

			return res.json(room);
		} else {
			return res.status(404).json({ error: "Room not found" });
		}
	});
});

module.exports = router;
