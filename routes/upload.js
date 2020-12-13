const express = require('express');
const app = express();
const router = express.Router();
const fileUpload = require('express-fileupload')

app.use(fileUpload())

router.post('/upload', function (req, res, next) {
    console.log(req.files)
    res.send(req.files)
})


module.exports = router