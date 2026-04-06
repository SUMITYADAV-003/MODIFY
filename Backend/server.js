require("dotenv").config();
const app = require("./src/app.js");
const ConnectToDb = require("./src/config/Database.js");








ConnectToDb();

app.listen(process.env.PORT, () => {
  console.log(`Server is Running :- ${process.env.PORT}`);
})