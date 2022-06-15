import React, { useContext, useEffect } from "react";
import classNames from "classnames/bind";
import style from "./ChatContent.module.scss";
import { AppContext } from "../../../Context/AppProvider";
import Avatar from "../../../components/Avatar";
import imgs from "../../../assets/images";

const cx = classNames.bind(style);

function MessItem({ userFriendData, mess }) {
    const { userData } = useContext(AppContext);
    const isUser = mess.id === userData.id;
    const messItemRef = React.useRef();

    useEffect(() => {
        messItemRef.current.scrollIntoView({ behavior: "smooth" });
    }, [mess]);

    return (
        <li
            className={cx("mess-item", {
                ["is-user"]: isUser,
            })}
            ref={messItemRef}
        >
            {!isUser && (
                <Avatar
                    size='small'
                    src={userFriendData.photoURL}
                    gender={userFriendData.gender}
                />
            )}
            <div className={cx("mess-content")}>
                <span className={cx("mess-timestamp", { ["is-user"]: isUser })}>
                    {mess.time.slice(0, 5)}
                </span>
                {mess.mess === "like" ? (
                    <span>
                        <img src={imgs.happy_icon} />
                    </span>
                ) : (
                    <div>{mess.mess}</div>
                )}
            </div>
        </li>
    );
}

export default React.memo(MessItem);
