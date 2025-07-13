import React from "react";
import Right from "./rightside/Right";
import Left from "./leftside/Left";

const Home = () => {
  return (
    <div className="flex h-screen">
      <Left />
      <Right />
    </div>
  );
};

export default Home;
