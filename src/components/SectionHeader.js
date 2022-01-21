/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import SectionHeaderLeft from "./SectionHeaderLeft";
import DeleteProjectController from "./DeleteProjectController";

export default function SectionHeader(props) {
  const { headerTitle } = props;
  const { colors } = useContext(ThemeContext);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const sectionHeader = css`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    flex: 1;
    padding: 0.5em 2em;
    background: ${colors.headerColor};
    box-shadow: 0px 0px 10px ${colors.headerShadowColor};
    color: ${colors.basicFontColor};
    font-weight: 600;
    position: sticky;
    top: 0;
    left: 0;
  `;

  const toggleConfirmDelete = () => {
    setShowModalDelete(!showModalDelete);
  };

  return (
    <>
      {" "}
      <div css={sectionHeader}>
        <SectionHeaderLeft
          headerTitle={headerTitle}
          showModalDelete={showModalDelete}
          toggleConfirmDelete={toggleConfirmDelete}
        />
      </div>
      {showModalDelete ? (
        <DeleteProjectController
          itemName={headerTitle}
          toggleModal={toggleConfirmDelete}
        />
      ) : null}
    </>
  );
}
