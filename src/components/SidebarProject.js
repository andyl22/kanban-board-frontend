/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeProvider";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Sidebar from "./Sidebar";
import ModalCreateProject from "./ModalCreateProject";

export default function SidebarProject() {
  const { colors } = useContext(ThemeContext);
  const [projectList, setProjectList] = useState(null);
  const [showCreateProject, setShowCreateProject] = useState(false);

  const addNewProject = css`
    display: flex;
    justify-content: flex-start;
    background: none;
    border: none;
    align-items: center;
    gap: 0.3em;
    font-size: 0.7em;
    color: ${colors.iconColor};
    &:hover {
      cursor: pointer;
      color: ${colors.iconHoverColor};
    }
    p {
      color: inherit;
      &:hover {
        color: inherit;
      }
    }
  `;

  const icon = css`
    position: relative;
    transform: scale(0.6);
    top: 1px;
  `;

  const toggleModal = () => {
    setShowCreateProject(!showCreateProject);
  };

  useEffect(() => {
    const projectLinks = css`
      font-weight: 600;
      margin-bottom: 0.4em;
    `;

    fetch("/projects/getProjectList")
      .then((res) => res.json())
      .then((res) => res.projects)
      .then((res) =>
        res.map((project) => (
          <Link
            to={`/kanban-board/project/${project._id}`}
            key={project._id}
            css={projectLinks}
          >
            {project.name}
          </Link>
        ))
      )
      .then((res) => setProjectList(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {(showCreateProject) ? <ModalCreateProject toggleModal={toggleModal}/> : null}
      <Sidebar title={"Project List"}>
        {projectList}
        <button css={addNewProject} onClick={toggleModal}>
          <p>Add New Project</p>
          <AddCircleIcon css={icon} />
        </button>
      </Sidebar>
    </>
  );
}
