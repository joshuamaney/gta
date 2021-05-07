const router = require('express').Router();
const { Geocache } = require('../../models');
const withAuth = require('../../utils/auth');

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

module.exports = router;
