import { useContext, createContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthProvider";
import useFireStore from "../hooks/useFirestore";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [moveToChat, setMoveToChat] = useState(false);
    const { user } = useContext(AuthContext);

    const userData = useFireStore("user", user.uid && user.uid);

    return (
        <AppContext.Provider
            value={{
                moveToChat,
                setMoveToChat,
                userData,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
