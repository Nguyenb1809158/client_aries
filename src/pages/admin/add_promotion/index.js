import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import rq_admin from "~/utils/rq_admin";
import styles from './add_promotion.module.scss'
const cx = classNames.bind(styles)
function AddPromotions() {
  const navigate = useNavigate()
    const[ten_km,setTenKM] = useState('')
    const[phan_tram_km,setPTKM] = useState(0)
    const[startday,setStartday] = useState(null)
    const[endday,setEndday] = useState(null)

    const[used,setUsed] = useState(false)

    const handlertenkm = (e)=>{setTenKM(e.target.value)}
    const handlerStartday = (e)=>{setStartday(e.target.value)}
    const handlerEndday= (e)=>{setEndday(e.target.value)}
    const handlerptkm = (e)=>{
      var temp = parseInt(e.target.value)
      if(Number.isInteger(temp)==true && e.target.value <= 100){
        setPTKM(e.target.value)
      }
      else{
        alert('Phần trăm khuyến mãi phải là số nguyên và nhỏ hơn 100')
        e.target.value = ''
      }
    }
    const Apiadd = ()=>{
      if(ten_km === '' || phan_tram_km === 0 || startday === null || endday === null )
      alert('Không được để trống thông tin khuyến mãi')
      else
      {
        rq_admin.post('/action_add_promotion',{
          code : ten_km,
          discountPercentage : phan_tram_km,
          startDate : startday,
          endDate : endday
        })
        .then(res=>{
          if(res.data.denied)
          navigate('/denied')
          else
          if(res.data.add)
          navigate('/admin/promotions')
          else
          setUsed(true)
        })
      }
    }
    return ( 
    <div className={cx('wrapper')}>
    <h2>Promotions</h2>
        <form className={cx('form')}>
          <div>
          <span>Mã</span><br></br>
          <input type='text' className={cx('input')} onChange={handlertenkm}></input>
          </div>
          <div>
          <span>Số % giảm</span><br></br>
          <input type='text' className={cx('input')} onChange={handlerptkm}></input>
          </div>
          <div>
          <span>Ngày hiệu lực</span><br></br>
          <input type='date' className={cx('input')} onChange={handlerStartday}></input>
          </div>
          <div>
          <span>Ngày hết hạn</span><br></br>
          <input type='date' className={cx('input')} onChange={handlerEndday}></input>
          </div>
          <button className={cx('btn-action-green-2')} onClick={Apiadd}>Add Now</button>
          {used && <h4>Mã khuyến mãi này đã tồn tại</h4>}
        </form>
    </div> );
}

export default AddPromotions;