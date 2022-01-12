/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import React, { useState, useRef, useEffect, useContext } from "react";
import Form from "./Form";
import CancelIcon from '@mui/icons-material/Cancel';
import { ThemeContext } from "../context/ThemeProvider";

export default function FormCreateProject(props) {
  const { toggleForm, projectList, setProjectList, toggleModal } = props;
  const [formState, setFormState] = useState({projectName: ""});
  const inputRef = useRef();
  const { colors } = useContext(ThemeContext);

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

  const options = {
    method: "POST",
    body: JSON.stringify(formState),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await fetch('/projects/createProject', options)
      .then((res) => res.json())
      .catch((err) => console.log(err));
    setProjectList([...projectList, data.project]);
    toggleForm();
  };

  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      toggleModal();
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  });

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
      <CancelIcon css={closeButton}/>
    </div>
  );
}
