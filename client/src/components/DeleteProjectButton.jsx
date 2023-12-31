import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQuery";
import { DELETE_PROJECT } from "../mutations/projectMutation";

const DeleteProjectButton = ({ projectId }) => {
  //   console.log("projectId", projectId);
  const navigate = useNavigate();
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => navigate("/"),
    refetchQueries: [{ query: GET_PROJECTS }],
  });
  return (
    <>
      <div className="d-flex mt-5 ms-auto" onClick={deleteProject}>
        <button className="btn btn-danger m-2">
          <FaTrash className="icon" />
          Delete Project
        </button>
      </div>
    </>
  );
};

export default DeleteProjectButton;
