import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_PROJECT } from "../queries/projectQuery";
import Spinner from "../components/Spinner";
import ClientInfo from "../components/ClientInfo";
import DeleteProjectButton from "../components/DeleteProjectButton";
import EditProjectForm from "../components/EditProjectForm";

const Projects = () => {
  const { id } = useParams();
  // console.log("params", id);
  const { data, loading, error } = useQuery(GET_SINGLE_PROJECT, {
    variables: { id },
  });
  // console.log("data", data);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;
  return (
    <>
      {!loading && !error && (
        <div className="mx-auto card p-5 w-75">
          <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
            Back
          </Link>
          <h1>{data?.project?.name}</h1>
          <p>{data?.project?.description}</p>
          <h5 className="mt-3">Project Status</h5>
          <p className="lead">{data?.project?.status}</p>
          <ClientInfo client={data?.project?.client} />
          <EditProjectForm project={data?.project} />
          <DeleteProjectButton projectId={data?.project?.id} />
        </div>
      )}
    </>
  );
};

export default Projects;
