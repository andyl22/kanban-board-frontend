/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import React, { useState, useRef, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Form from "./Form";
import CancelIcon from "@mui/icons-material/Cancel";
import { ThemeContext } from "../context/ThemeProvider";
import { postHTTP } from "../utilities/fetchAPIs";
import { SectionsContext } from "../context/SectionsProvider";

export default function FormCreateProject(props) {
  const { toggleForm } = props;
  const { dispatch } = useContext(SectionsContext);
  const { id } = useParams();
  const [formState, setFormState] = useState({
    projectID: id,
    sectionName: "",
  });
  const inputRef = useRef();
  const { colors } = useContext(ThemeContext);

  const container = css`
    display: flex;
    padding: 0.5em 1em;
    gap: 0.5em;
    border-radius: 0.5em;
    align-items: center;
    height: fit-content;
    width: fit-content;
    background: #f2f2f2;
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
    postHTTP("/projectSection/createSection", formState)
      .then((res) =>
        dispatch({ type: "ADDSECTION", sectionDetail: res.section })
      )
      .then(console.log("Fired"))
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
          id="sectionName"
          value={formState.sectionName}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
      </Form>
      <CancelIcon fontSize="small" css={closeButton} onClick={toggleForm} />
    </div>
  );
}
