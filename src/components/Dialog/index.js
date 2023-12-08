import classNames from "classnames/bind";
import styles from './Dialog.module.scss'
const cx = classNames.bind(styles)
function Dialog({message}) {
    return ( 
    <div className={cx('wrapper')}>
        <div className={cx('content')}>
            <h2 className={cx('title')}>{message}</h2>
            <h4>Lưu ý việc này không thể hoàn tác nên hãy kiểm tra kỹ trước khi thao tác</h4>
            <div className={cx('btn-container')}>
                <button className={cx('no-btn')}>No</button>
                <button className={cx('yes-btn')}>Yes</button>
            </div>
        </div>
    </div> );
}

export default Dialog;