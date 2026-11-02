import React from "react";

const defaultComponentAPI = {
  id: "",
  states: {},
  methods: {},
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WhiteboardContext = React.createContext<any>(defaultComponentAPI);
export const useWhiteboard = () => React.useContext(WhiteboardContext);

export const WhiteboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const context = useWhiteboardProvider();

  return (
    <WhiteboardContext.Provider value={context}>
      {children}
    </WhiteboardContext.Provider>
  );
};

function useWhiteboardProvider() {
  const [whiteboardOffset, setWhiteboardOffset] = React.useState({
    x: 0,
    y: 0,
  });
  const [isDraggingWhiteboard, setIsDraggingWhiteboard] = React.useState(false);
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = React.useState(1);

  return {
    states: {
      whiteboardOffset,
      isDraggingWhiteboard,
      dragStart,
      zoomLevel,
    },
    methods: {
      setWhiteboardOffset,
      setIsDraggingWhiteboard,
      setDragStart,
      setZoomLevel,
    },
  };
}
