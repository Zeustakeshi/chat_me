import classNames from "classnames/bind";
import { memo, useState } from "react";

import imgs from "../../assets/images";
import style from "./Avatar.module.scss";

const cx = classNames.bind(style);

const Avatar = ({
    gender = "male",
    src,
    size = "medium",
    className,
    alt,
    onClick,
    ...props
}) => {
    const [failImg, setFailImg] = useState("");
    const handleError = () => {
        if (gender === "male") {
            setFailImg(imgs.male_icon);
        } else {
            setFailImg(imgs.female_icon);
        }
    };
    const classes = cx("avatar", {
        [className]: className,
        [size]: size,
        [`g-${gender}`]: gender,
    });

    if (!src && gender === "male") {
        src = imgs.male_icon;
    } else if (!src) {
        src = imgs.female_icon;
    }

    return (
        <img
            // ref={ref}
            src={failImg || src}
            alt={alt}
            {...props}
            onError={handleError}
            className={classes}
            onClick={onClick}
        />
    );
};

export default memo(Avatar);
