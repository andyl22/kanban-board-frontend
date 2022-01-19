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
import { DragDropContext } from "react-beautiful-dnd";
import { SectionsContext } from "../context/SectionsProvider";

export default function KanbanBoard() {
  const { colors, mq } = useContext(ThemeContext);
  const { currentUser } = useContext(UserContext);
  const { sections, dispatch } = useContext(SectionsContext);
  const [loading, setLoading] = useState(false);
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
    &::-webkit-scrollbar-corner {
      background-color: rgba(0, 0, 0, 0);
    }
    &::-webkit-scrollbar-thumb {
      background: ${colors.scrollbar};
      border: 4px solid ${colors.contentBackground};
      padding: 0 2em;
      background-clip: content-box;
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

  // Fetch section metadata and items for the project
  useEffect(() => {
    if (id) {
      const getProjectDetails = async () => {
        setLoading(true);

        const sectionDetails = await postHTTP(
          "/projectSection/sectionByProjectId",
          { id: id }
        )
          .then((res) => res.sections)
          .catch((err) => setError("Could not retrieve project details."));

        const sectionItems = sectionDetails.map((section) => {
          return postHTTP("/sectionItem/sectionItemsBySectionID", {
            sectionID: section._id,
          });
        });

        Promise.all(sectionItems).then((res) => {
          dispatch({ type: "SETSECTIONS", sectionDetails: sectionDetails });
          dispatch({ type: "SETITEMS", sectionItems: res });
        });
      };

      getProjectDetails();
    }
    sectionRef.current.scrollTo(0, 0);
  }, [dispatch, id]);

  // Map the sections retrieved after fetching the raw data to Section components
  useEffect(() => {
    if (!sections) return;
    const sectionDetails = sections.sectionDetails;
    const mappedSections = sectionDetails.map((section) => (
      <Section id={section._id} name={section.name} key={section._id} />
    ));
    setMappedSections(mappedSections);
  }, [sections]);

  // Set the drag results for the DragDropContext if it is a valid drop
  const handleDragEnd = (result) => {
    setLoading(true);
    const { destination, source, draggableId } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const sectionItems = sections.items;
    const sourceIndex = sectionItems.indexOf(sectionItems.filter(item => item.sectionID === source.droppableId)[0]);
    const destinationIndex = sectionItems.indexOf(sectionItems.filter(item => item.sectionID === destination.droppableId)[0]);

    const copyOfItems = JSON.parse(JSON.stringify(sectionItems));
    const dragItem = copyOfItems[sourceIndex].items.filter(item => item._id === draggableId)[0];
    copyOfItems[sourceIndex].items.splice(source.index, 1);
    copyOfItems[destinationIndex].items.splice(destination.index, 0, dragItem);
    dispatch({type:'SETITEMS', sectionItems: copyOfItems});
    setLoading(true);
  };

  // IIFE used to render elements based on whether the user is logged in, there is an active project, or if there is an error retrieving projects
  const conditionalRenderingLogic = (function () {
    if (!currentUser) {
      return (
        <p css={notLoggedInError}>Please sign in to access your projects.</p>
      );
    } else if (loading) {
      return <p>Loading</p>;
    } else if (error) {
      return <p>Not able to load project details. Try again later.</p>;
    } else if (!id) {
      return <p>Select a project in the dropdown menu.</p>;
    } else {
      return <AddSectionController />;
    }
  })();

  return (
    <>
      <div css={boardContainer}>
        {currentUser ? <SidebarProject currentUser={currentUser} /> : null}
        <DragDropContext onDragEnd={handleDragEnd}>
          <section css={sectionsContainer} ref={sectionRef}>
            {mappedSections}
            {conditionalRenderingLogic}
          </section>
        </DragDropContext>
      </div>
    </>
  );
}
