import React, { useState } from "react";

const ProjectContext = React.createContext([{}, () => {}]);

const ProjectProvider = ({ children }) => {
  const [projectList, setProjectList] = useState(null);

  return (
    <ProjectContext.Provider value={{ projectList, setProjectList }}>
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectProvider, ProjectContext };
