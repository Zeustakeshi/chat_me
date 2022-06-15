import { useContext, createContext, useState } from "react";
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
    const userData = useFireStore("user", user.uid && user.uid, {
        userName: "",
        photoURL: "",
        notify: [],
    });

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
