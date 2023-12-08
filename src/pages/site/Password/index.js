import classNames from "classnames/bind";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import rq_password from "~/utils/rq_password";
import styles from './Password.module.scss'
const cx = classNames.bind(styles)
function Password() {
    const navigate = useNavigate()
    const {phone} = useParams()
    const [getPin,setGetPin] = useState(true)
    const [showInput,setShowInput] = useState(false)
    const [pin,setPin] = useState(0)
    const [showFail,setShowFail] = useState(false)
    const [showSuccess,setShowSuccess] = useState(false)
    const [noPhone,setNoPhone] = useState(false)
    const [type,setType] = useState('')

    const [password,setPassword] = useState('')
    const [repass,setRePass] = useState('')
    const handlerPass = (e)=>{setPassword(e.target.value)}
    const handlerRePass = (e)=>{setRePass(e.target.value)}

    const handlerPin = (e)=>{setPin(e.target.value)}
    const handlerGetPin = ()=>{
        rq_password.get(`/get_pin/${phone}`)
        .then(res=>{
            if(res.data.sent){
                setGetPin(false)
                setShowInput(true)
                setType(res.data.type)
            }
            else{
                setNoPhone(true)
                setGetPin(false)
            }
        })
    }
    const ApiConfirm = ()=>{
        rq_password.post('/confirm',{
            code : pin,
            phone : phone
        })
        .then(res=>{
            if(res.data.confirmed)
            {setShowSuccess(true)
            setShowInput(false)
            setShowFail(false)}
            else{
                setShowFail(true)
            }
        })
    }

    const ApiNewPass = ()=>{
        if(password === '')
        alert('Mật khẩu mới không được để trống')
        else
        if(password !== repass)
        alert('Xác nhận mật khẩu không khớp')
        else{
            switch (type){
                case 'khach_hang' : {
                    rq_password.post('/change_pass_kh',{
                        password : password,
                        phone : phone
                    })
                    .then(res=>{
                        if(res.data.updated)
                        navigate('/login')
                    })
                }
                break
                case 'nhan_vien' : {
                    rq_password.post('/change_pass_nv',{
                        password : password,
                        phone : phone
                    })
                    .then(res=>{
                        if(res.data.updated)
                        navigate('/login')
                    })
                }
                break
                case 'shipper' : {
                    rq_password.post('/change_pass_shipper',{
                        password : password,
                        phone : phone
                    })
                    .then(res=>{
                        if(res.data.updated)
                        navigate('/login')
                    })
                }
                break
                case 'admin' : {
                    rq_password.post('/change_pass_admin',{
                        password : password,
                        phone : phone
                    })
                    .then(res=>{
                        if(res.data.updated)
                        navigate('/login')
                    })
                }
                break
            }
        }
    }
    return ( 
    <div className={cx('wrapper')}>
        <h2>Xác thực đổi mật khẩu qua Email</h2>
        <h3>Số điện thoại tài khoản {phone}</h3>
        <div className={cx('action')}>
            {getPin && (<button className={cx('btn-action-green')} onClick={handlerGetPin}>Nhận mã xác nhận</button>)}
            {noPhone && (<h3>Số điện thoại này không thuộc bất kỳ tài khoản có sẵn nào , bạn có thể đăng kí tài khoản với số điện thoại này</h3>)}
            {showInput && (
                <div>
                    <span>Kiểm tra email của bạn và nhập mã xác nhận tại đây : </span>
                    <input className={cx('input')} onChange={handlerPin}></input>
                    <button onClick={ApiConfirm} className={cx('btn-get-pin')}>Xác nhận</button>
                </div>
            )}
            {showFail && (<span className={cx('span')}>Mã xác nhận không chính xác</span>)}
            {showSuccess && 
            (<div>
                <div><p>Mật khẩu mới</p><input onChange={handlerPass} type='password' className={cx('input-pass')}></input></div>
                <div><p>Xác nhận mật khẩu mới</p><input onChange={handlerRePass} type='password' className={cx('input-pass')}></input></div>
                <button onClick={ApiNewPass} className={cx('btn-action-green')}>Okay</button>
            </div>)}
        </div>
    </div> 
    );
}

export default Password;