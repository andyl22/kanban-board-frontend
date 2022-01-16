/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Section from "./Section";
import AddSectionController from "./AddSectionController";
import SidebarProject from "./SidebarProject";
import { ThemeContext } from "../context/ThemeProvider";
import { UserContext } from "../context/UserProvider";
import { postHTTP } from "../utilities/fetchAPIs";

export default function KanbanBoard() {
  const { colors, mq } = useContext(ThemeContext);
  const { currentUser } = useContext(UserContext);
  const [sections, setSections] = useState(null);
  const [mappedSections, setMappedSections] = useState(null);
  const [error, setError] = useState();
  const { id } = useParams();
  const sectionRef = useRef();

  const boardContainer = css`
    display: flex;
    flex: 1;
    min-height: 0;
  `;

  const sectionsContainer = css`
    flex: 1 1 1px;
    display: flex;
    gap: 3em;
    padding: 2em 2em;
    overflow: auto;
    ${mq[1]} {
      gap: 1em;
      padding: 1em;
    }
    &::-webkit-scrollbar {
      background: none;
    }
    &::-webkit-scrollbar-track {
    }
    &::-webkit-scrollbar-thumb {
      background: ${colors.scrollbar};
      border: 4px solid ${colors.contentBackground};
      padding: 0 2em;
      background-clip: padding-box;
      border-radius: 0.5em;
    }
  `;

  const notLoggedInError = css`
    margin: 0 auto;
    padding: 1em 0;
    text-align: center;
    font-weight: 600;
    font-size: 2em;
    ${mq[1]} {
      font-size: 1.5em;
    }
    ${mq[0]} {
      font-size: 1em;
    }
  `;

  const addSection = (section) => {
    setSections([...sections, section]);
  };

  useEffect(() => {
    if (id) {
      postHTTP("/projectSection/sectionByProjectId", { id: id })
        .then((res) => setSections(res.sections))
        .catch((err) => setError("Could not retrieve project details."));
    }
  }, [id]);

  useEffect(() => {
    console.log(sections);
    if (sections) {
      setMappedSections(
        sections.map((section) => (
          <Section key={section._id} sectionDetails={section} name={section.name} />
        ))
      );
    }

    sectionRef.current.scrollTo(0, 0);
  }, [sections]);

  const conditionalRenderingLogic = (function () {
    if (!currentUser) {
      return <p css={notLoggedInError}>Please sign in to access your projects.</p>;
    } else if (error) {
      return <p>Not able to load project details. Try again later.</p>;
    } else if (!id) {
      return <p>Select a project in the dropdown menu.</p>;
    } else {
      return <AddSectionController addSection={addSection} />;
    }
  })();

  return (
    <>
      <div css={boardContainer}>
        {(currentUser) ? <SidebarProject currentUser={currentUser}/> : null}
        <section css={sectionsContainer} ref={sectionRef}>
          { (currentUser) ? mappedSections : null }
          {conditionalRenderingLogic}
        </section>
      </div>
    </>
  );
}
