import Mongoose from "mongoose";

const clientSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

const Client = Mongoose.model("Client", clientSchema);
export default Client;
