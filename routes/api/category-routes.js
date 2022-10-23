const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const dataList = await Category.findAll({
    include: Product,
  });
  res.json(dataList);
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const data = await Category.findByPk(req.params.id, {
      include: Product,
    });
    data ? res.json(data) : res.status(404).json("No such ID");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const affected = await Category.create(req.body);
    res.status(200).json(affected.get());
  } catch (error) {
    res.status(404).json(error);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const affected = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (affected[0]) {
      res.status(200).json(`update successfully`);
    } else {
      res.status(404).json("No such category id / invalid input");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const affected = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (affected) {
      res.status(200).json(`deleted ${affected} successfully`);
    } else {
      res.status(404).json("No such category id / invalid input");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
