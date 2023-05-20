const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');


router.get('/', async(req, res) => {
  try {
    const data = await Comment.findAll({
      include: [{ model: User }, {model: Blog }],
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async(req, res) => {
    try {
      const data = await Comment.findByPk(req.params.id, {
        include: [{ model: User }, {model: Blog }],
      });
  
      if (!data) {
        res.status(404).json({ message: 'No comment found with that id!' });
        return;
      }
  
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.post('/', async(req, res) => {
  try {
    const data = await Comment.create(req.body);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async(req, res) => {
  try {
    const data = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!data[0]) {
      res.status(404).json({ message: 'No comment with this id!' });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async(req, res) => {
  try {
    const data = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!data) {
      res.status(404).json({ message: 'No comment with this id!' });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
