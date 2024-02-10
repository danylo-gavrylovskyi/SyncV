const User = require('../models').User;
const { createUser } = require('../handlers/users');

async function getAllUsersController(req, res) {
    try {
        const users = await User.find();
        res.render('users', { qty: users.length, users });
    } catch (error) {
        console.error('Error while fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getNewUserController(req, res) {
    try {
        res.render('new-user')
    } catch (error) {
        console.error('Error while creating new user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getUserByIdController(req, res) {
    const userId = req.params.id;
    try {
        const user = await User.findById(req.params.id);
        res.render('user', { user: user});
    } catch (error) {
        console.error('Error while fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function postUserController(req, res) {
    const fullname = req.body.fullname;
    const email = req.body.email;
    const password = req.body.password;

    try {
        await createUser(fullname, email, password);
        res.render('user-created', { success: true });
    } catch (error) {
        console.error('Error while creating new user:', error);
        res.render('user-created', { success: false });
    }
}

module.exports = {
    getAllUsersController,
    getNewUserController,
    getUserByIdController,
    postUserController
};