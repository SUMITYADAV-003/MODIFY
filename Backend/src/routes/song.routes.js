const {Router} = require("express");
const upload =  require("../middleware/song.middleware");
const songController = require("../controller/song.controller");


const routes =  Router();



routes.post("/",upload.single("song"),songController.uploadSong);
routes.get("/",songController.getSong);


module.exports = routes;