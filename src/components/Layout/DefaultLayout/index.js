import Header from "~/components/Layout/components/Header";
import SideBar from "../components/SideBar";
import styles from './DefaultLayout.module.scss'
import classNames from "classnames/bind";
import Footer from "../components/Footer";
const cx = classNames.bind(styles)
function DefaultLayout({children}) {
    return ( 
        <div className={cx('wrapper')}>
            <Header></Header>
            <div className={cx('container')}>
            {/* <SideBar></SideBar> */}
                {children}
            </div>
            <Footer></Footer>
        </div>
     );
}

export default DefaultLayout;