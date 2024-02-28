const whitelist = ["http://localhost:3000", "http://localhost:3400", "http://localhost:8000"];

const originFunction = (origin, callback) => {
	if (whitelist.includes(origin) || !origin) {
		callback(null, true);
	} else {
		callback(new Error("Not allowed by CORS"));
	}
};

module.exports = { originFunction };
