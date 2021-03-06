import classNames from "classnames/bind";
import Avatar from "../Avatar";
import style from "./MenuProfile.module.scss";
import { memo } from "react";

const cx = classNames.bind(style);
const MenuProfile = ({ userData, className, setShow, children }) => {
    return (
        <div
            className={cx("menu", {
                [className]: className,
            })}
        >
            <div
                className={cx("menu-btn-close")}
                onClick={(e) => {
                    setShow(false);
                }}
            >
                <ion-icon name='close'></ion-icon>
            </div>
            <div className={cx("menu-header")}>
                <Avatar
                    src={userData.photoURL}
                    size='large'
                    gender={userData.gender}
                />
                <h4 className={cx("menu-user-name")}>{userData.userName}</h4>
                <p className={cx("menu-user-id")}>#{userData.id}</p>
            </div>
            <div className={cx("menu-user-info")}>
                <p className={cx("user-email")}>
                    <span>Email: </span>
                    {userData.email}
                </p>
                <p className={cx("user-gender")}>
                    <span>Gender: </span>
                    {userData.gender}
                </p>
            </div>
            {children}
        </div>
    );
};

export default memo(MenuProfile);
