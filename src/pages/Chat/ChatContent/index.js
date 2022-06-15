import classNames from "classnames/bind";
import style from "./ChatContent.module.scss";
import React, { memo, useContext } from "react";
import InputChatContent from "./InputChatContent";
import { AppContext } from "../../../Context/AppProvider";
import useFireStore from "../../../hooks/useFirestore";
import MessItem from "./MessItem";

const cx = classNames.bind(style);

function ChatContent() {
    const { userFriendData } = useContext(AppContext);
    const { messList } = useFireStore("chats", userFriendData.chatId, []) || [];
    return (
        <div className={cx("wrapper")}>
            <div className={cx("content")}>
                <ul className={cx("mess-list")}>
                    {!messList ? (
                        <span>no mess</span>
                    ) : (
                        messList.map((mess, index) => {
                            return (
                                <MessItem
                                    key={index}
                                    userFriendData={userFriendData}
                                    mess={mess}
                                />
                            );
                        })
                    )}
                </ul>
            </div>
            <InputChatContent className={cx("input-content")} />
        </div>
    );
}

export default memo(ChatContent);
