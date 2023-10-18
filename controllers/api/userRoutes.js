const router = require('express').Router();
const { User } = require('../../models');
// create a new user 
router.post('/', async (req, res) => {
    try {
        const { password_hash, user_name } = req.body;
        const userData = await User.create({
            password_hash,
            email,
        });
        console.log(userData);
        const user = userData.get({plain: true})

        req.session.save(() => {
            req.session.user_id = userData.dataValues.user_id;
            req.session.user_name = userData.user_name;
            req.session.logged_in = true;
            res.status(200).json(userData);
    });
} catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Failed to create new user.'});
}
}); 
// Usere login route
router.post('/login', async (req, res) => {
    try {
        const userData = await User.fineOne({ where: { user_name: req.body.user_name }});

    console.log(userData);
        if (!userData) {
            res 
               .status(400)
               .json({ message: 'Incorrect username or password, try again.'});
               return;
        }

        const validPassword = await userData.checkPassword(req.body.password_hash);

        if (!validPassword) {
            res
            .status(400)
            .json({ message: 'Incorrect username or password, try again.'});
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.dataValues.user_id;
            req.session.user_name = userData.user_name;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!'});
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

// User logout route
router.post('/logout', (req, res) => {
    console.log(req.session.logged_in);
    if (req.session.logged_in) {
      // Remove the session variables
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  
  module.exports = router;

