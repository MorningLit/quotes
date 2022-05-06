import type { NextPage } from "next";
import Type from "../components/Type";

const Home: NextPage = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Type />
    </div>
  );
};

export default Home;
