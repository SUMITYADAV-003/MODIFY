const {Router} = require("express");
const upload =  require("../middleware/song.middleware");


const routes =  Router();



routes.post("/",upload.single("song"),)


module.exports = routes;