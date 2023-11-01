import React, { useState, useContext, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState(null);
  const { signUp, signIn, isAuthenticated, token } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated && token) {
      navigate("/landinfo");
    }
  }, [isAuthenticated, token, navigate]);

  const toggleSignUp = () => {
    setIsSignUp((prev) => !prev);
    setError(null); // Reset error state when toggling sign up/sign in
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const { username, email, password, confirmPassword } = e.target.elements;
      try {
        if (isSignUp) {
          if (password.value !== confirmPassword.value) {
            throw new Error("Passwords do not match");
          }
          await signUp(username.value, email.value, password.value);
          toast.success("Signed up successfully");
          setTimeout(() => {
            navigate("/landinfo");
          }, 2000);
        } else {
          await signIn(email.value, password.value);
          toast.success("Signed in successfully");
          setTimeout(() => {
            navigate("/landinfo");
          }, 2000);
        }
      } catch (error) {
        setError(error.message); // Set error state to the error message
        toast.error(error.message);
      }
    },
    [isSignUp, signUp, signIn, navigate]
  );

  return (
    <div className="bg-white p-8 rounded shadow-lg w-96">
      {error && (
        <div className="error-popup text-red-500 text-center mb-4">{error}</div>
      )}
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isSignUp ? "Sign Up" : "Sign In"}
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {isSignUp && (
          <input
            name="username"
            type="text"
            placeholder="Username"
            className="w-full p-2 border border-gray-300 rounded"
          />
        )}
        <input
          name="email"
          type={isSignUp ? "email" : "text"}
          placeholder={isSignUp ? "Email" : "Email/Username"}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded"
        />
        {isSignUp && (
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            className="w-full p-2 border border-gray-300 rounded"
          />
        )}
        <button
          type="submit"
          className="w-full p-2 bg-brand_orange hover:bg-brand_orange_darker text-white rounded"
        >
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
