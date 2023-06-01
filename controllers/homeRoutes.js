const router = require('express').Router();
const { Blog, User } = require('../models');
const {withAuth, withoutAuth} = require("../utils/auth")

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

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Get all users, sorted by name
    const data = await Blog.findAll({
     where: {
      user_id: req.session.user_id
     }
    });

    

    // Serialize user data so templates can read it
    const blogs = data.map((project) => project.get({ plain: true }));

    const logged_in = req.session.logged_in
    // Pass serialized data into Handlebars.js template
    res.render('dashboard', { blogs,logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blog/:id', async (req, res) => {
  try {
    const target = req.params.id;
    //Get all users, sorted by name
    const data = await Blog.findByPk(target, {
      
     include: {all:true,nested:true}
     });

  //   const data = await fetch (`/api/blog/${req.params.id}`, {
  //     method:"GET",
  //     headers: {"Content-Type":"application/json"}
  // } ) 
const blog = data.get({plain:true})
    

    const logged_in = req.session.logged_in
    if (logged_in&&req.session.user_id==blog.user_id){
      res.render('edit-blog', {...blog,logged_in:req.session.logged_in }); 
    }
    else {
// Pass serialized data into Handlebars.js template
    res.render('view-blog', { ...blog,logged_in:req.session.logged_in });
  }

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get ('/login', withoutAuth, async (req,res) => {
try{
  const logged_in = req.session.logged_in
  res.render('login', {logged_in});
}
catch (err) {
  res.status(500).json(err);
}
})

router.get ('/create', withoutAuth, async (req,res) => {
  try{
    const logged_in = req.session.logged_in
    res.render('create-blog', {logged_in});
  }
  catch (err) {
    res.status(500).json(err);
  }
  })

module.exports = router;