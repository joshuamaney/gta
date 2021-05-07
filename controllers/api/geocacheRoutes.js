const router = require('express').Router();
const { Geocache } = require('../../models');
const withAuth = require('../../utils/auth');

// Create new geocache
router.post('/', withAuth, async (req, res) => {
  try {
    const newGeocache = await Geocache.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newGeocache);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete geocache
router.delete('/delete/:id', withAuth, async (req, res) => {
  try {
    const geocacheData = await Geocache.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!geocacheData) {
      res.status(404).json({ message: 'No geocache found with this id!' });
      return;
    }

    res.status(200).json(geocacheData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// update title Route
router.put('/update/:id', async (req, res) => {
  try {
      const geocache = await Geocache.update(
          {
              title: req.body.title,
              description: req.body.description,
              hint: req.body.hint
          },
          {
              where: {
                  id: req.params.id,
              },
          });
      res.status(200).json(geocache, {message: "Success!"});
  } catch (err) {
      console.log(req.body.id)
      res.status(500).json(err);
  };
});





router.post('/create', withAuth, async (req, res) => {
  // Some sort of validation on the req.body;
  const { title, description, latitude, longitude } = req.body;
  req.body.user_id = req.session.user_id;
  console.log(req.body);
  if (!title) {
      res.status(500).json({ message: 'Please submit a title!' })
  } else if (!description) {
      res.status(500).json({ message: "Please submit a description!"})
  } else {
      // Write to the database using ORM
      const locationData = await Geocache.create(req.body);

      // res.render (re-render the page with the newly created point)
      const geocacheData = await Geocache.findAll({
          include: [
              {
                  model: User,
                  attributes: { include: ["username"], exclude: ["password"] }
              }
          ]
      });

      let geocaches = geocacheData.map((geocache) => geocache.get({ plain: true }));
      let stringGeocaches = JSON.stringify(geocaches);
      res.render('map', {
          geocaches,
          stringGeocaches,
          logged_in: req.session.logged_in
      });
  }
})

router.put('/title/:id', withAuth, async (req, res) => {
  // Some sort of validation on the req.body;
  const { title, description, latitude, longitude } = req.body;
  const locationId = req.params.id;

  if (!title) {
      res.status(500).json({ message: 'Please submit a title' })
  } else {
      // Write to the database using ORM (use an update call)


      // res.render (re-render the page with the newly created point)
      const geocacheData = await Geocache.findAll({
          include: [
              {
                  model: User,
                  attributes: { include: ["username"], exclude: ["password"] }
              }
          ]
      });

      let geocaches = geocacheData.map((geocache) => geocache.get({ plain: true }));
      let stringGeocaches = JSON.stringify(geocaches);
      res.render('map', {
          geocaches,
          stringGeocaches,
          logged_in: req.session.logged_in
      });
  }
});


module.exports = router;
