import { useContext } from "react";
import { AppContext } from "../App";

const useAuth = () => {
  const authContext = useContext(AppContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AppProvider");
  }

  return authContext;
};

export default useAuth;
