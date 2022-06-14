import { useContext, createContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthProvider";
import useFireStore from "../hooks/useFirestore";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [moveToChat, setMoveToChat] = useState(false);
    const [userFriendData, setUserFriendData] = useState({
        userName: "",
        photoURL: "",
        chatId: "",
        gender: "",
    });
    const { user } = useContext(AuthContext);
    const userData = useFireStore("user", user.uid && user.uid);

    return (
        <AppContext.Provider
            value={{
                moveToChat,
                setMoveToChat,
                userData,
                userFriendData,
                setUserFriendData,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
