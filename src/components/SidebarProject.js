/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddProjectButton from "./AddProjectButton";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

export default function SidebarProject(props) {
  const { activeProject, setActiveProject } = props;
  const [projectList, setProjectList] = useState(null);
  const [mappedProjectList, setMappedProjectList] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/projects/getProjectList")
      .then((res) => res.json())
      .then((res) => res.projects)
      .then((res) => setProjectList(res))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (projectList) {
      const projectLinks = css`
        font-weight: 600;
        margin-bottom: 0.4em;
      `;

      setMappedProjectList(
        projectList.map((project) => (
          <Link
            to={`/kanban-board/project/${project._id}`}
            key={project._id}
            css={projectLinks}
          >
            {project.name}
          </Link>
        ))
      );

      setActiveProject(projectList[0]);
    }
  }, [projectList]);

  useEffect(() => {
    if(activeProject) {
      navigate(`/kanban-board/project/${activeProject._id}`)
    }
  }, [activeProject])

  return (
    <>
      <Sidebar title={"Project List"}>
        {mappedProjectList}
        <AddProjectButton projectList={projectList} setProjectList={setProjectList}/>
      </Sidebar>
    </>
  );
}
