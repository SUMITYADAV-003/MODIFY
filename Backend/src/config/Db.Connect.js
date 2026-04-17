const mongoose  = require("mongoose");

function ConnectToDb() {
  mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database Connected Successfully !")
  })
  .catch((err) => {
    console.log("Error Connected To Db!", err);
  })
}





module.exports = ConnectToDb;