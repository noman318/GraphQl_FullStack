import { gql } from "@apollo/client";

const ADD_CLIENTS = gql`
  mutation addClient($name: String!, $email: String!, $phone: String!) {
    addClient(name: $name, email: $email, phone: $phone) {
      id
      name
      email
      phone
    }
  }
`;

const REGISTER_USER = gql`
  mutation registerClient(
    $name: String
    $email: String
    $phone: String
    $password: String
  ) {
    registerClient(
      name: $name
      email: $email
      phone: $phone
      password: $password
    ) {
      id
      name
      email
      phone
    }
  }
`;

const LOGIN_USER = gql`
  mutation loginClient($email: String, $password: String) {
    loginClient(email: $email, password: $password) {
      token
    }
  }
`;

const DELETE_CLIENTS = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id) {
      id
      name
      email
      phone
    }
  }
`;

export { DELETE_CLIENTS, ADD_CLIENTS, REGISTER_USER, LOGIN_USER };
