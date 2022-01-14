/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { useState } from "react";
import ButtonAdd from "./ButtonAdd";
import FormCreateProject from "./FormCreateProject";

export default function AddProjectController(props) {
  const { addProject } = props;
  const [showCreateProject, setShowCreateProject] = useState(false);

  const toggleForm = () => {
    setShowCreateProject(!showCreateProject);
  };

  return showCreateProject ? (
    <FormCreateProject toggleForm={toggleForm} addProject={addProject} />
  ) : (
    <ButtonAdd onClickAction={toggleForm} />
  );
}
