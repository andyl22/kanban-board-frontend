/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddProjectButton from "./AddProjectButton";
import Sidebar from "./Sidebar";
import { getHTTP } from "../utilities/fetchAPIs";

export default function SidebarProject() {
  const [projectList, setProjectList] = useState(null);
  const [mappedProjectList, setMappedProjectList] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getHTTP("/projects/getProjectList")
      .then((res) => res.projects)
      .then((res) => setProjectList(res))
      .catch((err) => setError("Could not retrieve projects."));
  }, []);

  useEffect(() => {
    if (projectList) {
      const projectLinks = css`
        font-weight: 600;
        margin-bottom: 0.4em;
      `;

      setMappedProjectList(
        projectList.map((project) => (
          <Link
            to={`/kanban-board/project/${project._id}`}
            key={project._id}
            css={projectLinks}
          >
            {project.name}
          </Link>
        ))
      );
    }
  }, [projectList]);

  return (
    <Sidebar title={"Project List"}>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          {mappedProjectList}
          <AddProjectButton
            projectList={projectList}
            setProjectList={setProjectList}
          />
        </>
      )}
    </Sidebar>
  );
}
