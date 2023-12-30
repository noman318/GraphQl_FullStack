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

export { GET_PROJECTS };
