const express = require('express');
const router = express.Router();
const verify =  require('../routes/verifytoken')

router.get('/', verify,(req, res) => {
    res.json({ message: "Protected Route" })
})

module.exports = router
