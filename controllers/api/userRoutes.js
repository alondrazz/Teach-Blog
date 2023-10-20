const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

// User registration route
router.post('/register', async (req, res) => {
  try {
    const { password_hash, user_name } = req.body;
    const userData = await User.create({
      password_hash,
      user_name,
    });
    const user = userData.get({ plain: true });

    req.session.save(() => {
      req.session.user_id = userData.dataValues.user_id;
      req.session.user_name = userData.user_name;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Failed to create a new user.' });
  }
});

// User login route
router.post('/login', async (req, res) => {
  try {
    const { user_name, password } = req.body;
    const userData = await User.findOne({ where: { user_name } });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect username or password, try again.' });
      return;
    }

    const validPassword = await bcrypt.compare(password, userData.password_hash);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect username or password, try again.' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.dataValues.user_id;
      req.session.user_name = userData.user_name;
      req.session.logged_in = true;
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// User logout route
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
