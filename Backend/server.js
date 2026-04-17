require("dotenv").config();
const app = require("./src/app.js");
const ConnectToDb = require("./src/config/Db.Connect.js");



















ConnectToDb();

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
})