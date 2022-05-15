import type { NextPage } from "next";
import AutoPlayContext from "../components/AutoplayContext";
import Navbar from "../components/Navbar";
import Type from "../components/Type";

const Home: NextPage = () => {
  return (
    <div className="h-screen w-screen">
      <AutoPlayContext>
        <Navbar />
        <Type />
      </AutoPlayContext>
    </div>
  );
};

export default Home;
