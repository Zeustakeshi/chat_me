import React, { memo, useContext, useRef, useState } from "react";
import classNames from "classnames/bind";
import style from "./ChatContent.module.scss";
import { AppContext } from "../../../Context/AppProvider";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../../fireabse/config";

const cx = classNames.bind(style);

function InputChatContent({ className }) {
    const { userFriendData, userData } = useContext(AppContext);
    const [input, setInput] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);

    const inputRef = useRef();

    const getCurRentTime = () => {
        const currentTime = new Date();
        const time = `${
            currentTime.getHours() < 10
                ? `0${currentTime.getHours()}`
                : currentTime.getHours()
        }:${
            currentTime.getMinutes() < 10
                ? `0${currentTime.getMinutes()}`
                : currentTime.getMinutes()
        }:${
            currentTime.getSeconds() < 10
                ? `0${currentTime.getSeconds()}`
                : currentTime.getSeconds()
        }`;

        return time;
    };
    const addChats = async (data) => {
        const chatRef = doc(db, "chats", userFriendData.chatId);

        try {
            await updateDoc(chatRef, {
                messList: arrayUnion(data),
            });
        } catch (error) {
            alert("plaese try again!");
        }
    };

    const handleLike = () => {
        setIsSubmit(false);

        addChats({
            id: userData.id,
            mess: "like",
            time: getCurRentTime(),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isSubmit || input.trim() === "") return;

        addChats({
            id: userData.id,
            mess: input,
            time: getCurRentTime(),
        });
        setInput("");
        inputRef.current.focus();
    };

    return (
        <form className={className} onSubmit={handleSubmit}>
            <input
                ref={inputRef}
                placeholder='Aa'
                value={input}
                onChange={(e) => {
                    setInput(e.target.value);
                }}
            />

            {input ? (
                <button
                    className={cx("btn-send")}
                    onClick={() => {
                        setIsSubmit(true);
                    }}
                >
                    <ion-icon name='send-sharp'></ion-icon>
                </button>
            ) : (
                <button className={cx("btn-like")} onClick={handleLike}>
                    <ion-icon name='heart-circle-outline'></ion-icon>
                </button>
            )}
        </form>
    );
}

export default memo(InputChatContent);
