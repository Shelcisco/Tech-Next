const router = require('express').Router();
const { Blog } = require('../models');

router.get('/', async (req, res) => {
  try {
    // Get all users, sorted by name
    const data = await Blog.findAll({
     
    });

    // Serialize user data so templates can read it
    const blogs = data.map((project) => project.get({ plain: true }));

    const logged_in = req.session.logged_in
    // Pass serialized data into Handlebars.js template
    res.render('homepage', { blogs,logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;