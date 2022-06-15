import classNames from "classnames/bind";
import style from "./ChatHeader.module.scss";
import { memo, useContext, useState } from "react";
import { AppContext } from "../../../Context/AppProvider";
import Avatar from "../../../components/Avatar";
import MenuProfile from "../../../components/MenuProfile";
import Button from "../../../components/Button";
import { doc, deleteDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "../../../fireabse/config";

const cx = classNames.bind(style);
function ChatHeader() {
    const [showMenu, setShowMenu] = useState(false);

    const { setMoveToChat, userFriendData, userData } = useContext(AppContext);
    const handleMoveToHome = () => {
        setMoveToChat(false);
    };

    // handle un-friend

    const handleUnFriend = async () => {
        const userRef = doc(db, "user", userData.uid);
        const userFriendRef = doc(db, "user", userFriendData.uid);

        try {
            await deleteDoc(doc(db, "chats", userFriendData.chatId));

            await updateDoc(userRef, {
                friends: arrayRemove(userFriendData),
            });

            await updateDoc(userFriendRef, {
                friends: arrayRemove({
                    chatId: userFriendData.chatId,
                    email: userData.email,
                    gender: userData.gender,
                    id: userData.id,
                    photoURL: userData.photoURL,
                    uid: userData.uid,
                    userName: userData.userName,
                }),
            });
            setMoveToChat(false);
        } catch (error) {
            alert("error! Can't unFriend this user, plase try again.");
        }
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("btn-prev")} onClick={handleMoveToHome}>
                <ion-icon name='arrow-back'></ion-icon>
            </div>
            <Avatar
                gender={userFriendData.gender}
                src={userFriendData.photoURL}
                onClick={() => {
                    setShowMenu(true);
                }}
                className={cx("avatar")}
            />
            <div className={cx("name")}>{userFriendData.userName}</div>
            {showMenu && (
                <MenuProfile
                    userData={userFriendData}
                    setShow={setShowMenu}
                    className={cx("menu-profile-chat")}
                >
                    <Button
                        type='warning'
                        className={cx("btn-un-friend")}
                        onClick={handleUnFriend}
                    >
                        UnFirend
                    </Button>
                </MenuProfile>
            )}
        </div>
    );
}

export default memo(ChatHeader);
