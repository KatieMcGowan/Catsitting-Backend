//DEPENDENCIES
require('dotenv').config()
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || process.env.URL;
const routes = require("./routes");

//MIDDLEWARE
app.use(express.json());
app.use(cors());

app.use(cors({
  credentials: true,
  origin: process.env.HITAIL_CORS_DOMAIN,
}))

//CORS
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "https://hitail.onrender.com/");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
//     );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//   );
//   next();
// });

app.get("/", (req, res) => {
  res.send("<h1>HiTail API</h1>")
})

app.use("/users", routes.users);
app.use("/cats", routes.cats);
app.use("/requests", routes.requests);
app.use("/messages", routes.messages);

//LISTENER
app.listen(PORT, () => console.log(`Listening on ${PORT}`))
