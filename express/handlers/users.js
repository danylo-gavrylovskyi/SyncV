const User = require('../models/User').User;

function createUser(fullname, email, password) {
    const user = new User({ fullname, email, password });
    return user.save();
}

module.exports = {
    createUser
}
