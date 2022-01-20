/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx, keyframes } from "@emotion/react";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import { SidebarContext } from "../context/SidebarProvider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Sidebar(props) {
  const { title, children } = props;
  const { colors, mq } = useContext(ThemeContext);
  const { showSidebar, toggleSidebar } = useContext(SidebarContext);

  const rolloutX = keyframes`
    0% {
      opacity: 0;
      transform: translateX(-255px);
      transform-origin: left;
    }
    100% {
      transform: translateX(0px);
    }
  `;

  const textoutX = keyframes`
    0% {opacity: 0;
      transform: translateX(-25px);
    }
    100% {
        opacity: 100;
        transform: translateX(0);
    }
  `;

  const sidebar = css`
    flex: 0;
    display: flex;
    padding: 1em;
    flex-direction: column;
    align-items: flex-start;
    min-width: fit-content;
    background: ${colors.sideBarBackground};
    box-shadow: 0px 5px 5px gray;
    overflow: auto;
    border-right: 1px solid gray;
    animation: ${rolloutX} 0.1s ease-in;
    h1,
    a,
    button {
      animation: ${textoutX} 0.1s ease-in;
    }
    h1 {
      padding: 0 0 1em 0;
    }
    a {
      font-size: 0.8em;
    }
    &::-webkit-scrollbar {
      border-bottom-right-radius: 2em;
    }
    &::-webkit-scrollbar-thumb {
      background: ${colors.scrollbar};
      border: 6px solid ${colors.sideBarBackground};
      border-radius: 2em;
    }
    ${mq[0]} {
      top: 0px;
      position: absolute;
      height: 100%;
      width: 100%;
      word-break: break-word;
      z-index: 3;
    }
  `;

  const sidebarHeader = css`
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: .8em;
  `

  const arrowBack = css`
  color: ${colors.iconColor};
  transform: scale(0.8);
  &:hover {
    cursor: pointer;
    color: ${colors.iconHoverColor};
  }
`

  if (showSidebar) {
    return (
      <section css={sidebar}>
        <div css={sidebarHeader} >
          <h1>{title}</h1>
          <ArrowBackIcon onClick={toggleSidebar} css={arrowBack}/>
        </div>
        {children}
      </section>
    );
  }

  return null;
}
