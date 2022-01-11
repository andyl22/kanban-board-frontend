/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { useState } from "react";
import Form from "./Form";

export default function FormCreateComponent(props) {
  const { toggleForm, projectList, setProjectList } = props;
  const [formState, setFormState] = useState({
    projectName: "",
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/projects/createProject", options)
      .then((res) => res.json())
      .then((res) => setProjectList([...projectList, res.project]))
      .then(toggleForm())
      .catch((err) => console.log(err));
  };

  return (
    <Form handleSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Project Name"
        value={formState.name}
        id="projectName"
        onChange={handleChange}
      />
    </Form>
  );
}
