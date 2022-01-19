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
        return { ...sections, items: action.sectionItems };
      case "ADDITEM":
        // dispatch({type:'ADDITEM', item: item})
        return (() => {
          const indexOfItems = sections.items.indexOf(
            sections.items.filter(
              (item) => item.sectionID === action.sectionID
            )[0]
          );
          const copyOfItems = JSON.parse(JSON.stringify(sections.items));
          copyOfItems[indexOfItems].items.push(action.item);

          return { ...sections, items: copyOfItems };
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
