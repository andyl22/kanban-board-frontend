/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { useContext } from "react";
import { SidebarContext } from "../context/SidebarProvider";
import { ThemeContext } from "../context/ThemeProvider";
import { UserContext } from "../context/UserProvider";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function LeftHeader(props) {
  const { showSidebar, toggleSidebar } = useContext(SidebarContext);
  const { currentUser } = useContext(UserContext);
  const { colors, mq } = useContext(ThemeContext);
  const { activeTab, title } = props;

  const expandSidebar = css`
    color: ${colors.iconColor};
    transform: scale(0.9);
    &:hover {
      cursor: pointer;
    }
    ${mq[1]} {
      position: absolute;
      top: 0.5em;
      left: 0.5em;
      transform: scale(0.85);
    }
  `;

  const leftHeader = css`
    display: flex;
    gap: 1em;
    padding: 0em 1em;
  `;

  return (
    <div css={leftHeader}>
      {activeTab === "home" && currentUser ? (
        (showSidebar) ? 
          <ExpandLessIcon css={expandSidebar} onClick={toggleSidebar} />:
          <ExpandMoreIcon css={expandSidebar} onClick={toggleSidebar} />
      ) : null}
      <h1>{title}</h1>
    </div>
  );
}
