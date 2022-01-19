import React, { useReducer } from "react";

const SectionsContext = React.createContext([{}, () => {}]);

const SectionsProvider = ({ children }) => {
  const reducer = (sections, action) => {
    switch (action.type) {
      case "SETSECTIONS":
        // dispatch({type:'SETSECTIONS', sectionDetails: res.sections}
        return { ...sections, sectionDetails: action.sectionDetails };
      case "ADDSECTION":
        // dispatch({type:'ADDSECTION', sectionDetail: section})
        return {
          ...sections,
          sectionDetails: [...sections.sectionDetails, action.sectionDetail],
        };
      case "EDITSECTIONS":
        return;
      case "DELETESECTIONS":
        return;
      case "SETITEMS":
        // dispatch({type:'SETITEMS', sectionItems: res.sections})
        return { ...sections, itemsList: action.sectionItems };
      case "ADDITEM":
        // dispatch({type:'ADDITEM', item: item})
        return (() => {
          if (sections.itemsList === undefined) {
            return {
              ...sections,
              itemsList: [
                { sectionID: action.sectionID, items: [action.item || null] },
              ],
            };
          }

          const indexOfItems = sections.itemsList.indexOf(
            sections.itemsList.filter(
              (item) => item.sectionID === action.sectionID
            )[0]
          );

          if (indexOfItems === -1) {
            return {
              ...sections,
              itemsList: [
                ...sections.itemsList,
                { sectionID: action.sectionID, items: [action.item] },
              ],
            };
          }

          const copyOfItems = JSON.parse(JSON.stringify(sections.itemsList));
          copyOfItems[indexOfItems].items.push(action.item);
          return { ...sections, itemsList: copyOfItems };
        })();
      case "EDITITEM":
        return;
      case "DELETEITEM":
        return;
      default:
        return;
    }
  };

  const [sections, dispatch] = useReducer(reducer, null);

  return (
    <SectionsContext.Provider value={{ sections, dispatch }}>
      {children}
    </SectionsContext.Provider>
  );
};

export { SectionsProvider, SectionsContext };
