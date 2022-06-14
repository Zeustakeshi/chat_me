import classNames from "classnames/bind";
import { memo } from "react";
import Avatar from "../../../../components/Avatar";
import style from "./Friends.module.scss";

const cx = classNames.bind(style);

function FriendItem({ friend }) {
    return (
        <li className={cx("friend-item")}>
            <div className={cx("friend-item-content")}>
                <Avatar
                    src={friend.photoURL}
                    gender={friend.gender}
                    size='msmall'
                />
                <div className={cx("friend-item-mess")}>
                    <div className={cx("friend-name")}>{friend.userName}</div>
                    <div
                        className={cx("friend-mess", {
                            ["is-new"]: friend.isNew,
                        })}
                    >
                        {friend.mess}
                    </div>
                </div>
                <div className={cx("friend-remove")}>
                    <ion-icon name='trash-sharp'></ion-icon>
                </div>
            </div>
        </li>
    );
}
export default memo(FriendItem);
