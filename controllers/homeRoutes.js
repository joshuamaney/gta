const router = require('express').Router();
const { Geocache, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all geocaches and join with user data
    const geocacheData = await Geocache.findAll({
      include: [
        {
          model: User,
          attributes: { include: ["username"], exclude: ["password"] }
        }
      ]
    });

    let geocaches = geocacheData.map((geocache) => geocache.get({plain:true}));
    let stringGeocaches = JSON.stringify(geocaches);
    res.render('map', {
      geocaches,
      stringGeocaches,
      logged_in: req.session.logged_in,
      onMapPage: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/geocache/:id', withAuth, async (req, res) => {
  try {
    const geocacheData = await Geocache.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: {exclude: ["password"]}
        }
      ],
    });

    let geocaches = geocacheData.map((geocache) => geocache.get({plain:true}));
    
    res.render('map', {
      geocaches,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/user', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Geocache
        }
      ],
    });

    const user = userData.get({ plain: true });


    res.render('map', {
      ...user,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Geocache
        }
      ],
    });

    const user = userData.get({ plain: true });


    res.render('profile', {
      ...user,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get("/signup", (req, res) => {
  res.render("signup");
});


module.exports = router;
