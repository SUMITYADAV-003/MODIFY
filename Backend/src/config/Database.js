const mongoose = require("mongoose");

function ConnectToDb(){
  mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Db Connected Successfully :-")
  })
  .catch((err) => {
    console.log(err);
  })
}



module.exports = ConnectToDb;