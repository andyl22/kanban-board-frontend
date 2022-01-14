/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { useContext } from "react";
import { SidebarContext } from "../context/SidebarProvider";
import { ThemeContext } from "../context/ThemeProvider";
import { UserContext } from "../context/UserProvider";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";

export default function LeftHeader(props) {
  const { toggleSidebar } = useContext(SidebarContext);
  const { currentUser } = useContext(UserContext);
  const { colors, mq } = useContext(ThemeContext);
  const { activeTab, title } = props;

  const expandSidebar = css`
    color: ${colors.iconColor};
    transform: scale(0.9);
    &:hover {
      cursor: pointer;
      transition: 0.1s ease-in;
      color: ${colors.iconHoverColor};
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
        <ExpandCircleDownIcon css={expandSidebar} onClick={toggleSidebar} />
      ) : null}
      <h1>{title}</h1>
    </div>
  );
}
