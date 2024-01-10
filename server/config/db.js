import Mongoose from "mongoose";

const connectToDb = async () => {
  try {
    const host = await Mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/graphQlL&D",
      {
        dbName: "GraphQl_FullStackApp",
      }
    );
    console.log(
      `MongoDb Connected Successfully ${host.connection.host}`.yellow.bold
    );
  } catch (error) {
    console.log("error", error);
  }
};

export default connectToDb;
