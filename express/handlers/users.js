const User = require('../models/User').User;

async function createUser(res, fullname, email, password, isAdmin = false, birthDate) {
  if (await User.findOne({ email }))
    return res.status(400).json({ error: 'User with such email already exists' });

  if (!fullname) return res.status(400).json({ error: 'Fullname is required' });
  if (!email) return res.status(400).json({ error: 'Email is required' });
  if (!password) return res.status(400).json({ error: 'Password is required' });

  const user = new User({ fullname, email, password, isAdmin, birthDate });
  user.save();
  return res.json(user);
}

module.exports = {
  createUser,
};
