import classNames from "classnames/bind";
import { useContext } from "react";
import style from "./Content.module.scss";
import { AppContext } from "../../../Context/AppProvider";
import Search from "./Search";
import Friends from "./Friends";
import AddFriend from "./AddFriend";

const cx = classNames.bind(style);

const Content = () => {
    const { userData } = useContext(AppContext);
    return (
        <div className={cx("content")}>
            <Search userData={userData} />
            <Friends userData={userData} />

            <AddFriend userData={userData} />
        </div>
    );
};

export default Content;
