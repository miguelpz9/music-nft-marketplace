import { createContext, useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

import { connectors } from "../utils/connectors";
import { getUser } from "../utils/helpers";
import Loader from "../pages/components/Loader";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const { account, activate, deactivate, chainId, library } = useWeb3React();

  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const disconnect = () => {
    localStorage.removeItem("provider");
    deactivate();
  };

   useEffect(() => {
     activate(connectors[localStorage.getItem("provider")]).then(() => {
       setIsLoading(false);
     });
   }, [activate]);

  useEffect(() => {
    if (!account) return;
    getUser(account).then((res) => setUserInfo(res));
  }, [account]);

  return (
    <UserContext.Provider
      value={{
        activate,
        disconnect,
        deactivate,
        setUserInfo,
        account,
        chainId,
        library,
        isLoggedIn: !!account,
        userInfo,
      }}
    >
      {isLoading ? <Loader /> : children}
    </UserContext.Provider>
  );
};
