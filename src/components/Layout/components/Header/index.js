import classNames from 'classnames/bind';
import styles from './Header.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMapLocationDot, faMoneyCheckDollar, faHeart, faRightFromBracket, faCartPlus, faListCheck, faGift, faUserGear, faDolly ,faBars, faAnglesDown} from '@fortawesome/free-solid-svg-icons';
import {  faPaperPlane, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faBriefcase, faGlasses, faHatCowboySide, faHome, faShirt, faWallet } from "@fortawesome/free-solid-svg-icons";
import 'tippy.js/dist/tippy.css';
import Button from '~/components/Button';
import Menu from '../Popper/Menu';
import Search from '../Search';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import request from '~/utils/request';
const cx = classNames.bind(styles)
const Menu_Customer =[{
    icon : <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>,
    title : 'Giỏ hàng của tôi',
    to : '/customer/cart'
    } ,
    {
    icon : <FontAwesomeIcon icon={faMoneyCheckDollar}></FontAwesomeIcon>,
    title : 'Đơn hàng ',
    to : '/customer/order/list_order'
    },
    {
    icon : <FontAwesomeIcon icon={faMapLocationDot}></FontAwesomeIcon>,
    title : 'Địa chỉ nhận hàng',
    to : '/customer/address'
    },
    {
    icon : <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>,
    title : 'Sản phẩm yêu thích ',
    to : '/customer/love'
    },
{
    icon : <FontAwesomeIcon icon={faRightFromBracket}></FontAwesomeIcon>,
    title : 'Đăng xuất',
    to : '/logout'
    }
]
const Menu_Employee = [
{
    icon : <FontAwesomeIcon icon={faListCheck}></FontAwesomeIcon>,
    title : 'Danh sách đơn hàng',
    to : '/employee/orders'
    },
{
    icon : <FontAwesomeIcon icon={faRightFromBracket}></FontAwesomeIcon>,
    title : 'Đăng xuất',
    to : '/logout'
    }
]
const Menu_Shipper =[{
    icon : <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>,
    title : 'Danh sách đơn hàng',
    to : '/shipper/orders'
    } ,
    {
    icon : <FontAwesomeIcon icon={faRightFromBracket}></FontAwesomeIcon>,
    title : 'Đăng xuất',
    to : '/logout'
    }
]
const Menu_Admin = [{
    icon : <FontAwesomeIcon icon={faCartPlus}></FontAwesomeIcon>,
    title : 'Tạo sản phẩm',
    to : '/product/create'
    } ,
    {
    icon : <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>,
    title : 'Quản lí sản phẩm',
    to : '/products'
    },
{
    icon : <FontAwesomeIcon icon={faListCheck}></FontAwesomeIcon>,
    title : 'Danh sách đơn hàng',
    to : '/admin/orders'
    },
{
    icon : <FontAwesomeIcon icon={faGift}></FontAwesomeIcon>,
    title : 'Quản lý khuyến mãi',
    to : '/admin/promotions'
    },
{
    icon : <FontAwesomeIcon icon={faUserGear}></FontAwesomeIcon>,
    title : 'Quản lý nhân viên',
    to : '/admin/employees'
    },
{
    icon : <FontAwesomeIcon icon={faDolly}></FontAwesomeIcon>,
    title : 'Quản lý shipper',
    to : '/admin/shippers'
    },
{
    icon : <FontAwesomeIcon icon={faRightFromBracket}></FontAwesomeIcon>,
    title : 'Đăng xuất',
    to : '/logout'
    }
]
function Header() {
    const [customer,setCustomer] = useState(false)
    const [employee,setEmployee] = useState(false)
    const [shipper,setShipper] = useState(false)
    const [admin,setAdmin] = useState(false)
    const [nameUser,setNameUser] = useState('user')
    const [cartIndex,setCartIndex] = useState(0)
    const [heartIndex,setHeartIndex] = useState(0)
    const [guest,setGuest] = useState(true)
    useEffect(()=>{
        request.get('/')
        .then(res=>{
            if (res.data.customer){
                setGuest(false)
                setCustomer(res.data.customer)
                setNameUser(res.data.ten)
                setCartIndex(res.data.sl)
            }
                else {
                    setCustomer(false)
                    setCartIndex(0)
                }
            if(res.data.nhanvien){
                setGuest(false)
                setEmployee(res.data.nhanvien)
                setNameUser(res.data.ten)
            }
                else{
                    setEmployee(false)
                }
            if(res.data.shipper){
                setGuest(false)
                setShipper(res.data.shipper)
                setNameUser(res.data.ten)
            }
                else{
                    setShipper(false)
                }
            if(res.data.admin){
                setGuest(false)
                setAdmin(res.data.admin)
                setNameUser('Admin')
            }
                else{
                    setAdmin(false)
                }
            if( res.data.customer===false && res.data.nhanvien===false && res.data.shipper===false && res.data.admin===false){
                setGuest(true)
            }
        })
    },[guest])
    useEffect(()=>{
        request.get('/number_cart')
        .then(res=>{
            setCartIndex(res.data.sl)
        })
        request.get('/number_heart')
        .then(res=>{
            setHeartIndex(res.data.sl)
        })
    })
    return ( 
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div>
                    <Link to={'/'}><img className={cx('logo')} alt='logo' src={require('~/assets/img/logo.webp')}  ></img></Link>      
                </div>
                <div className={cx('list-category')}>
                    <span>Sản Phẩm </span>
                    <FontAwesomeIcon icon={faAnglesDown}></FontAwesomeIcon>
                    <div className={cx('category-item')}>
                        <Link to={'/hat'} className={cx('link')}><FontAwesomeIcon icon={faHatCowboySide} className={cx('icon')}></FontAwesomeIcon><span> Nón - Mũ </span></Link>
                        <Link to={'/t-shirt'} className={cx('link')}><FontAwesomeIcon icon={faShirt} className={cx('icon')}></FontAwesomeIcon><span> Áo thun - Áo khoác </span></Link>
                        <Link to={'/wallet'} className={cx('link')}><FontAwesomeIcon icon={faWallet} className={cx('icon')}></FontAwesomeIcon><span> Ví - Bóp </span></Link>
                        <Link to={'/glass'} className={cx('link')}><FontAwesomeIcon icon={faGlasses} className={cx('icon')}></FontAwesomeIcon><span> Kính mát - Mắt kính </span></Link>
                        <Link to={'/balo'} className={cx('link')}><FontAwesomeIcon icon={faBriefcase} className={cx('icon')}></FontAwesomeIcon><span> Ba lô - Túi chéo </span></Link>
                    </div>
                </div>
                <Search></Search>

                <div className={cx('action')}>
                    {guest ? (
                        <div className={cx('action-no-login')}>
                        <Button to={'/regist'}>Register</Button>
                        <Button to={'/login'} primary >Login</Button>
                        </div>
                    ) : (<div>

                    {customer ? 
                    (<div className={cx('current-user')}>
                        <button className={cx('heart')}>
                            <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                            <span className={cx('heart-notice')}>{heartIndex}</span>
                        </button>
                        <button className={cx('cart')}>
                            <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
                            <span className={cx('cart-notice')}>{cartIndex}</span>
                        </button>
                        <Menu items={Menu_Customer}>
                        <div className={cx('info-user')}>
                        <img className={cx('avatar-user')} alt='avatar' src={require('~/assets/img/customer.gif')}></img>
                        <span className={cx('name-user')}>Hello {nameUser}!</span>
                        <FontAwesomeIcon icon={faBars} className={cx('menu-bars')}></FontAwesomeIcon>
                        </div>
                        </Menu>

                     </div>
                    ) : (<div></div>) }
                    {employee ? 
                    (<div className={cx('current-user')}>
                        <Menu items={Menu_Employee}>
                        <div className={cx('info-user')}>
                        <img className={cx('avatar-user')} alt='avatar' src={require('~/assets/img/employee.gif')}></img>
                        <span className={cx('name-user')}>Employee : {nameUser}!</span>
                        <FontAwesomeIcon icon={faBars} className={cx('menu-bars')}></FontAwesomeIcon>
                        </div>
                        </Menu>        
                     </div>
                    ) : (<div></div>) }
                    {shipper ? 
                    (<div className={cx('current-user')}>
                        <Menu items={Menu_Shipper}>
                        <div className={cx('info-user')}>
                        <img className={cx('avatar-user')} alt='avatar' src={require('~/assets/img/shipper.gif')}></img>
                        <span className={cx('name-user')}>Shipper : {nameUser}!</span>
                        <FontAwesomeIcon icon={faBars} className={cx('menu-bars')}></FontAwesomeIcon>
                        </div>
                        </Menu>        
                     </div>
                    ) : (<div></div>) }
                    {admin ? 
                    (<div className={cx('current-user')}>
                        <Menu items={Menu_Admin}>
                        <div className={cx('info-user')}>
                        <img className={cx('avatar-user')} alt='avatar' src={require('~/assets/img/admin.gif')}></img>
                        <span className={cx('name-user')}>Hi : {nameUser}!</span>
                        <FontAwesomeIcon icon={faBars} className={cx('menu-bars')}></FontAwesomeIcon>
                        </div>
                        </Menu>        
                     </div>
                    ) : (<div></div>) }


                    </div>) }
                    

                </div>
                
                
            </div>
        </header>
     );
}

export default Header;