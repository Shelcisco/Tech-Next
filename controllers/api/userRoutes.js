const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');

router.post("/login", async (req, res) => {
  try {
    const data = await User.findOne({
      where: {
        username: req.body.username
      }

    })

    if (!data) {
      res.status(400).json({ message: "incorecct username, please try again" })
      return} 
      const validPassword = await data.checkPassword(req.body.password)
      if (!validPassword){
        res.status(400).json({ message: "incorecct password, please try again" })
        return
      }
      req.session.save(()=>{
        req.session.user_id=data.id
        req.session.logged_in=true
        res.json({user:data,message:"logged in"})
      })
  }
  catch(err) {
    res.status(400).json(err)
  }
})

router.post("/logout", async (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(()=>{
      res.status(200).end();
    })
  }
  else {
    res.status(404).end();
  }
}) 

router.get('/', async (req, res) => {
  try {
    const data = await User.findAll({
      include: [{ model: Blog }],
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = await User.findByPk(req.params.id, {
      include: [{ model: Blog }],
    });

    if (!data) {
      res.status(404).json({ message: 'No user found with that id!' });
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  
  try {
    const data = await User.create(req.body);
    req.session.save(()=>{
      req.session.user_id=data.id
      req.session.logged_in=true
      res.json({user:data,message:"logged in"})
    })
    // res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }

});

router.put('/:id', async (req, res) => {
  try {
    const data = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!data[0]) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const data = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!data) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
