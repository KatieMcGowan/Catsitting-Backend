//DEPENDENCIES
const express = require("express");
// const routes = require("./routes");
const cors = require("cors");
const port = 4000;
const app = express();

//MIDDLEWARE
app.use(cors());
app.use(express.json());

//LISTENER
app.listen(port, () => console.log(`Listening on ${port}`))