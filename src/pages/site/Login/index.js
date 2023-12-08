import classNames from "classnames/bind";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import request from "~/utils/request";
import styles from './Login.module.scss'

const cx = classNames.bind(styles)
function Login() {
    const [login_false,setLogin] = useState(false)
    const [block,setBlock] = useState(false)
    const [phone,setPhone] = useState('')
    const [pass,setPass] = useState('')
    const navigate = useNavigate()
    const handlerPhone = (e)=>{setPhone(e.target.value)}
    const handlerPass = (e)=>{setPass(e.target.value)}
    const handlerApiLogin = () => {
        request.post('/action/login',{
                phone : phone,
                password : pass
        })
        .then(res=>{
            if(res.data.blocked ===true){
            setBlock(true)
            }
            else{
                setLogin(res.data.login_false)
                if(res.data.login_false){
                    setLogin(true)
                }
                else{
                    navigate('/')
                }
            }  
        })
    }
    return ( 
    <div className={cx('container-regist')}>
        <div  className={cx('container-title')}>
            <img src={require('~/assets/img/logo.webp')} alt="logo"  className={cx('logo-container')}></img>
            <h1>Aries Shop</h1>
            <p>Men's Sport & Trending Fashion</p>
        </div>
        <div  className={cx('form-regist-note')}>
            <div className={cx('form-rg')} onSubmit={handlerApiLogin}>
                <div  className={cx('form-header')}>
                    <h3  className={cx('form-heading')}>Đăng Nhập</h3>
                    <Link to={'/regist'}><span  className={cx('form-switch-btn')}>Đăng kí</span></Link>
                </div>
                <div  className={cx('form')}>
                    <span class={cx('form-info')}>Phone number :</span>
                    <div  className={cx('form-group')}>
                        <input type="text" onChange={handlerPhone}  className={cx('form-input')} name="phone" placeholder="Số điện thoại của bạn" required></input>
                    </div>
                    <span class={cx('form-info')}>Password :</span>
                    <div  className={cx('form-group')}>
                        <input type="password" onChange={handlerPass} className={cx('form-input','fin')} name="pass" placeholder="Nhập Mật Khẩu"></input>
                    </div>
                    
                    {   login_false ? (<div className={cx('login-fail')}>
                            <p>Bạn đã nhập sai mật khẩu hoặc số điện thoại</p>
                            <Link to={`/password/change/${phone}`}>Quên mật khẩu ?</Link></div>)
                             : (<div></div>)  }
                    { block && (<p>Tài khoản của bạn đã bị khóa</p>)}
                    <div className={cx('form-btn')}>
                    <button type="submit" onClick={handlerApiLogin} className={cx('control-regist')}>Đăng Nhập</button>
                    </div>
                </div>
            </div>
        </div>
    </div> )
}
export default Login;