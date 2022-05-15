import { useEffect, useState, useRef } from "react";
import {
  API_LINK,
  NEXT_QUOTE_DELAY,
  quoteProp,
  TYPE_SPEED,
} from "../utils/constants";
import { useAutoplay } from "./AutoplayContext";

const Type = () => {
  const isMounted = useRef(false);

  const [idx, setIdx] = useState(0);
  const [subIdx, setSubIdx] = useState(0);
  const [end, setEnd] = useState(false);
  const [list, setList] = useState<quoteProp[]>([]);
  const [blink, setBlink] = useState(false);
  const autoplay = useAutoplay();

  const isInitial = () => idx === 0 && list.length === 0;
  const endReached = () => subIdx === list[idx].content.length && !end;

  const fetchQuote = () => {
    fetch(API_LINK)
      .then((res) => res.json())
      .then((data) => {
        setList((prevList) => [...prevList, data]);
      });
  };

  const type = () => {
    setSubIdx((prevSubIdx) => prevSubIdx + 1);
  };
  const nextQuote = () => {
    setEnd(false);
    setIdx((prevIdx) => prevIdx + 1);
    setSubIdx(0);
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  useEffect(() => {
    if (isInitial() || end) return;
    /* uncomment when ready for prod, comment above too
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    */
    if (endReached()) {
      setEnd(true);
      fetchQuote();
      return;
    }
    const timeout = setTimeout(type, TYPE_SPEED);
    return () => {
      clearTimeout(timeout);
    };
  }, [idx, subIdx, list]);

  useEffect(() => {
    if (!end || !autoplay) return;
    const timeout = setTimeout(nextQuote, NEXT_QUOTE_DELAY);
    return () => clearTimeout(timeout);
  }, [end, autoplay]);
  const handleClick = () => {
    if (autoplay || !end) return;
    nextQuote();
  };

  useEffect(() => {
    const timeout = setTimeout(() => setBlink((prevBlink) => !prevBlink), 500);
    return () => clearTimeout(timeout);
  }, [blink]);
  return (
    <div className="h-4/6 w-full flex justify-center items-center">
      <div
        className={`w-3/4 h-full mt-8 border-2 border-gray-600 rounded-lg p-4 relative ${
          end && !autoplay ? "hover" : ""
        }`}
        onClick={handleClick}
      >
        {list.length > 0 ? (
          <>
            <p className={`text-5xl h-5/6  `}>
              {list[idx].content.substring(0, subIdx)}
              {blink ? "|" : ""}
            </p>
            <p
              className={`author text-2xl absolute bottom-6 right-8 text-right ${
                end ? "appear" : ""
              }`}
            >
              -{list[idx].author}
            </p>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Type;
