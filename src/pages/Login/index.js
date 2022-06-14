import classNames from "classnames/bind";

import style from "./Login.module.scss";
import imgs from "../../assets/images";
import Button from "../../components/Button";
import {
    auth,
    ggProvider,
    signInWithPopup,
    doc,
    db,
    setDoc,
} from "../../fireabse/config";

import { AuthContext } from "../../Context/AuthProvider";
import { useContext } from "react";

const cx = classNames.bind(style);
const Login = () => {
    const { setIsNewUser } = useContext(AuthContext);

    const hanldeClick = async () => {
        const data = await signInWithPopup(auth, ggProvider);
        const isNewUser = data._tokenResponse.isNewUser;
        setIsNewUser(isNewUser);
        const user = data.user;

        if (isNewUser) {
            const id = user.uid.slice(4, 14);
            const userData = {
                userName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                gender: "",
                friends: [],
                groups: [],
                chats: [],
                id: id,
                notify: [
                    {
                        userName: "Minh Hiếu",
                        gender: "male",
                        photoURL: "",
                        notify: `😍 Let's start with your first message 😍.`,
                        type: null,
                    },
                    {
                        userName: "Minh Hiếu",
                        photoURL: "",
                        gender: "male",
                        notify: `👋Hello!👋  
                        well come to Chat me.`,
                        type: null,
                    },
                ],

                notify: [
                    {
                        userName: "Minh Hiếu",
                        gender: "male",
                        photoURL: "",
                        notify: `😍 Let's start with your first message 😍.`,
                        type: null,
                    },
                    {
                        userName: "Minh Hiếu",
                        photoURL: "",
                        gender: "male",
                        notify: `👋Hello!👋  
                        well come to Chat me.`,
                        type: null,
                    },
                ],

                providerId: data._tokenResponse.providerId,
            };

            await setDoc(doc(db, "user", user.uid), userData);
        }
    };

    return (
        <div className={cx("wrapper")}>
            <img className={cx("icon-chat")} src={imgs.chat_icon} />
            <Button size={"large"} onClick={hanldeClick}>
                Login
            </Button>
        </div>
    );
};

export default Login;
