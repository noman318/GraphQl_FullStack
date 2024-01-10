import {
  GraphQLEnumType,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import Client from "../models/Client.model.js";
import Project from "../models/Project.model.js";
import jwt from "jsonwebtoken";

const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

const LoginType = new GraphQLObjectType({
  name: "Login",
  fields: () => ({
    token: { type: GraphQLString },
  }),
});

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve() {
        return Project.find({});
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        const { id } = args;
        return Project.findById(id);
      },
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve() {
        return Client.find({});
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        const { id } = args;
        return Client.findById(id);
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });
        return client.save();
      },
    },
    registerClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const { name, email, phone, password } = args;
        const user = await Client.findOne({ email });
        if (user) {
          throw new Error("Client with this email already exist");
        }
        const client = new Client({
          name,
          email,
          phone,
          password,
        });
        return client.save();
      },
    },
    loginClient: {
      type: LoginType,
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const { email, password } = args;
        try {
          const userData = await Client.findOne({ email }).select("-__v");
          if (userData && userData.matchPassword(password)) {
            const jwtToken = jwt.sign(
              { userId: userData._id },
              process.env.JWT_SECRET || "Noman123"
            );
            return { token: jwtToken };
          } else {
            throw new Error("Invalid E-mail or password");
          }
        } catch (error) {
          console.log("error", error);
          throw new Error("Internal Server Error");
        }
      },
    },
    deleteClient: {
      type: ClientType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      async resolve(parent, args) {
        try {
          const projects = await Project.find({ clientId: args.id });
          // console.log("projects", projects);
          await Promise.all(
            projects.map(async (project) => {
              await project.deleteOne();
            })
          );

          const deletedClient = await Client.findByIdAndDelete(args.id);
          // console.log("deletedClient", deletedClient);

          return deletedClient;
        } catch (error) {
          console.error(
            "Error deleting client and associated projects:",
            error
          );
          throw error; // Rethrow the error to be caught by GraphQL
        }
      },
    },

    // Add Project
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
          defaultValue: "Not Started",
        },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        // console.log("args", args );
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        });
        return project.save();
      },
    },
    deleteProject: {
      type: ProjectType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        // console.log("args", args);
        const { id } = args;
        return Project.findByIdAndDelete(id);
      },
    },

    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatusUpdate",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
        },
      },
      resolve(parent, args) {
        const { id, name, status, description } = args;
        // console.log(
        //   "id,name,status,description",
        //   id,
        //   name,
        //   status,
        //   description
        // );
        return Project.findByIdAndUpdate(
          id,
          {
            $set: {
              name,
              description,
              status,
            },
          },
          { new: true }
        );
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation,
});
