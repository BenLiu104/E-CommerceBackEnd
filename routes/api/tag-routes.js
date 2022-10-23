const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const dataList = await Tag.findAll({
    include: [{ model: Product, through: ProductTag }],
  });
  res.json(dataList);
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const data = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });
    data ? res.json(data) : res.status(404).json("No such ID");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const result = await Tag.create(req.body);
    res.status(200).json(result.get());
  } catch (error) {
    res.status(404).json(error);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const affected = await Tag.update(req.body, {
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
  // delete on tag by its `id` value
  try {
    const affected = await Tag.destroy({
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
