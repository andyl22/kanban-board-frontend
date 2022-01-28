/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx, keyframes } from "@emotion/react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Section from "./Section";
import SidebarProject from "./SidebarProject";
import { ThemeContext } from "../context/ThemeProvider";
import { UserContext } from "../context/UserProvider";
import { postHTTP } from "../utilities/fetchAPIs";
import { SectionsContext } from "../context/SectionsProvider";
import KanbanContent from "./KanbanContent";
import AutorenewIcon from '@mui/icons-material/Autorenew';

export default function ContentController() {
  const [project, setProject] = useState();
  const [error, setError] = useState();
  const [mappedSections, setMappedSections] = useState();
  const [loading, setLoading] = useState(false);
  const { mq } = useContext(ThemeContext);
  const { currentUser } = useContext(UserContext);
  const { sections, dispatch } = useContext(SectionsContext);
  const { id } = useParams();

  const boardContainer = css`
    display: flex;
    flex: 1;
    min-height: 0;
  `;

  const textContent = css`
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

  const loadingAnimation = keyframes`
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  `

  const loadIcon = css`
    margin: 3em auto;
    font-size: 3em;
    color: gray;
    animation: ${loadingAnimation} 1s infinite;
  `

  // Fetch section metadata and items for the project
  useEffect(() => {
    if (project) {
      (async () => {
        setLoading(true);

        const sectionDetails = await postHTTP(
          "/projectSection/sectionByProjectId",
          { id: project._id }
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
          setLoading(false);
        });
      })();
    }
  }, [dispatch, project]);

  useEffect(() => {
    if (id === undefined) {
      setProject(null);
      setError(null);
      setMappedSections(null);
      dispatch({ type: "CLEARSECTIONS" });
      return;
    }

    postHTTP("/projects/getProjectByID", { id: id })
      .then((res) => res.project)
      .then((res) => setProject(res));
  }, [dispatch, id]);

  // Map the sections retrieved after fetching the raw data to Section components
  useEffect(() => {
    if (!sections || sections === null) return;
    const sectionDetails = sections.sectionDetails;
    const mappedSections = sectionDetails.map((section) => (
      <Section section={section} key={section._id} />
    ));
    setMappedSections(mappedSections);
  }, [sections]);

  // IIFE used to render elements based on whether the user is logged in, there is an active project, or if there is an error retrieving projects
  const conditionalRenderingLogic = (function () {
    if (!currentUser) {
      return <p css={textContent}>Please sign in to access your projects.</p>;
    } else if (!id) {
      return <p css={textContent}>Select a project in the dropdown menu.</p>;
    } else if (loading) {
      return <AutorenewIcon css={loadIcon}/>;
    } else if (error) {
      return (
        <p css={textContent}>
          Not able to load project details. Try again later.
        </p>
      );
    } else if (project) {
      return <KanbanContent project={project}>{mappedSections}</KanbanContent>;
    }
  })();

  return (
    <div css={boardContainer}>
      {currentUser ? <SidebarProject currentUser={currentUser} /> : null}
      {conditionalRenderingLogic}
    </div>
  );
}
