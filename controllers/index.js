const express = require('express');
const router = express.Router();
const userRoutes = require("./userController");
const tankRoutes = require("./tankController")
const fishRoutes = require("./fishController")

router.get('/', (req, res) => {
    res.send('Welcome to my page');
})

router.use(userRoutes);
router.use("/api/tanks",tankRoutes);
router.use("/api/fishes",fishRoutes);

module.exports = router;