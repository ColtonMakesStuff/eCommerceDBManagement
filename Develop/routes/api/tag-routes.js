const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [{
        model: Product,
      }],
    });
    res.json(tags);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving tags', error: err });
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{
        model: Product,
      }],
    });

    if (!tag) {
      res.status(404).json({ message: 'no tag found with this ID!'});
      return;
    }

    res.json(tag);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving tag!', error: err });
  }
  
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    if (!newtag) {
      res.status(400).json({ message: 'error creating new tag!'});
      return;
    }

    res.json(newTag);
  } catch (err) {
    res.status(500).json({ message: 'error creating new tag!', error: err });
  }
  
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const tagId = req.params.id;
  const { tag_name } = req.body;

  try {
    const updatedTag = await Tag.update(
      { tag_name },
      { where: { id: tagId } }
    );

    // Check if any rows were affected by the update
    if (updatedTag[0] === 0) {
      return res.status(404).json({ error: 'tag not found' });
    }

    res.status(200).json({ message: 'tag updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const tagId = req.params.id;

  try {
    const deletedTag = await Tag.destroy({where: { id: tagId}
    });
        // Check if any rows were affected by the update
        if (deletedTag[0] === 0) {
          return res.status(404).json({ error: 'tag not found' });
        }
    res.status(200).json({ message: 'tag deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
