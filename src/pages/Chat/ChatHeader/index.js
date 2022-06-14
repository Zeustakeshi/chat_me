import classNames from "classnames/bind";
import style from "./ChatHeader.module.scss";
import { memo, useContext } from "react";
import { AppContext } from "../../../Context/AppProvider";
import Avatar from "../../../components/Avatar";

const cx = classNames.bind(style);
function ChatHeader() {
    const { setMoveToChat, userFriendData } = useContext(AppContext);
    const handleMoveToHome = () => {
        setMoveToChat(false);
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("btn-prev")} onClick={handleMoveToHome}>
                <ion-icon name='arrow-back'></ion-icon>
            </div>
            <Avatar
                gender={userFriendData.gender}
                src={userFriendData.photoURL}
            />
            <div className={cx("name")}>{userFriendData.userName}</div>
            {/* menu profile user friend */}
        </div>
    );
}

export default memo(ChatHeader);
