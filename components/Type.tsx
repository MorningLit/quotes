import { useEffect, useState } from "react";
import { quotes, typeSpeed } from "../utils/constants";

const Type = () => {
  const [idx, setIdx] = useState(0);
  const [subIdx, setSubIdx] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const type = () => {
    setSubIdx((prevSubIdx) => prevSubIdx + (reverse ? -1 : 1));
  };
  const autoType = () => {
    if (idx === quotes.length - 1 && subIdx === quotes[idx].length) return true; // reached end of autoplay
    if (subIdx === quotes[idx].length && !reverse) {
      setReverse(true);
    }
    if (subIdx === 0 && reverse) {
      setReverse(false);
      setIdx((prevIdx) => prevIdx + 1);
    }
    return false;
  };
  useEffect(() => {
    var end;
    if (autoplay) {
      end = autoType();
    }
    if (end) return;
    const timeout = setTimeout(type, typeSpeed);

    return () => {
      clearTimeout(timeout);
    };
  }, [subIdx, idx]);

  return (
    <p className="text-center align-middle" id="type">
      {quotes[idx].substring(0, subIdx)}
    </p>
  );
};

export default Type;
