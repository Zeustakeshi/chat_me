import classNames from "classnames/bind";
import style from "./Friends.module.scss";
import FriendItem from "./FriendItem";

const cx = classNames.bind(style);
export default function Friends({ userData }) {
    const friends = userData.friends;

    return (
        <div className={cx("wrapper")}>
            <div className={cx("title")}>Friends</div>
            <ul className={cx("friend-list")}>
                {friends && friends.length !== 0 ? (
                    friends.map((friend, index) => (
                        <FriendItem key={index} friend={friend} />
                    ))
                ) : (
                    <div className={cx("friend-title")}>no friend</div>
                )}
            </ul>
        </div>
    );
}
