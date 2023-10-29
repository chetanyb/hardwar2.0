import React, { useState } from "react";

function Signup() {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleSignUp = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <div className="bg-white p-8 rounded shadow-lg w-96">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isSignUp ? "Sign Up" : "Sign In"}
      </h2>
      <form className="space-y-4">
        {isSignUp && (
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 border border-gray-300 rounded"
          />
        )}
        <input
          type={isSignUp ? "email" : "text"}
          placeholder={isSignUp ? "Email" : "Email/Username"}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded"
        />
        {isSignUp && (
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-2 border border-gray-300 rounded"
          />
        )}
        <button className="w-full p-2 bg-brand_orange hover:bg-brand_orange_darker text-white rounded">
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
      </form>
      <div className="text-center mt-4">
        <span className="text-gray-700">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
        </span>
        <button onClick={toggleSignUp} className="text-brand_maroon ml-2">
          {isSignUp ? "Sign In" : "Sign Up"}
        </button>
      </div>
    </div>
  );
}

export default Signup;
