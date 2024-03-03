const Room = require("../models/Room").Room;

const redisClient = require("../utils/redis");

const getRoomData = async (roomId) => {
	return new Promise((resolve, reject) => {
		redisClient.get(roomId, async (err, cachedRoom) => {
			if (cachedRoom) {
				resolve(JSON.parse(cachedRoom));
			} else {
				const room = await Room.findOne({ roomId });
				if (room) {
					// Cache room data for future requests
					redisClient.setex(roomId, 3600, JSON.stringify(room));
					resolve(room);
				} else {
					reject(new Error("Room not found"));
				}
			}
		});
	});
};

module.exports = { getRoomData };
