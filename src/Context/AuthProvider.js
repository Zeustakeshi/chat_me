import { useEffect, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../fireabse/config";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [isNewUser, setIsNewUser] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                let { displayName, email, uid, photoURL } = user;
                const id = uid.slice(4, 14);
                setUser({ displayName, email, id, uid, photoURL });
                navigate("/");
                setLoading(false);
            } else {
                navigate("/login");
                setLoading(false);
            }
        });
        return () => {
            unsubscribe();
        };
    }, [navigate, isNewUser]);
    return (
        <AuthContext.Provider
            value={{
                user,
                navigate,
                isNewUser,
                setIsNewUser,
            }}
        >
            {loading ? <h2 className='loading'>Loading....</h2> : children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
