import mongoose, { connect } from "mongoose";

mongoose.set("strictQuery", false);
const connectToDB = async () => {
  try {
    const DB_URL = process.env.DB_URL;
    connect(DB_URL)
      .then(console.log(`DB connected successfully`))
      .catch((err) => {
        console.log(`DB connection failed!`);
        console.log(err);
        process.exit(1);
      });
  } catch (err) {
    console.log(err);
  }
};

export default connectToDB;
