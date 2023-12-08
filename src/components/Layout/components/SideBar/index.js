import Menu from "./Menu";
import Menuitem from "./Menu/Menuitem";
import classNames from "classnames/bind";
import styles from './SideBar.module.scss'
import { faBriefcase, faGlasses, faHatCowboySide, faHome, faShirt, faWallet } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles)
function Sidebar() {
    return ( <aside className={cx('wrapper')}>
        <Menu>
        <Menuitem title='Home - Aries Shop' to={'/'} icon={faHome}></Menuitem>
        <Menuitem title='Nón - Mũ' to={'/hat'} icon={faHatCowboySide}></Menuitem>
        <Menuitem title='Áo thun - Áo Khoác' to={'/t-shirt'} icon={faShirt}></Menuitem>
        <Menuitem title='Ví' to={'/wallet'} icon={faWallet}></Menuitem>
        <Menuitem title='Kính mát' to={'/glass'} icon={faGlasses}></Menuitem>
        <Menuitem title='Balo - Túi xách' to={'/balo'} icon={faBriefcase}></Menuitem>
        </Menu>
    </aside> );
}

export default Sidebar;