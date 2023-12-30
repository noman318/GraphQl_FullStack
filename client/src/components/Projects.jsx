import React from "react";
import Spinner from "./Spinner";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQuery";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const { data, error, loading } = useQuery(GET_PROJECTS);
  //   console.log("data", data);
  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {data?.projects?.length > 0 ? (
        <div className="row mt-5">
          {data?.projects?.map((project) => (
            <ProjectCard key={project.id} projectData={project} />
          ))}
        </div>
      ) : (
        <h3> No Projects Created so far...</h3>
      )}
    </>
  );
};

export default Projects;
