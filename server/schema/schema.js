import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import Client from "../models/Client.model.js";
import Project from "../models/Project.model.js";

const ClienType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
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
      type: ClienType,
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
      type: new GraphQLList(ClienType),
      resolve() {
        return Client.find({});
      },
    },
    client: {
      type: ClienType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        const { id } = args;
        return Client.findById(id);
      },
    },
  },
});
export default new GraphQLSchema({
  query: RootQuery,
});
