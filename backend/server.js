// require("dotenv").config();
// const express = require("express");
// const app = express();
// const cors = require("cors");
// const mongoose = require("mongoose");
// const RouterUser = require("./routes/User");
// //connect to database
// mongoose
//   .connect(process.env.MONGO_URL, {
//     useCreateIndex: true,
//     useFindAndModify: true,
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   })
//   .then((res) => console.log("database terhubung..."))
//   .catch((e) => console.log(e));

// //middleware
// app.use(cors());
// app.use(express.json());
// app.use("/", RouterUser);

// app.listen(process.env.PORT, () => {
//   console.log("server berjalan di PORT " + process.env.PORT);
// });

require("dotenv").config();

const express = require("express");
const app = express();

const RouteUser = require("./routes/User");
const mongoose = require("mongoose");
const cors = require("cors");
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then((res) => {
    console.log("database terhubung!");
  })
  .catch((error) => console.log("database error"));

app.use(cors());
app.use(express.json());
app.use("/", RouteUser);

app.listen(process.env.PORT, () => {
  console.log(`Server run port ${process.env.PORT}`);
});
