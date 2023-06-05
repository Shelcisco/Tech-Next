const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');


router.get('/', async(req, res) => {
  try {
    const data = await Blog.findAll({
      include: {all:true,nested:true},
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async(req, res) => {
    try {
      const data = await Blog.findByPk(req.params.id, {
        include: [{ model: User }, {model: Comment }],
      });
  
      if (!data) {
        res.status(404).json({ message: 'No Blog found with that id!' });
        return;
      }
  
      res.status(200).json(data);
    } catch (err) {
      res.status(400).json(err);
    }
});

router.post('/', async(req, res) => {
  try {
    const data = await Blog.create(req.body);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async(req, res) => {
  try {
    const data = await Blog.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!data[0]) {
      res.status(404).json({ message: 'No blog with this id!' });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async(req, res) => {
  try {
    const data = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!data) {
      res.status(404).json({ message: 'No blog with this id!' });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
