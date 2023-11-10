const router = require("express").Router();
const { Traveller, Location, Trip } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const locationData = await Location.findAll();
    res.status(200).json(locationData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const locationData = await Location.findByPk(req.params.id, {
      include: [{ model: Traveller, through: Trip, as: "location_travellers" }],
    });

    if (!locationData) {
      res.status(404).json({ message: "No location found with this id!" });
      return;
    }
    res.status(200).json(locationData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const locationData = await Location.create(req.body);
    req.status(200).json(locationData);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const locationData = await Location.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!locationData) {
      res.status(404).json({ message: "No location found with this id!" });
      return;
    }
    res.status(200).json(locationData);
  } catch (error) {
    res.status(500).json(locationData);
  }
});

module.exports = router;
