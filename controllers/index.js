const express = require('express');
const router = express.Router();
const userRoutes = require("./userController");

router.get('/', (req, res) => {
    res.send('Welcome to my page');
})

router.use(userRoutes);

module.exports = router;