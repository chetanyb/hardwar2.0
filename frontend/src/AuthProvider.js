import React, { createContext, useState, useCallback, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      // TODO: add server verification of token
      setIsAuthenticated(true);
    }
  }, []);

  const signUp = useCallback(async (username, email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Sign up failed");
      }
      setIsAuthenticated(true);
      setUser(data.user);
      setToken(data.token);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, []);

  const signIn = useCallback(async (identifier, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Sign in failed");
      }
      setIsAuthenticated(true);
      setUser(data.user);
      setToken(data.token);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        signUp,
        signIn,
        user,
        setUser,
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
