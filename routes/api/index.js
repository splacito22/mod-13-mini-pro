const router = require("express").Router();
const travellerRoutes = require("./travellerRoutes");

router.use("/travellers", travellerRoutes);

module.exports = router;
