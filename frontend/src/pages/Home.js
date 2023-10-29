import React from "react";
import Header from "../components/Header";
import Signup from "../components/Signup";

function Home() {
  return (
    <div className="flex flex-col h-screen bg-slate-200">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <Signup />
      </div>
    </div>
  );
}

export default Home;
