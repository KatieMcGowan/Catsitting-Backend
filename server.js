//DEPENDENCIES
const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const port = 5000;
const app = express();

//MIDDLEWARE
app.use(cors());
app.use(express.json());

app.use("/users", routes.users);
app.use("/cats", routes.cats);
app.use("/requests", routes.requests);
app.use("/messages", routes.messages);

//LISTENER
app.listen(port, () => console.log(`Listening on ${port}`))