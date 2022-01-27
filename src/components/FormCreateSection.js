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

export default function FormCreateSection(props) {
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
    height: 100%;
    align-items: flex-start;
    padding: 0.5em 1em;
    gap: 0.5em;
    border-radius: 0.5em;
    height: fit-content;
    width: fit-content;
    background: white;
  `;

  const closeButton = css`
    font-size: 1em;
    position: relative;
    top: 12px;
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
        dispatch({ type: "ADDSECTION", sectionDetail: res.section, sectionID: res.section._id })
      )
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
          id="sectionName"
          value={formState.sectionName || ""}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
        <label htmlFor="color">Pick a section color:</label>
        <input
          type="color"
          id="color"
          value={formState.color || "#FFFFFF"}
          onChange={handleChange}
        />
        <input type="submit" value="Submit" onChange={handleChange} />
      </Form>
      <CancelIcon fontSize="small" css={closeButton} onClick={toggleForm} />
    </div>
  );
}
