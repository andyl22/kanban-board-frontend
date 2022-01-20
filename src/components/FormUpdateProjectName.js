/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import React, { useState, useRef, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Form from "./Form";
import CancelIcon from "@mui/icons-material/Cancel";
import { ThemeContext } from "../context/ThemeProvider";
import { postHTTP } from "../utilities/fetchAPIs";
import { ProjectContext } from "../context/ProjectProvider";

export default function FormUpdateProjectName(props) {
  const { toggleForm, initialValue, updateHeader } = props;
  const [formState, setFormState] = useState({ projectName: initialValue });
  const inputRef = useRef();
  const { projectList, setProjectList } = useContext(ProjectContext);
  const { colors } = useContext(ThemeContext);
  const { id } = useParams();

  const container = css`
    display: flex;
    align-items: center;
    width: 90%;
  `;
  const input = css`
    width: 90%;
  `;

  const closeButton = css`
    color: ${colors.iconColor};
    &:hover {
      color: ${colors.iconHoverColor};
      cursor: pointer;
    }
  `;

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formState.projectID = id;
    postHTTP("/projects/updateProjectName", formState)
      .then((res) => {
        const copyOfProjectList = JSON.parse(JSON.stringify(projectList))
        const projectToUpdate = copyOfProjectList.filter(project => project._id === id)[0];
        const indexOfProjectToUpdate = copyOfProjectList.indexOf(projectToUpdate);
        copyOfProjectList[indexOfProjectToUpdate] = {...projectToUpdate, name: formState.projectName}
        setProjectList(copyOfProjectList);
        updateHeader(formState.projectName);
        toggleForm();
      })
      .catch(err => console.log(err));
  };

  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      toggleForm();
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div css={container}>
      <Form handleSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Project Name"
          value={formState.projectName}
          id="projectName"
          css={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
      </Form>
      <CancelIcon fontSize="small" css={closeButton} onClick={toggleForm} />
    </div>
  );
}
