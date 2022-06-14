import classNames from "classnames/bind";
import style from "./Loading.module.scss";

const cx = classNames.bind(style);

const Loading = ({
    style,
    color = "primary",
    size = "medium",
    className,
    type = "circle",
    speed = "3",
}) => {
    const classes = cx("loading", {
        [className]: className,
        [type]: type,
        [size]: size,
        [color]: color,
        [`speed-${speed}`]: speed,
    });
    return <span className={classes} style={style}></span>;
};
export default Loading;
