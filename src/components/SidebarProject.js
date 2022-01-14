/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddProjectController from "./AddProjectController";
import Sidebar from "./Sidebar";
import { getHTTP } from "../utilities/fetchAPIs";

export default function SidebarProject() {
  const [projectList, setProjectList] = useState(null);
  const [mappedProjectList, setMappedProjectList] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const addProject = (project) => {
    setProjectList([...projectList, project]);
    navigate(`/kanban-board/project/${project._id}`);
  };

  useEffect(() => {
    getHTTP("/projects/getProjectList")
      .then((res) => res.projects)
      .then((res) => setProjectList(res))
      .catch((err) => setError("Could not retrieve projects."));
  }, []);

  useEffect(() => {
    if (projectList) {
      const projectLinks = css`
        font-weight: 700;
        padding: .8em;
        width: 100%;
        border-left: 1px solid gray;
        border-right: 1px solid gray;
        border-top: 1px solid gray;
        &:first-of-type {
          border-top-right-radius: 1em;
          border-top-left-radius: 1em;
        }
        &:last-of-type {
          border-bottom: 1px solid gray;
          border-bottom-right-radius: 1em;
          border-bottom-left-radius: 1em;
          margin-bottom: 1em;
        }
        &:hover {
          transform: translateX(10px);
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
          <AddProjectController addProject={addProject} />
        </>
      )}
    </Sidebar>
  );
}
