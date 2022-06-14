import classNames from "classnames/bind";
import style from "./Welcome.module.scss";

import { useMemo, useState, useContext } from "react";

import imgs from "../../assets/images";
import Button from "../../components/Button";

import { AuthContext } from "../../Context/AuthProvider";
import { doc, updateDoc, db } from "../../fireabse/config";

const cx = classNames.bind(style);

const Welcome = () => {
    const { user, setIsNewUser } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [checked, setChecked] = useState(0);

    const genderList = useMemo(() => ["male", "female"], []);
    const uid = useMemo(() => user.uid, [user]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name === "") {
            alert("Please enter your name ");
            return;
        }
        const userRef = doc(db, "user", uid);
        const data = {
            userName: name,
            gender: genderList[checked],
        };

        await updateDoc(userRef, data);
        setName("");
        setIsNewUser(false);
        return;
    };
    return (
        <div className={cx("wrapper")}>
            <img className={cx("chat-icon")} alt='icon' src={imgs.chat_icon} />

            <h2 className={cx("title")}>Welcome to Chat Me</h2>

            <form className={cx("form")} onSubmit={handleSubmit}>
                <label className={cx("input-name")}>
                    <span>What's your name?</span>
                    <input
                        placeholder='Enter your name'
                        id='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <div className={cx("input-gender")}>
                    {genderList.map((gender, index) => (
                        <div key={gender}>
                            <input
                                id={index}
                                type='radio'
                                onChange={() => {
                                    setChecked(index);
                                }}
                                checked={checked === index}
                            />
                            <label htmlFor={index}>{gender}</label>
                        </div>
                    ))}
                </div>
                <Button className={cx("btn-continue")}>Continue</Button>
            </form>
        </div>
    );
};

export default Welcome;
