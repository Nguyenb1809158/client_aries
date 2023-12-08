import { faCss3, faFacebook, faGripfire, faHtml5, faInstagram, faJs, faNodeJs, faReact, faTiktok, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import {  faFontAwesome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from './footer.module.scss'
const cx = classNames.bind(styles)
function Footer() {
    return ( 
        <div className={cx('content')}>
            <div>
            <div className={cx('footer-main')}>
            <div className={cx('contact')}>
                <ul className={cx('list')}>
                    <li><p className={cx('title')}>Chăm sóc Khách Hàng</p></li>
                    <li><Link>Trung Tâm Trợ Giúp</Link></li>
                    <li><Link>Liên Hệ Đổi Trả</Link></li>
                    <li><Link>Góp Ý Cho Chúng Tôi</Link></li>
                </ul>
            </div>
            <div className={cx('introduction')}>
                <ul className={cx('list')}>
                    <li><p className={cx('title')}>Giới Thiệu</p></li>
                    <li><Link>Về chúng tôi</Link></li>
                    <li><Link>Tuyển dụng</Link></li>
                    <li><Link>Quy định</Link></li>
                </ul>
            </div>
            <div className={cx('list-type')}>
                <ul className={cx('list')}>
                    <li><p className={cx('title')}>Danh Mục Sản Phẩm</p></li>
                    <li><Link>Áo / Áo khoác</Link></li>
                    <li><Link>Ví</Link></li>
                    <li><Link>Balo / Túi đeo</Link></li>
                    <li><Link></Link>Kính mát</li>
                    <li><Link></Link>Nón</li>
                </ul>
            </div>
            <div className={cx('follow-logo')}>
                <ul className={cx('list')}>
                    <li><p className={cx('title')}>Theo Dõi Chúng Tôi Qua </p></li>
                    <li>
                        <div>
                            <Link><FontAwesomeIcon icon={faTiktok} className={cx('logo-item')}></FontAwesomeIcon></Link>
                            <Link><FontAwesomeIcon icon={faTwitter} className={cx('logo-item')} ></FontAwesomeIcon></Link>
                            <Link><FontAwesomeIcon icon={faFacebook} className={cx('logo-item')} ></FontAwesomeIcon></Link>
                            <Link><FontAwesomeIcon icon={faYoutube} className={cx('logo-item')}></FontAwesomeIcon></Link>
                            <Link><FontAwesomeIcon icon={faInstagram} className={cx('logo-item')} ></FontAwesomeIcon></Link>
                        </div>
                    </li>
                </ul>
            </div>
            <div className={cx('logo-group')}>
                <img className={cx('logo')} alt='logo' src={require('~/assets/img/logo.webp')}></img>
                <p className={cx('title')}>Aries Shop</p>
                <h5>Men's Sport & Trending Fashion</h5>
            </div>
         </div>
            </div>
        
         <div className={cx('technologies')}>
            <span>Aries Shop Made With </span>
            <FontAwesomeIcon icon={faHtml5} className={cx('tech-logo-item')} ></FontAwesomeIcon>
            <FontAwesomeIcon icon={faCss3} className={cx('tech-logo-item')} ></FontAwesomeIcon>
            <FontAwesomeIcon icon={faJs} className={cx('tech-logo-item')} ></FontAwesomeIcon>
            <FontAwesomeIcon icon={faNodeJs} className={cx('tech-logo-item')} ></FontAwesomeIcon>
            <FontAwesomeIcon icon={faReact} className={cx('tech-logo-item')} ></FontAwesomeIcon>
            <FontAwesomeIcon icon={faFontAwesome} className={cx('tech-logo-item')} ></FontAwesomeIcon>
            <span>And 100%</span>
            <FontAwesomeIcon icon={faGripfire} className={cx('fire','tech-logo-item')} ></FontAwesomeIcon>
         </div>
         <h4 className={cx('nguyen')}>Powered by Nguyen</h4>
    </div>

    
     );
}

export default Footer;