import classNames from "classnames/bind";

import style from "./Notify.module.scss";

import { memo, useEffect, useState } from "react";
import NotifyItem from "./NotifyItem";

import imgs from "../../../../assets/images";

const cx = classNames.bind(style);
const Notifi = ({ userData, className, setShow }) => {
    const [notifyList, setNotifyList] = useState([]);
    useEffect(() => {
        setNotifyList([...userData.notify].reverse());
    }, [userData.notify]);
    return (
        <div
            className={cx("notify", {
                [className]: className,
            })}
        >
            <div
                className={cx("notify-btn-close")}
                onClick={() => {
                    setShow(false);
                }}
            >
                <ion-icon name='close'></ion-icon>
            </div>
            <div className={cx("notify-header")}>
                <h2>Notifications</h2>
            </div>
            <div className={cx("notify-body")}>
                <ul className={cx("notifys")}>
                    {notifyList.length === 0 ? (
                        <div className={cx("notify-no-noti-icon")}>
                            <img src={imgs.notify_icon} />
                            <p>No Notifications</p>
                        </div>
                    ) : (
                        notifyList.map((notify, index) => (
                            <NotifyItem
                                key={index}
                                index={index}
                                notifyList={notifyList}
                                type={notify.type}
                                photoURL={notify.photoURL}
                                notify={notify.notify}
                                userName={notify.userName}
                                gender={notify.gender}
                                userData={userData}
                                friendUId={notify.uid}
                                friendId={notify.id}
                                friendGender={notify.gender}
                            />
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default memo(Notifi);
