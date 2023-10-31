
const createsong = require("../controller/song.js")
const  getAllSongs  = require('../controller/songsController.js');
const express = require("express")
const router = express.Router();
router.post("/",createsong);
router.get('/', getAllSongs);
module.exports = router;