const router = require('express').Router();
const { userInfo } = require('os');
const { Category, Product } = require('../../models');
const { update } = require('../../models/Category');
// The `/api/categories` endpoint
router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Comment.findAll({
    include: 
      {
        model: Product,
        attributes: ['id', 'product_name', 'price','stock','category_id']
      },
  })
    .then(dbCategoryData =>{
    if(!dbCategoryData){
      res.status(404).json({message: "Category unavailable for the time being please contact customer support"});
      return;
    }
    res.json(dbCategoryData);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      { //Here we can describe the model's product
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      },
    ]
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'Found zero category. UH OH!' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
    .then(dbCategoryData => req.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'Unable to locate this category ID. Please contact our customer support team. They will gladly help!' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'Unable to locate this category ID. Please contact our customer support team. They will gladly help!' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;