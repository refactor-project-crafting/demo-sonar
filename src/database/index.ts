import mongoose from "mongoose";

const connectToDatabase = async (url: string) => {
  await mongoose.connect(url);

  mongoose.set("toJSON", {
    versionKey: false,
  });
};

export default connectToDatabase;
