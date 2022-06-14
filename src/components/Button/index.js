import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import style from "./Button.module.scss";

const cx = classNames.bind(style);
function Button({
    to,
    href,
    children,
    type = "primary",
    rounded = false,
    disabled = false,
    size = "medium",
    leftIcon,
    onlyIcon,
    rightIcon,
    className,
    onClick,
    ...passProps
}) {
    const props = {
        onClick,
        ...passProps,
    };
    const classes = cx("wrapper", {
        [className]: className,
        [type]: type,
        [size]: size,
        disabled,
        rounded,
    });
    let Component = "button";
    if (to) {
        Component = Link;
        props.to = to;
    } else if (href) {
        props.href = href;
        Component = "a";
    }

    // remove event listeners when button is disabled
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith("on") && typeof props[key] === "function") {
                delete props[key];
            }
        });
    }
    return (
        <Component className={classes} {...props}>
            {onlyIcon ? (
                <span className={cx("only-icon")}>{children}</span>
            ) : (
                <>
                    {leftIcon && <span className={cx("icon")}>{leftIcon}</span>}
                    {<span className={cx("title")}>{children}</span>}
                    {rightIcon && (
                        <span className={cx("icon")}>{rightIcon}</span>
                    )}
                </>
            )}
        </Component>
    );
}

export default Button;
