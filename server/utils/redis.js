const redis = require("redis");

const redisClient = redis.createClient();
redisClient.on("error", (e) => console.log("Error redisClient", e));
redisClient.on("connection", (con) => console.log("redisClient connected", con));

(async () => await redisClient.connect())();

module.exports = { redisClient };
