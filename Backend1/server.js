require("dotenv").config();
const app = require("./src/app.js");
const DatabaseDb = require("./src/config/DatabaseDb.js");












DatabaseDb();

app.listen(process.env.PORT,() => {
  console.log(`Server is running on ${process.env.PORT}`);
})