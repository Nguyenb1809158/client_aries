import classNames from "classnames/bind";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './Regist.module.scss'
import request from "~/utils/request";
const cx = classNames.bind(styles)
function Regist() {
    const navigate= useNavigate()
    const [registFail,setRegistFail] = useState(false)
    const [name_kh,setName] = useState('')
    const handlerName = (e)=>{setName(e.target.value)}
    const [phone_kh,setPhone] = useState('')
    const handlerPhone = (e)=>{setPhone(e.target.value)}
    const [pass_kh,setPass] = useState('')
    const handlerPass = (e)=>{setPass(e.target.value)}
    const [repass,setRepass] = useState('')
    const handlerRePass = (e) =>{ setRepass(e.target.value)}
    const [birth_kh,setBirth] = useState('')
    const handlerBirth = (e)=> {setBirth(e.target.value)}
    const [gender_kh,setGender] = useState(true)
    const handlerGenderMale = (e) => {setGender(true)}
    const handlerGenderFemale = (e) => {setGender(false)}
    const [address,setAddress] = useState('')
    const handlerAddress = (e) => { setAddress(e.target.value)}
    const [email_kh,setEmailKH] = useState('')
    const handlerEmail = (e) =>{setEmailKH(e.target.value)}
    const handlerApiRegist = ()=>{
        if(name_kh === '' || phone_kh === '' || pass_kh === '' || birth_kh === '' || address === '' || email_kh === '')
        alert('bạn chưa điền đủ thông tin')
        else
        if(repass !== pass_kh){
            alert('xác nhận sai mật khẩu')
        }
        else{
            request.post('/action/regist',{
                name : name_kh,
                phone : phone_kh,
                password : pass_kh,
                birth : birth_kh,
                gender : gender_kh,
                address : address,
                email: email_kh
        })
        .then(res=>{
            setRegistFail(res.data.regist_fail)
            if(res.data.regist_fail){
                setRegistFail(true)
            }
            else{
                navigate('/login')
            }
        })
        }
        
    }
    return ( 
    <div className={cx('container-regist')}>
        <div  className={cx('container-title')}>
            <img src={require('~/assets/img/logo.webp')} alt="logo"  className={cx('logo-container')}></img>
            <h1>Aries Shop</h1>
            <p>Men's Sport & Trending Fashion</p>
        </div>
        <div  className={cx('form-regist-note')}>
            <div onSubmit={handlerApiRegist} className={cx('form-rg')}>
                <div  className={cx('form-header')}>
                    <h3  className={cx('form-heading')}>Đăng Kí</h3>
                    <Link to={'/login'}><span  className={cx('form-switch-btn')}>Đăng Nhập</span></Link>
                </div>
                <div  className={cx('form')}>
                    <div  className={cx('form-group')}>
                        <input type="text"  className={cx('form-input')} onChange={handlerName} name="name_kh" placeholder="Nhập tên của bạn" required></input>
                    </div>
                    <div  className={cx('form-group')}>
                        <input type="text" className={cx('form-input')} onChange={handlerPhone} name="phone_kh" placeholder="Số điện thoại của bạn" required></input>
                    </div>
                    <div  className={cx('form-group')}>
                        <input type="password"  className={cx('form-input')} onChange={handlerPass} name="pass_kh" placeholder="Nhập Mật Khẩu " required></input>
                    </div>
                    <div  className={cx('form-group')}>
                        <input type="password" className={cx('form-input')} onChange={handlerRePass} name="repass" placeholder="xác nhận mật khẩu" required></input>
                    </div>
                    <div  className={cx('form-group')}>
                        <input type="date" className={cx('form-input')} onChange={handlerBirth} name="birth_kh" placeholder="ngày sinh của bạn" required></input>
                    </div>
                    <div  className={cx('form-group')}>
                        <input type="radio" className={cx('radio-btn')} onClick={handlerGenderMale} name="gender_kh" value="true" checked></input><label className={cx('label')}>Nam</label>
                        <input type="radio" className={cx('radio-btn')} onClick={handlerGenderFemale} name="gender_kh" value="false"></input><label className={cx('label')}>Nữ</label>
                    </div>
                    <div  className={cx('form-group')}>
                        <input type="text" className={cx('form-input')} onChange={handlerAddress} id="address" name="address" placeholder="Địa chỉ nhận hàng" required></input>
                    </div>
                    <div  className={cx('form-group')}>
                        <input type="text" className={cx('form-input')} onChange={handlerEmail} id="address" name="address" placeholder="Địa chỉ Email" required></input>
                    </div>
                    
                    {   registFail ? (<h4 className={cx('regist-fail')}>Số điện thoại này đã được sử dụng !!!</h4>) : (<div></div>)  }
                    
                    <div className={cx('form-btn')}>
                    <button  className={cx('control-clear')}>Nhập lại</button>
                    <button type="submit" onClick={handlerApiRegist} className={cx('control-regist')}>Đăng Kí</button>
                    </div>
                </div>
            </div>
        </div>
    </div> )
}
export default Regist;