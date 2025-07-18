const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/Delta";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({}); //before initalizing database cleaning all data by deleteing it
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "680151e7665cc03cb1e36e08",
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initalized");
};

initDB();
