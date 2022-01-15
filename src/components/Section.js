/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx, keyframes } from "@emotion/react";
import { useState, useEffect, useContext } from "react";
import SectionItem from "./SectionItem";
import AddSectionItemController from "./AddSectionItemController";
import { ThemeContext } from "../context/ThemeProvider";
import { postHTTP } from "../utilities/fetchAPIs";

export default function Section(props) {
  const { name, sectionID, color } = props;
  const [sectionItems, setSectionItems] = useState([]);
  const { colors, mq } = useContext(ThemeContext);

  const rolloutY = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-50px);
    transform-origin: left;
  }
  100% {
    transform: translateY(0px);
  }
`;

  const section = css`
    display: flex;
    flex-direction: column;
    height: fit-content;
    text-align: center;
    border-radius: 1em;
    background: white;
    box-shadow: -1px 3px 5px ${colors.shadowColor};
    animation: ${rolloutY} 0.2s ease-in;
    &:-moz-drag-over {
      outline: 1px solid black;
    }
    h1 {
      padding: 1em;
      background: ${color || "#ffce1c"};
      border-bottom: 2px solid black;
      border-top-right-radius: inherit;
      border-top-left-radius: inherit;
      color: black !important;
    }
  `;

  const sectionItemsContainer = css`
    display: flex;
    flex-direction: column;
    width: 280px;
    min-width: 200px;
    ${mq[1]} {
      width: 100%;
      padding: 0.8em 0.4em;
      gap: 0.5em;
    }
  `;

  const addSectionItem = (sectionItem) => {
    setSectionItems([...sectionItems, sectionItem]);
  };

  const handleDragOver = (e) => {
    e.dataTransfer.effectAllowed = "move";
    e.preventDefault();
  };

  const handleDragEnter = (e) => {

  };

  const handleDrop = (e) => {
    const item = JSON.parse(e.dataTransfer.getData("text/plain"));
    console.log([item])
    if(e.target.draggable) {
      const sectionContainer = e.target.parentNode;
      const insertIndex = sectionItems.map(item => item._id).indexOf(sectionContainer.id);
      const splitOne = sectionItems.slice(0, insertIndex);
      const splitTwo = sectionItems.slice(insertIndex);
      console.log([...splitOne, [item], ...splitTwo]);
      setSectionItems([...splitOne, ...[item], ...splitTwo])
    }
  };

  useEffect(() => {
    postHTTP("/sectionItem/sectionItemsBySectionID", { sectionID: sectionID })
      .then((res) => setSectionItems(res.sections))
      .catch((err) => console.log(err));
  }, [sectionID]);

  const mappedSectionItems = sectionItems.map((item) => (
    <SectionItem item={item} key={item._id || "dummy"}/>
  ));

  return (
    <section id={sectionID} css={section}>
      <h1>{name}</h1>
      <div
        css={sectionItemsContainer}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDrop={handleDrop}
      >
        {mappedSectionItems}
        <AddSectionItemController
          addSectionItem={addSectionItem}
          sectionID={sectionID}
        />
      </div>
    </section>
  );
}
