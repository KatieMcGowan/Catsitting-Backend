//DEPENDENCIES
require('dotenv').config()
const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || process.env.URL;
const routes = require("./routes");

//MIDDLEWARE
app.use(express.json());
// app.use(cors());

app.use(cors({
  credentials: true,
  origin: process.env.HITAIL_CORS_DOMAIN,
}))

app.get("/", (req, res) => {
  res.send("<h1>HiTail API</h1>")
})

app.use("/users", routes.users);
app.use("/cats", routes.cats);
app.use("/requests", routes.requests);
app.use("/messages", routes.messages);

//LISTENER
app.listen(PORT, () => console.log(`Listening on ${PORT}`))

console.log('test')