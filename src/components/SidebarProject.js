/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import AddProjectController from "./AddProjectController";
import Sidebar from "./Sidebar";
import { ProjectContext } from "../context/ProjectProvider";
import { getHTTP } from "../utilities/fetchAPIs";

export default function SidebarProject() {
  const [mappedProjectList, setMappedProjectList] = useState(null);
  const [error, setError] = useState(null);
  const { projectList, setProjectList } = useContext(ProjectContext);
  const { id } = useParams();

  useEffect(() => {
    getHTTP("/projects/getProjectList")
      .then((res) => res.projects)
      .then((res) => setProjectList(res))
      .catch((err) => setError("Could not retrieve projects."));
  }, [setProjectList]);

  useEffect(() => {
    if (projectList) {
      const projectLinks = css`
        font-weight: 700;
        padding: 0.8em 0.5em;
        width: 100%;
        &:first-of-type {
        }
        &:last-of-type {
          margin-bottom: 1em;
        }
        &:hover {
          transform: translateX(2px);
          transition: 0.15s ease;
        }
      `;

      const mapProjectList = (projectList) => {
        const sortProjectList = (projectList) => {
          return [...projectList].sort((a, b) => {
            const nameA = a.name.trim().toLowerCase();
            const nameB = b.name.trim().toLowerCase();

            if (nameA < nameB) {
              return -1;
            } else if (nameB < nameA) {
              return 1;
            }
            return 0;
          });
        };

        return sortProjectList(projectList).map((project) => (
          <Link
            to={`/kanban-board/project/${project._id}`}
            id={project._id}
            key={project._id}
            css={projectLinks}
          >
            {project.name}
          </Link>
        ));
      };

      setMappedProjectList(mapProjectList(projectList));
    }
  }, [projectList, id]);

  return (
    <Sidebar title={"Project List"}>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          {mappedProjectList}
          <AddProjectController />
        </>
      )}
    </Sidebar>
  );
}
