import classNames from "classnames/bind";
import style from "./Notify.module.scss";
import Avatar from "../../../../components/Avatar";
import { memo } from "react";
const cx = classNames.bind(style);

const NotifyItem = ({ type, photoURL, userName, notify, gender }) => {
    return (
        <li className={cx("notify-item")}>
            {type !== "boolean" && (
                <div className={cx("notify-btn-close")}>
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
                    <span className={cx("notify--allow")}>
                        <ion-icon name='checkmark-circle'></ion-icon>
                    </span>
                    <span className={cx("notify--refuse")}>
                        <ion-icon name='close-circle'></ion-icon>
                    </span>
                </div>
            )}
        </li>
    );
};

export default memo(NotifyItem);
