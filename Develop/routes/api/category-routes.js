const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [{
        model: Product,
      }],
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving categories', error: err });
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id)

    if (!category) {
      res.status(404).json({ message: 'no catagory found with this ID!'});
      return;
    }

    res.json(category);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving category!', error: err });
  }
  
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    if (!newCategory) {
      res.status(400).json({ message: 'error creating new catagory!'});
      return;
    }

    res.json(newCategory);
  } catch (err) {
    res.status(500).json({ message: 'error creating new catagory!', error: err });
  }
  
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
