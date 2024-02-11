const User = require('../models').User;
const { createUser, putUser, patchUser } = require('../handlers/users');

async function getAllUsersController(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error while fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getNewUserController(req, res) {
  try {
    res.render('new-user');
  } catch (error) {
    console.error('Error while creating new user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getUserByIdController(req, res) {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    res.json(user);
  } catch (error) {
    console.error('Error while fetching user by id:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function postUserController(req, res) {
  const fullname = req.body.fullname;
  const email = req.body.email;
  const password = req.body.password;
  const isAdmin = req.body.isAdmin;
  const birthDate = req.body.birthDate;

  try {
    await createUser(res, fullname, email, password, isAdmin, birthDate);
  } catch (error) {
    console.error('Error while creating new user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function putUserController(req, res) {
  const _id = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(_id, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    console.error('Error while updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function patchUserController(req, res) {
  const _id = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(_id, { $set: req.body }, { new: true });
    res.json(updatedUser);
  } catch (error) {
    console.error('Error while patching user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function deleteUserController(req, res) {
  const _id = req.params.id;
  try {
    const user = await User.deleteOne({ _id });
    res.json(user);
  } catch (error) {
    console.error('Error while deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getAllUsersController,
  getNewUserController,
  getUserByIdController,
  postUserController,
  putUserController,
  patchUserController,
  deleteUserController,
};
