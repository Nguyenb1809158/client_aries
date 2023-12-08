import Header from "~/components/Layout/components/Header";
import Footer from "../components/Footer";
import styles from './Headeronly.module.scss'
import classNames from "classnames/bind";
const cx = classNames.bind(styles)
function DefaultLayout({children}) {
    return ( 
        <div>
            <div>
            <Header></Header>
            </div>
            <div className={cx('body')}>{children}</div>
            <div>
            <Footer></Footer>
            </div>
        </div>
     );
}

export default DefaultLayout;