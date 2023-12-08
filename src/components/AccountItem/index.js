import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from './AccountItem.module.scss'
import { Link } from "react-router-dom";
const cx = classNames.bind(styles)
function AccountItem({data}) {
    return ( 
    <Link to={`/product/${data._id}`} className={cx('wrapper')}>
        <img className={cx('avatar')} src={data.imageUrl[0]} alt="avatar" />
        <div className={cx('info')}>
            <h4 className={cx('name')}>
                <span>{data.name}</span>
                <FontAwesomeIcon icon={faCheckCircle} className={cx('check')}></FontAwesomeIcon>
            </h4>
            <span className={cx('username')}>{data.price}</span>
        </div>
    </Link> 
    );
}

export default AccountItem;