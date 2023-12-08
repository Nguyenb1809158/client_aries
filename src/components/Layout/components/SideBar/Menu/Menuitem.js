import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
import styles from './Menu.module.scss'
const cx = classNames.bind(styles)
function Menuitem( {title, to ,icon} ) {
    return (
        <NavLink to={to} className={(nav)=> cx('menu-item',{active: nav.isActive})}>
            <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
            <span className={cx('title')}>{title}</span>
        </NavLink>
    );
}

export default Menuitem;