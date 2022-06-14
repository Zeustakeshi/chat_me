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
} from "firebase/firestore";

const cx = classNames.bind(style);
function AddFriend({ userData }) {
    const [show, setShow] = useState(false);
    const [input, setInput] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input && show) {
            alert("please enter your friend's id");
            return;
        }

        /////
        // const curentUserRef = doc(db, "user", JSON.stringify(userData.uid));
        const userRef = collection(db, "user");
        const q = query(userRef, where("id", "==", input));
        const querySnapshot = await getDocs(q);
        const friendData = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            friendData.push(doc.data());
        });
        if (friendData.length !== 1) {
            alert("invalid id, please check id again!");
            return;
        } else {
            const frirendRef = friendData[0].id;

            await updateDoc(frirendRef, {
                notify: {
                    gender: userData.gender,
                    photoURL: userData.photoURL,
                    userName: userData.userName,
                    type: "boolean",
                    notify: `👋Hello!👋  
                    Can you make friends with me?`,
                },
            });
        }
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
