import type { NextPage } from "next";
import Navbar from "../components/Navbar";
import Type from "../components/Type";

const Home: NextPage = () => {
  return (
    <div className="h-screen w-screen">
      <Navbar />
      <div className="h-3/6 w-full flex justify-center items-center ">
        <div className="w-3/4">
          <Type />
        </div>
      </div>
    </div>
  );
};

export default Home;
