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
                uid: user.uid,

                notify: [
                    {
                        userName: "Minh Hiếu",
                        gender: "male",
                        photoURL:
                            "https://s120-ava-talk.zadn.vn/3/5/5/3/1/120/288cef578202ea573aa2403a70ce5a0a.jpg",
                        notify: `😍 Let's start with your first message 😍.`,
                        type: null,
                        uid: "sfsdfdsfsdfsdfs",
                    },
                    {
                        userName: "Minh Hiếu",
                        photoURL:
                            "https://s120-ava-talk.zadn.vn/3/5/5/3/1/120/288cef578202ea573aa2403a70ce5a0a.jpg",
                        gender: "male",
                        notify: `👋Hello!👋  
                        well come to Chat me.`,
                        type: null,
                        uid: "saasdasdasdasdas",
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
