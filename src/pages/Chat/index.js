import { memo, useContext } from "react";
import Button from "../../components/Button";
import { AppContext } from "../../Context/AppProvider";

const Chat = () => {
    const { setMoveToChat } = useContext(AppContext);
    const handleMoveToHome = () => {
        setMoveToChat(false);
    };
    return (
        <div>
            Chat page
            <Button onClick={handleMoveToHome}>move to home pages</Button>
        </div>
    );
};

export default memo(Chat);
