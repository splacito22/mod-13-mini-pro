const router = require("express").Router();
const travellerRoutes = require("./travellerRoutes");
const locationRoutes = require("./locationRoutes");

router.use("/travellers", travellerRoutes);
router.use("/locations", locationRoutes);

module.exports = router;
