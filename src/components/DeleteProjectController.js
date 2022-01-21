/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { useContext } from "react";
import { ProjectContext } from "../context/ProjectProvider";
import { postHTTP } from "../utilities/fetchAPIs";
import { useNavigate, useParams } from "react-router-dom";
import ModalDeleteConfirm from "./ModalDeleteConfirm";

export default function DeleteProjectController(props) {
  const { itemName, toggleModal } = props;
  const { projectList, setProjectList } = useContext(ProjectContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const deleteProject = () => {
    postHTTP("/projects/deleteProject", { id: id })
      .then(setProjectList(projectList.filter((project) => project._id !== id)))
      .then(navigate("/kanban-board"))
      .catch((err) => console.log(err));
  };

  return (
    <ModalDeleteConfirm
      deleteObject={deleteProject}
      itemName={itemName}
      toggleModal={toggleModal}
    />
  );
}
