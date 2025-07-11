import React from "react";
import Left from "./home/leftside/Left";
import Right from "./home/rightside/Right";

const App = () => {
  return (
    <div className="flex h-screen">
      <Left />
      <Right />
    </div>
  );
};

export default App;
