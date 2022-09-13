//DEPENDENCIES
const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const PORT = process.env.PORT || "https://serene-anchorage-09864.herokuapp.com";
const app = express();

//MIDDLEWARE
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>HiTail API</h1>")
})

app.use("/users", routes.users);
app.use("/cats", routes.cats);
app.use("/requests", routes.requests);
app.use("/messages", routes.messages);

//LISTENER
app.listen(PORT, () => console.log(`Listening on ${PORT}`))