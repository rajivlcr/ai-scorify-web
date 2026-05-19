import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 🚀 LOAD USER
  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  // 🚀 LOGIN
  const login = (userData) => {
    localStorage.setItem(
      "user",

      JSON.stringify(userData),
    );

    setUser(userData);
  };

  // 🚀 LOGOUT
  const logout = () => {
    localStorage.removeItem("user");

    localStorage.removeItem("token");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,

        setUser,

        login,

        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
