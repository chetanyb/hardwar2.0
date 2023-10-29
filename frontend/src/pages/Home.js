import React from "react";
import Header from "../components/Header";
import Signup from "../components/Signup";
import Dashboard from "../components/Dashboard";

function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-200">
      <Header />
      {/*<div className="flex-grow flex items-center justify-center">
        <Signup />
  </div>*/}
      <div className="flex-grow">
        <Dashboard />
      </div>
    </div>
  );
}

export default Home;
