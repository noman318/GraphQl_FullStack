import React from "react";
import Projects from "../components/Projects";
import AddClientModal from "../components/AddClientModal";
import Clients from "../components/Clients";
import AddProjectModal from "../components/AddProjectModal";

const HomeScreen = () => {
  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <AddClientModal />
        <AddProjectModal />
      </div>
      <Projects />
      <hr />
      <Clients />
    </>
  );
};

export default HomeScreen;
