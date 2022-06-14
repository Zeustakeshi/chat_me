import { memo, useContext } from "react";
import classNames from "classnames/bind";
import style from "./Chat.module.scss";
import ChatHeader from "./ChatHeader";

const cx = classNames.bind(style);

const Chat = () => {
    return (
        <div className={cx("wrapper")}>
            <ChatHeader />
        </div>
    );
};

export default memo(Chat);
