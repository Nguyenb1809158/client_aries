import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from './Button.module.scss'
const cx = classNames.bind(styles)
//primary outline la loai button khi truyen vao cai nao thi cai do se dc su dung
function Button({to , href , onClick, children,passProps
    ,primary=false
    ,green=false
    ,red=false
    ,blue=false
    ,gray=false
    ,orange=false
    ,outline=false
    ,small=false
    ,large=false
    ,disabled=false
    ,rounded=false
    ,className
    ,Icon}) {
    let Comp = 'button'
    const props = {
        onClick,
        ...passProps,
    }
    if(disabled){
        delete props.onClick
    }
    if(to){
        props.to = to
        Comp = Link
    }
    else if(href){
        props.href = href
        Comp = 'a'
    }
    const classes = cx('wrapper',{
        primary,
        green,
        red,
        blue,
        gray,
        orange,
        outline,
        small,
        large,
        disabled,
        rounded,
        [className]:className
    })
    return (
        <Comp className={classes} {...props}>
        {Icon && <span className={cx('icon')}>{Icon}</span>}
        <span className={cx('title')}>{children}</span>
        </Comp>
           );
}

export default Button;