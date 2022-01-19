/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import SectionHeader from "./SectionHeader";
import AddSectionController from "./AddSectionController";
import { useContext, useRef, useEffect } from "react";
import { ThemeContext } from "../context/ThemeProvider";

export default function KanbanContent(props) {
  const { children, project } = props;
  const { colors } = useContext(ThemeContext);
  const sectionRef = useRef();

  const kanbanContentContainer = css`
    display: flex;
    flex-direction: column;
    overflow: auto;
    width: 100%;
  `
  const content = css`
    display: flex;
    gap: 2em;
    padding: 2em;
    height: 100%;
    min-width: 0;
    overflow: auto;
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
  `

  useEffect(() => {
    sectionRef.current.scrollTo(0, 0);
  }, [])

  return (
    <div css={kanbanContentContainer}>
      <SectionHeader headerTitle={project.name}/>
      <div css={content} ref={sectionRef}>
        {children}
        <AddSectionController />
      </div>
    </div>
  );
}
