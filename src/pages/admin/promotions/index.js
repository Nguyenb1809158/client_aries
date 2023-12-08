import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import rq_admin from "~/utils/rq_admin";
import styles from './promotions.module.scss'
const cx = classNames.bind(styles)
function Promotions() {
  const navigate = useNavigate()
    const [promotions,setPromotions] = useState([])
    useEffect(()=>{
        rq_admin.get('/promotions')
        .then(
            res=>{
              if(res.data.denied)
              navigate('/denied')
              else
                setPromotions(res.data.promotions)})
    },[])
    return ( 
    <div className={cx('wrapper')}>
    <h2>Promotions</h2>
    <table className={cx('table')}>
    <thead>
    <tr className={cx('tr-top')}>
      <th className={cx('th-top')}>Mã </th>
      <th className={cx('th-top')}>số % giảm</th>
      <th className={cx('th-top')}>Ngày bắt đầu</th>
      <th className={cx('th-top')}>Ngày hết hạn</th>
      <th className={cx('th-top')}>Action</th>
    </tr>
    </thead>
    <tbody>
    {promotions.length > 0 ? 
    (
      promotions.map((promotion,index)=>{
        return (
          <tr key={index}>
            <td className={cx('td','mark')}>{promotion.code}</td>
            <td className={cx('td','mark')}>{promotion.discountPercentage}</td>
            <td className={cx('td','mark')}>{promotion.startDate.substring(0, 10)}</td>
            <td className={cx('td','mark')}>{promotion.endDate.substring(0, 10)}</td>
            {promotion.isActive? 
            (<td className={cx('td','mark')}>     
                <button className={cx('btn-action-red')} onClick={()=>{
                  rq_admin.get(`/block_promotion/${promotion._id}`)
                  .then(res=>{
                    if(res.data.denied)
                    navigate('/denied')
                    else
                    navigate(0)
                  })
                }}>Block</button>
                <button className={cx('btn-action-green')} onClick={()=>{navigate('/admin/add_promotion')}}>Add New Promotion</button>
            </td>) : 
            (<td className={cx('td','mark')}>     
            <button className={cx('btn-action-green')} onClick={()=>{
              rq_admin.get(`/unblock_promotion/${promotion._id}`)
              .then(res=>{
                if(res.data.denied)
                navigate('/denied')
                else
                navigate(0)
              })
            }}>UnBlock Promotion</button>
            <button className={cx('btn-action-green')} onClick={()=>{navigate('/admin/add_promotion')}}>Add New Promotion</button>
            </td>)
            }
          </tr>
                                    )
            })
            ) : 
        (<tr>
          <td></td>
          <td colSpan={3}>
            <p className={cx('no-inventory')}>Chưa có khuyến mãi nào</p>
            <button className={cx('btn-action-green')} onClick={()=>{navigate('/admin/add_promotion')}}>Add New Promotion</button>
          </td>
          <td></td>
        </tr>)}
        </tbody>
        </table>
        </div> )
        
}

export default Promotions;