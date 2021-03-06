const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

// Main Route
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// Logout Route
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Username Update Route
router.put('/update/username', async (req, res) => {
  console.log(req.session.user_id)
  try {
    const user = await User.update(
    {
      username: req.body.username,
    },
    {
      where: {
        id: req.session.user_id,
      },
    });

    res.status(200).json(user);
  } catch (err) {
    console.log(req.session.user_id)
      res.status(500).json(err);
    };
});

// Email Update Route
router.put('/update/email', async (req, res) => {
  console.log(req.session.user_id)
  try {
    const user = await User.update(
    {
      email: req.body.email,
    },
    {
      where: {
        id: req.session.user_id,
      },
    });

    res.status(200).json(user);
  } catch (err) {
    console.log(req.session.user_id)
      res.status(500).json(err);
    };
});


router.delete("/delete", withAuth, async (req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.session.user_id,
      }
    });

    if (!userData) {
      res.status(404).json({message:"No user found by given id."});
      return;
    }

    res.status(200).json(userData);
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
