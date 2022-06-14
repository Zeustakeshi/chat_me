import classNames from "classnames/bind";
import style from "./Notify.module.scss";
import Avatar from "../../../../components/Avatar";
import { memo } from "react";
import { doc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
import { db } from "../../../../fireabse/config";
const cx = classNames.bind(style);

const NotifyItem = ({
    type,
    photoURL,
    userName,
    notify,
    gender,
    index,
    notifyList,
    userData,
    friendId,
    friendUId,
    friendGender,
}) => {
    const userRef = doc(db, "user", userData.uid);
    const hanldeClose = async () => {
        try {
            const newNotitfyList = notifyList.filter(
                (e) => e !== notifyList[index]
            );
            await updateDoc(userRef, { notify: newNotitfyList });
        } catch (error) {
            alert("Error! An error occurred. Please try again later.");
        }
    };
    const handleAllow = async () => {
        const friendRef = doc(db, "user", friendUId);
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
                convertIdToNumber(friendUId, userData.uid) * 2222;

            // add user for user friend in database
            await updateDoc(friendRef, {
                friends: arrayUnion({
                    userName: userData.userName,
                    uid: userData.uid,
                    photoURL: userData.photoURL,
                    id: userData.id,
                    gender: userData.gender,
                    chatId: JSON.stringify(idChatRoom),
                }),
            });

            // add firend for user in database
            await updateDoc(userRef, {
                friends: arrayUnion({
                    userName: userName,
                    uid: friendUId,
                    photoURL: photoURL,
                    id: friendId,
                    gender: friendGender,
                    chatId: JSON.stringify(idChatRoom),
                }),
            });

            // create chats doc

            const chatData = { mess: [] };
            // {
            //     userInfo: {
            //         userName: "",
            //         gender: "",
            //         id: "",
            //         photoURL: "",
            //         uid: "",
            //     },
            //     mess: "",
            // },

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
            {type !== "boolean" && (
                <div className={cx("notify-btn-close")} onClick={hanldeClose}>
                    <ion-icon name='close'></ion-icon>
                </div>
            )}
            <div className={cx("notify-content")}>
                <div className={cx("notify-user-info")}>
                    <Avatar src={photoURL} size='small' gender={gender} />
                    <div>{userName}</div>
                </div>
                <p>{notify}</p>
            </div>
            {type === "boolean" && (
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
