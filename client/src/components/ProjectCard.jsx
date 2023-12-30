import React from "react";
import { FaEye } from "react-icons/fa";

const ProjectCard = ({ projectData }) => {
  //   console.log("projectData", projectData);
  return (
    <div className="col-md-6">
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title">{projectData?.name}</h5>
            <a href={`/project/${projectData.id}`} className="btn btn-light">
              <FaEye style={{ marginRight: "15px" }} />
              View
            </a>
          </div>
          <p className="small">
            Status: <strong>{projectData.status}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
