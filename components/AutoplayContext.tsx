import React, { useContext, useState } from "react";

const AutoplayContext = React.createContext(false);
const AutoplayUpdateContext = React.createContext(() => {});

const AutoPlayContext = ({ children }: { children: React.ReactNode }) => {
  const [autoplay, setAutoplay] = useState(false);
  const toggleAutoplay = () => {
    setAutoplay((prev) => !prev);
  };
  return (
    <AutoplayContext.Provider value={autoplay}>
      <AutoplayUpdateContext.Provider value={toggleAutoplay}>
        {children}
      </AutoplayUpdateContext.Provider>
    </AutoplayContext.Provider>
  );
};

export const useAutoplay = () => useContext(AutoplayContext);
export const useAutoplayUpdate = () => useContext(AutoplayUpdateContext);

export default AutoPlayContext;
