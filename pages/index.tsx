import type { NextPage } from "next";
import Navbar from "../components/Navbar";
import Type from "../components/Type";

const Home: NextPage = () => {
  return (
    <div className="h-screen w-screen">
      <Navbar />
      <div className="h-5/6 w-full flex justify-center items-center ">
        <div className="w-3/4 flex flex-col justify-around h-full">
          <Type />
        </div>
      </div>
    </div>
  );
};

export default Home;
