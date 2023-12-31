import { gql } from "@apollo/client";

const GET_PROJECTS = gql`
  query getProjects {
    projects {
      id
      description
      status
      name
    }
  }
`;

const GET_SINGLE_PROJECT = gql`
  query getProject($id: ID!) {
    project(id: $id) {
      id
      description
      status
      name
      client {
        id
        name
        email
        phone
      }
    }
  }
`;

export { GET_PROJECTS, GET_SINGLE_PROJECT };
