import type { NextPage } from "next";
import AutoPlayContext from "../components/AutoplayContext";
import Navbar from "../components/Navbar";
import Type from "../components/Type";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div className="h-screen w-screen">
      <AutoPlayContext>
        <Navbar />
        <Type />
      </AutoPlayContext>
      <Head>
        <link rel="icon" href="./favicon.svg"></link>
        <title>Quotes</title>
      </Head>
    </div>
  );
};

export default Home;
