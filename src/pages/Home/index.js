import classNames from "classnames/bind";
import style from "./Home.module.scss";
import Welcome from "../WelCome";
import { memo, useContext } from "react";
import { AppContext } from "../../Context/AppProvider";
import Chat from "../Chat";
import { AuthContext } from "../../Context/AuthProvider";
import Header from "./Header";
import Content from "./Content";

const cx = classNames.bind(style);

const Home = () => {
    const { moveToChat } = useContext(AppContext);
    const { isNewUser } = useContext(AuthContext);

    return (
        <>
            {isNewUser ? (
                <Welcome />
            ) : (
                <>
                    {!moveToChat ? (
                        <div className={cx("wrapper")}>
                            <Header />
                            <Content />
                        </div>
                    ) : (
                        <Chat />
                    )}
                </>
            )}
        </>
    );
};

export default memo(Home);
