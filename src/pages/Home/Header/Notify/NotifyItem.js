import classNames from "classnames/bind";
import style from "./Notify.module.scss";
import Avatar from "../../../../components/Avatar";
import { memo } from "react";
import {
    doc,
    updateDoc,
    arrayUnion,
    setDoc,
    arrayRemove,
} from "firebase/firestore";
import { db } from "../../../../fireabse/config";
const cx = classNames.bind(style);

const NotifyItem = ({ notify, index, notifyList, userData }) => {
    const userRef = doc(db, "user", userData.uid);
    const hanldeClose = async () => {
        try {
            await updateDoc(userRef, {
                notify: arrayRemove(notifyList[index]),
            });
        } catch (error) {
            alert("Error! An error occurred. Please try again later.");
        }
    };
    const handleAllow = async () => {
        const friendRef = doc(db, "user", notify.uid);
        try {
            const convertIdToNumber = (id1, id2) => {
                const idLength = id1.length;
                let count1 = 0;
                let count2 = 0;
                for (let i = 0; i <= idLength - 1; i++) {
                    count1 += id1[i].charCodeAt(0);
                    count2 += id2[i].charCodeAt(0);
                }
                return count1 * count2;
            };
            const idChatRoom =
                convertIdToNumber(notify.uid, userData.uid) * 2222;

            // add user for user friend in database
            await updateDoc(friendRef, {
                friends: arrayUnion({
                    userName: userData.userName,
                    uid: userData.uid,
                    photoURL: userData.photoURL,
                    id: userData.id,
                    gender: userData.gender,
                    chatId: JSON.stringify(idChatRoom),
                    email: userData.email,
                }),
            });

            // add firend for user in database
            await updateDoc(userRef, {
                friends: arrayUnion({
                    userName: notify.userName,
                    uid: notify.uid,
                    photoURL: notify.photoURL,
                    id: notify.id,
                    gender: notify.gender,
                    chatId: JSON.stringify(idChatRoom),
                    email: notify.email,
                }),
            });

            // create chats doc

            const chatData = { messList: [] };

            const chatRef = doc(db, "chats", JSON.stringify(idChatRoom));

            await setDoc(chatRef, chatData);
        } catch (error) {
            alert("Error! An error occurred. Please try again later.");
            console.log(error);
            return;
        }

        hanldeClose();
    };
    const handeRefuse = () => {
        hanldeClose();
    };
    return (
        <li className={cx("notify-item")}>
            {notify.type !== "boolean" && (
                <div className={cx("notify-btn-close")} onClick={hanldeClose}>
                    <ion-icon name='close'></ion-icon>
                </div>
            )}
            <div className={cx("notify-content")}>
                <div className={cx("notify-user-info")}>
                    <Avatar
                        src={notify.photoURL}
                        size='small'
                        gender={notify.gender}
                    />
                    <div>{notify.userName}</div>
                </div>
                <p>{notify.notify}</p>
            </div>
            {notify.type === "boolean" && (
                <div className={cx("notify-control")}>
                    <span className={cx("notify--allow")} onClick={handleAllow}>
                        <ion-icon name='checkmark-circle'></ion-icon>
                    </span>
                    <span
                        className={cx("notify--refuse")}
                        onClick={handeRefuse}
                    >
                        <ion-icon name='close-circle'></ion-icon>
                    </span>
                </div>
            )}
        </li>
    );
};

export default memo(NotifyItem);
