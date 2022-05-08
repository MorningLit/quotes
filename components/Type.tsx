import { useEffect, useState } from "react";
import { API_LINK, quoteProp, TYPE_SPEED } from "../utils/constants";

const Type = () => {
  const [idx, setIdx] = useState(0);
  const [subIdx, setSubIdx] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const [list, setList] = useState<quoteProp[]>([]);
  const type = () => {
    setSubIdx((prevSubIdx) => prevSubIdx + (reverse ? -1 : 1));
  };
  const fetchQuote = () => {
    fetch(API_LINK)
      .then((res) => res.json())
      .then((data) => {
        setList((prevList) => [...prevList, data]);
      });
  };
  const isInitial = () => idx === 0 && list.length === 0;
  const autoType = () => {
    //if (idx === list.length - 1 && subIdx === list[idx].length) return true; // reached end of autoplay
    if (subIdx === list[idx].content.length && !reverse) {
      setReverse(true);
      fetchQuote();
    }
    if (subIdx === 0 && reverse) {
      setReverse(false);
      setIdx((prevIdx) => prevIdx + 1);
    }
  };
  useEffect(() => {
    if (isInitial()) {
      fetchQuote();
      return;
    }
    var timeout: NodeJS.Timeout;
    if (autoplay) {
      autoType();
      timeout = setTimeout(type, TYPE_SPEED);
    } else {
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [subIdx, idx, list, reverse]);

  return (
    <>
      {list.length > 0 ? (
        <>
          <p className="text-5xl" id="type">
            {list[idx].content.substring(0, subIdx)}
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
