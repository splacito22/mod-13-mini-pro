const router = require("express").Router();
const { Traveller, Location, Trip } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const travellerData = await Traveller.findAll();
    res.status(200).json(travellerData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const travellerData = await Traveller.findByPk(req.params.id, {
      include: [{ model: Location, through: Trip, as: "planned_trips" }],
    });

    if (!travellerData) {
      res.status(404).json({ message: "No traveller found with this id!" });
      return;
    }
    res.status(200).json(travellerData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const travellerData = await Traveller.create(req.body);
    req.status(200).json(travellerData);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const travellerData = await Traveller.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!travellerData) {
      res.status(404).json({ message: "No traveller found with this id!" });
      return;
    }
    res.status(200).json(travellerData);
  } catch (error) {
    res.status(500).json(travellerData);
  }
});

module.exports = router;
