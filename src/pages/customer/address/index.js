import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import rq_customer from "~/utils/rq_customer";
import styles from './address.module.scss'
const cx = classNames.bind(styles)
function Address() {
    const navigate = useNavigate()
    const [address,setAddress] = useState([])
    const [add_kh,setAddNew] = useState('')
    const handlerNew = (e)=>{
        setAddNew(e.target.value)
    }
    const ApiAdd = ()=>{
        if(add_kh===null)
        alert('Nhập địa chỉ mới')
        else{
            rq_customer.post('/add_address',{
                address : add_kh
            })
            .then(res=>{
                if(res.data.denied)
                navigate('/denied')
                else
                navigate(0)
            })
        }
    }
    useEffect(()=>{
        rq_customer.get(`/address`)
        .then(
            res=>{
                if(res.data.denied)
                navigate('/denied')
                else
                setAddress(res.data.address)})
    },[])
    return ( 
    <div className={cx('wrapper')}>
    <h2>My Address </h2>
    <table className={cx('table')}>
    <thead>
    <tr className={cx('tr-top')}>
      <th className={cx('th-top')}>Address</th>
      <th className={cx('th-top')}>Action</th>
    </tr>
    </thead>
    <tbody>
    {address.length > 0 ? 
    (
      address.map((item,index)=>{
        return (<tr key={index}>
            <td className={cx('td','mark')}>{item.address}</td>
            <td className={cx('td','mark')}>
            <button onClick={()=>{
                    rq_customer.delete(`/delete_address/${item._id}`)
                    .then(res=>{
                        if(res.data.denied)
                        navigate('/denied')
                        else
                        navigate(0)
                    })
                }} className={cx('btn-action-red')}>Delete Address</button>
            </td>
          </tr>)
            })
            ) : 
        (<tr>
        <td colspan={2} >Bạn chưa có địa chỉ
        </td>
        </tr>)}

        </tbody>
        </table>
        <div className={cx('add-address')}>
            <span>Add new address</span>
            <input type='text' onChange={handlerNew} className={cx('input')}></input>
            <btn onClick={ApiAdd} className={cx('btn-action-green')}>Add</btn>
        </div>
        </div> );
}

export default Address;