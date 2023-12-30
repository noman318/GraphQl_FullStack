import Mongoose from "mongoose";

const projectSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed"],
  },
  clientId: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
});

const Project = Mongoose.model("Project", projectSchema);
export default Project;
