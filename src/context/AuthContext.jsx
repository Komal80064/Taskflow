import {
  createContext,
  useContext,
  useState,
} from "react";

import {
  login as loginApi,
  signup as signupApi,
  logout as logoutApi,
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("taskflow_user");

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });

  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    const data = await loginApi({
      email,
      password,
    });

    localStorage.setItem(
      "taskflow_user",
      JSON.stringify(data.user)
    );

    setUser(data.user);

    return data;
  };

  const signup = async (name, email, password) => {
    const data = await signupApi({
      name,
      email,
      password,
    });

    // User is automatically logged in after signup
    localStorage.setItem(
      "taskflow_user",
      JSON.stringify(data.user)
    );

    setUser(data.user);

    return data;
  };

  const logout = async () => {
    try {
      await logoutApi();
    } finally {
      localStorage.removeItem("taskflow_user");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

