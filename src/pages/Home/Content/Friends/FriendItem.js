import classNames from "classnames/bind";
import { memo, useContext, useState } from "react";
import Avatar from "../../../../components/Avatar";
import { AppContext } from "../../../../Context/AppProvider";
import style from "./Friends.module.scss";

const cx = classNames.bind(style);

function FriendItem({ friend }) {
    const { setMoveToChat, setUserFriendData } = useContext(AppContext);
    const handleMoveToChat = () => {
        setMoveToChat(true);
        setUserFriendData({
            userName: friend.userName,
            photoURL: friend.photoURL,
            chatId: friend.chatId,
            gender: friend.gender,
            email: friend.email,
            id: friend.id,
            uid: friend.uid,
        });
    };

    const handleDeleteChat = () => {
        setMoveToChat(false);
    };
    return (
        <li className={cx("friend-item")}>
            <div className={cx("friend-item-content")}>
                <Avatar
                    src={friend.photoURL}
                    gender={friend.gender}
                    size='msmall'
                />
                <div
                    className={cx("friend-item-mess")}
                    onClick={handleMoveToChat}
                >
                    <div className={cx("friend-name")}>{friend.userName}</div>
                    <div
                        className={cx("friend-mess", {
                            ["is-new"]: friend.isNew,
                        })}
                    >
                        {friend.mess}
                    </div>
                </div>
                <div className={cx("friend-remove")} onClick={handleDeleteChat}>
                    <ion-icon name='trash-sharp'></ion-icon>
                </div>
            </div>
        </li>
    );
}
export default memo(FriendItem);
