import { useEffect, useState, useRef } from "react";
import {
  API_LINK,
  NEXT_QUOTE_DELAY,
  quoteProp,
  TYPE_SPEED,
} from "../utils/constants";

const Type = () => {
  const isMounted = useRef(false);

  const [idx, setIdx] = useState(0);
  const [subIdx, setSubIdx] = useState(0);
  const [end, setEnd] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const [list, setList] = useState<quoteProp[]>([]);
  const [blink, setBlink] = useState(false);

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
    if (isInitial()) return;
    /* uncomment when ready for prod, comment above too
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    */
    var timeout: NodeJS.Timeout;
    if (autoplay) {
      if (endReached()) {
        setEnd(true);
        fetchQuote();
      }
      if (end) return;
      timeout = setTimeout(type, TYPE_SPEED);
    } else {
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [idx, subIdx, list]);

  useEffect(() => {
    if (!end) return;
    const timeout = setTimeout(nextQuote, NEXT_QUOTE_DELAY);
    return () => clearTimeout(timeout);
  }, [end]);

  useEffect(() => {
    const timeout = setTimeout(() => setBlink((prevBlink) => !prevBlink), 500);
    return () => clearTimeout(timeout);
  }, [blink]);
  return (
    <>
      {list.length > 0 ? (
        <>
          <p className="text-5xl h-5/6">
            {list[idx].content.substring(0, subIdx)}
            {blink ? "|" : ""}
          </p>
          <p className="text-2xl text-right">-{list[idx].author}</p>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Type;
