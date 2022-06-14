import Avatar from "../../../../components/Avatar";
import classNames from "classnames/bind";
import style from "./Search.module.scss";
import { useContext } from "react";
import { AppContext } from "../../../../Context/AppProvider";

const cx = classNames.bind(style);
const SearchResult = ({ results, searchValue }) => {
    const { setUserFriendData, setMoveToChat } = useContext(AppContext);
    const handleMoveToChat = (result) => {
        setMoveToChat(true);
        setUserFriendData({
            userName: result.userName,
            photoURL: result.photoURL,
            chatId: result.chatId,
            gender: result.gender,
        });
    };
    return (
        <ul className={cx("result-list")}>
            {results.length === 0 && searchValue !== "" ? (
                <div className={cx("result-title")}>no result</div>
            ) : (
                results.map((result, index) => (
                    <li
                        key={index}
                        className={cx("result-item")}
                        onClick={() => {
                            handleMoveToChat(result);
                        }}
                    >
                        <Avatar
                            src={result.photoURL}
                            size='small'
                            gender={result.gender && result.gender}
                        />
                        <div className={cx("result-name")}>
                            {result.userName}
                        </div>
                        {result.isGroup && (
                            <div>
                                <ion-icon name='people'></ion-icon>
                            </div>
                        )}
                    </li>
                ))
            )}
        </ul>
    );
};

export default SearchResult;
