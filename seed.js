const db = require("./models");
const userData = require("./userData.json")

console.log(userData)

db.User.create(userData.users, (err, seededUsers) => {
  if (err) {
    console.log(err)
  }
  console.log(seededUsers.length, "Users seeded successfully")
  process.exit();
})