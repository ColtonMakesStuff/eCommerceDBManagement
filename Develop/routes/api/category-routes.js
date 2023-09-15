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
    const category = await Category.findByPk(req.params.id, {
      include: [{
        model: Product,
      }],
    });

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
  const categoryId = req.params.id;
  const { category_name } = req.body;

  try {
    const updatedCategory = await Category.update(
      { category_name },
      { where: { id: categoryId } }
    );

    // Check if any rows were affected by the update
    if (updatedCategory[0] === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.status(200).json({ message: 'Category updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.delete('/:id', async (req, res) => {
  const categoryId = req.params.id;

  try {
    const deletedCategory = await Category.destroy({
      where: { id: categoryId },
    });

    // Check if any rows were affected by the deletion
    if (deletedCategory === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
