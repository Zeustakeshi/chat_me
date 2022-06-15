import { memo, useContext } from "react";
import classNames from "classnames/bind";
import style from "./Chat.module.scss";
import ChatHeader from "./ChatHeader";
import ChatContent from "./ChatContent";

const cx = classNames.bind(style);

const Chat = () => {
    return (
        <div className={cx("wrapper")}>
            <ChatHeader />
            <ChatContent />
        </div>
    );
};

export default memo(Chat);
