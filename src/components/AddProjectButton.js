/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import React, { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FormCreateProject from "./FormCreateProject";

export default function AddProjectButton(props) {
  const { projectList, setProjectList } = props;
  const { colors } = useContext(ThemeContext);
  const [showCreateProject, setShowCreateProject] = useState(false);

  const addNewProject = css`
    display: flex;
    justify-content: flex-start;
    background: none;
    border: none;
    align-items: center;
    gap: 0.3em;
    font-size: 0.7em;
    font-weight: 500;
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

  return showCreateProject ? (
    <FormCreateProject
      toggleForm={setShowCreateProject}
      projectList={projectList}
      setProjectList={setProjectList}
      toggleModal={toggleModal}
    />
  ) : (
    <button css={addNewProject} onClick={toggleModal}>
      <p>Add New Project</p>
      <AddCircleIcon css={icon} />
    </button>
  );
}
