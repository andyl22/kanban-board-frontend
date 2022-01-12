/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import React, { useState, useRef, useEffect, useContext } from "react";
import Form from "./Form";
import CancelIcon from '@mui/icons-material/Cancel';
import { ThemeContext } from "../context/ThemeProvider";
import { postAPI } from "../utilities/fetchAPIs";

export default function FormCreateProject(props) {
  const { toggleForm, activeProject} = props;
  const [formState, setFormState] = useState({sectionName: ""});
  const inputRef = useRef();
  const { colors } = useContext(ThemeContext);

  const container = css`
    display: flex;
    padding: .5em 1em;
    gap: .5em;
    border-radius: .5em;
    align-items: center;
    height: fit-content;
    width: fit-content;
    background: #F2F2F2;
  `;

  const closeButton = css`
    &:hover {
      cursor: pointer;
      color: ${colors.iconHoverColor};
    }
  `;

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState(formState.projectID = activeProject._id)
    postAPI("/projectSection/createSection", 'POST', formState)
      .then((res) => res.json())
      .then(toggleForm())
      .catch((err) => console.log(err));
  };

  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      toggleForm();
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
          placeholder="Section Name"
          value={formState.sectionName}
          id="sectionName"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
      </Form>
      <CancelIcon css={closeButton} onClick={toggleForm}/>
    </div>
  );
}
