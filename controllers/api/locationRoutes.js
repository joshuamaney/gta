const router = require('express').Router();
const { Geocache, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
    // Some sort of validation on the req.body;
    const { title, description, latitude, longitude } = req.body;
    req.body.user_id = req.session.user_id;
    console.log(req.body);
    if (!title) {
        res.status(500).json({ message: 'Please submit a title you wily cunt' })
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

router.put('/:id', async (req, res) => {
    // Some sort of validation on the req.body;
    const { title, description, latitude, longitude } = req.body;
    const locationId = req.params.id;

    if (!title) {
        res.status(500).json({ message: 'Please submit a title you wily cunt' })
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
})

router.delete('/:id', async (req, res) => {
    const locationId = req.params.id;
    if (!title) {
        res.status(500).json({ message: 'Please submit a title you wily cunt' })
    } else {
        // Delete from the database using the provided id


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


module.exports = router;