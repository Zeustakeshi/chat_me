import { memo, useState } from "react";
import classNames from "classnames/bind";
import style from "./AddFriend.module.scss";
import Button from "../../../../components/Button";
import { db } from "../../../../fireabse/config";
import {
    doc,
    getDocs,
    collection,
    query,
    where,
    updateDoc,
    arrayUnion,
} from "firebase/firestore";

const cx = classNames.bind(style);
function AddFriend({ userData }) {
    const [show, setShow] = useState(false);
    const [input, setInput] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        let isFriend = false;

        if (!input && show) {
            alert("please enter your friend's id");
            return;
        } else if (input === userData.id) {
            alert("you can't make friends with yourself.");
            setInput("");
            return;
        } else if (userData.friends) {
            userData.friends.forEach((ele) => {
                if (ele.id === input) {
                    alert("have been friends 😍");
                    isFriend = true;
                    setInput("");
                    return;
                }
            });
        }
        if (isFriend) return;
        /////
        // find user id in database
        const userRef = collection(db, "user");
        const q = query(userRef, where("id", "==", input));
        const querySnapshot = await getDocs(q);
        const friendData = [];
        querySnapshot.forEach((doc) => {
            friendData.push(doc.data());
        });

        // send notify
        if (friendData.length !== 1) {
            alert("invalid id, please check id again!");
            return;
        } else {
            const friendRef = doc(db, "user", friendData[0].uid);
            try {
                await updateDoc(friendRef, {
                    notify: arrayUnion({
                        gender: userData.gender,
                        photoURL: userData.photoURL,
                        userName: userData.userName,
                        uid: userData.uid,
                        id: userData.id,
                        type: "boolean",
                        notify: `Hello!👋👋
                        Can you make friends with me?`,
                    }),
                });
                alert("waiting for your friend agree...");
            } catch (error) {
                alert(
                    "Error! An error occurred. Please check id and try again later!"
                );
            }
        }

        setInput("");
        ////
    };

    return (
        <div
            className={cx("wrapper", {
                ["is-show"]: show,
            })}
        >
            <div
                className={cx("btn-toggle")}
                onClick={() => {
                    setShow(!show);
                }}
            >
                <div>
                    {!show ? (
                        <ion-icon name='add'></ion-icon>
                    ) : (
                        <ion-icon name='arrow-down'></ion-icon>
                    )}
                </div>
            </div>
            <form
                onSubmit={handleSubmit}
                className={cx("form", {
                    ["is-show"]: show,
                })}
            >
                <div className={cx("add-input")}>
                    <input
                        placeholder='#'
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                        }}
                    />
                </div>
                <Button className={cx("btn-add")} onlyIcon size='small'>
                    <ion-icon name='person-add'></ion-icon>
                </Button>
            </form>
        </div>
    );
}

export default memo(AddFriend);
