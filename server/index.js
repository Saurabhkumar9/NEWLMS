require("dotenv").config();
const connection = require("./src/db/db");
const { app } = require("./App.js");

connection()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running at port : ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });

  