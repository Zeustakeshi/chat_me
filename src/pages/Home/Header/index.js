import classNames from "classnames/bind";
import { memo, useContext, useEffect, useState } from "react";
import Avatar from "../../../components/Avatar";
import style from "./Header.module.scss";
import { AppContext } from "../../../Context/AppProvider";
import MenuProfile from "./MenuProfile";
import Notify from "./Notify";

const cx = classNames.bind(style);
const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [showNotify, setShowNotify] = useState(false);
    const [isNotify, setIsNotify] = useState(false);
    const { userData } = useContext(AppContext);
    const userName =
        userData.userName.length < 30
            ? userData.userName
            : userData.userName.slice(0, 30) + "...";

    useEffect(() => {
        setIsNotify(true);
    }, [userData.notify]);
    return (
        <div className={cx("wrapper")}>
            <div className={cx("user-info")}>
                <Avatar
                    gender={userData.gender}
                    src={userData.photoURL}
                    className={cx("avatar")}
                    onClick={() => {
                        setShowMenu(true);
                    }}
                />
                <h2>{userName}</h2>
            </div>
            <div
                className={cx("notify-btn", {
                    [`notify-btn-noti`]: isNotify,
                })}
                onClick={() => {
                    setShowNotify(true);
                    setIsNotify(false);
                }}
            >
                <ion-icon name='notifications'></ion-icon>
            </div>

            {showMenu && (
                <MenuProfile
                    userData={{
                        ...userData,
                        userName: userName,
                    }}
                    setShow={setShowMenu}
                />
            )}
            {showNotify && (
                <Notify
                    userData={{
                        ...userData,
                        userName: userName,
                    }}
                    setShow={setShowNotify}
                />
            )}
        </div>
    );
};

export default memo(Header);
