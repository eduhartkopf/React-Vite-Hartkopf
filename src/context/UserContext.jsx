import React, { createContext, useState } from "react";

export const UserContext = createContext();

function UserProvider({ children }) {
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");

  const [user, setUser] = useState(
    storedUser && storedUser.accessToken ? storedUser : null
  );

  const saveUser = (email, accessToken) => {
    const newUser = { email, accessToken };
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
  };

  const deleteUser = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const isLoggedIn = !!user;

  return (
    <UserContext.Provider value={{ user, saveUser, deleteUser, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
