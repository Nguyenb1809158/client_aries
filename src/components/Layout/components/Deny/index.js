import { faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from './Deny.module.scss'
const cx = classNames.bind(styles)
function Deny() {
    return ( <div className={cx('wrapper')}>
        <p className={cx('title')}>Bạn không có quyền truy cập tài nguyên này , hãy thử với loại tài khoản khác</p>
        <div className={cx('container-ban')}>
        <FontAwesomeIcon icon={faBan} className={cx('ban')} ></FontAwesomeIcon>
        </div>
        
    </div> );
}

export default Deny;