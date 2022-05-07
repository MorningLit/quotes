import { useEffect, useState } from "react";
import { typeSpeed, quoteProp } from "../utils/constants";

const Type = () => {
  const [idx, setIdx] = useState(0);
  const [subIdx, setSubIdx] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const [list, setList] = useState<quoteProp[]>([]);
  const type = () => {
    setSubIdx((prevSubIdx) => prevSubIdx + (reverse ? -1 : 1));
  };
  const autoType = () => {
    //if (idx === list.length - 1 && subIdx === list[idx].length) return true; // reached end of autoplay
    if (subIdx === list[idx].content.length && !reverse) {
      setReverse(true);
      fetch("https://api.quotable.io/random")
        .then((res) => res.json())
        .then((data) => {
          setList((prevList) => [...prevList, data]);
        });
    }
    if (subIdx === 0 && reverse) {
      setReverse(false);
      setIdx((prevIdx) => prevIdx + 1);
    }
    return false;
  };
  useEffect(() => {
    if (idx === 0 && list.length === 0) {
      fetch("https://api.quotable.io/random")
        .then((res) => res.json())
        .then((data) => {
          setList((prevList) => [...prevList, data]);
        });
      return;
    }
    var end;
    if (autoplay) {
      end = autoType();
    }
    if (end) return;
    var timeout: NodeJS.Timeout;
    timeout = setTimeout(type, typeSpeed);

    return () => {
      clearTimeout(timeout);
    };
  }, [subIdx, idx, list]);

  return (
    <p className="text-5xl" id="type">
      {list.length > 0 ? list[idx].content.substring(0, subIdx) : ""}
    </p>
  );
};

export default Type;
