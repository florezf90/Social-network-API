const { User, Thought, Reaction } = require("../models");
const connection = require("../config/connection");

const users = [
  {
    username: "Adam26",
    email: "adam324@gmail.com",
  },
  {
    username: "Benicio",
    email: "benicio99@gmail.com",
  },
  {
    username: "Carol900",
    email: "carol900@gmail.com",
  },
  {
    username: "penenciolapenca",
    email: "penenciolapenca@gmail.com",
  },
  {
    username: "Erick",
    email: "erick9032@gmail.com",
  },
  {
    username: "Frankestein",
    email: "frankestein@gmail.com",
  },
  {
    username: "babe69",
    email: "babe69@gmail.com",
  },
  {
    username: "Hillaryklinton",
    email: "hillaryishallarious@gmail.com",
  },
  {
    username: "yourmom101",
    email: "yourmom101@gmail.com",
  },
  {
    username: "erin101",
    email: "erin101@gmail.com",
  },
  {
    username: "Kelvin",
    email: "kelvin@gmail.com",
  },
];

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected successfully");
  await User.deleteMany({});
  await User.collection.insertMany(users);
  console.table(users);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
