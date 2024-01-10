import Mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
  password: {
    type: String,
  },
});

clientSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

clientSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  // console.log("salt", salt);
  this.password = await bcrypt.hash(this.password, salt);
});

const Client = Mongoose.model("Client", clientSchema);
export default Client;
