import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faCheck, faCircleExclamation, faCircleXmark, faClipboardCheck, faHouseCircleXmark, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect,  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import rq_nv from "~/utils/employee";
import styles from './list_order_employee.module.scss'
const cx = classNames.bind(styles)
function List_Order_Employee() {
    const navigate = useNavigate()
    const[orders,setOrders] = useState([])
    useEffect(()=>{
        rq_nv.get('/orders')
        .then(
            res=>{
              if(res.data.denied)
              navigate('/denied')
              else
              {setOrders(res.data.orders)}
            })
    },[])
    const[activeStatus,setActive] = useState(1)
    const status = [
      {
      id : 1,
      message : 'Chờ xác nhận',
      icon : faClock
    },
    {
      id : 2,
      message : 'Đã xác nhận',
      icon : faCheck
    },
    {
      id : 7,
      message : 'Đã Hủy',
      icon : faHouseCircleXmark
    }
  ]
    return ( 
  <div className={cx('wrapper')}>
    <h2>List Order</h2>
    <div className={cx('menu')}>
      {status.map((item)=>{
        return(<button key={item.id} onClick={()=>{setActive(item.id)}} className={cx('btn-menu-item',`${activeStatus === item.id && 'active'}`)}>{item.message} <FontAwesomeIcon icon={item.icon} ></FontAwesomeIcon></button>)
      })}
    </div>

      {activeStatus == 1 && (
        <table className={cx('table')}>
        <thead>
        <tr className={cx('tr-top')}>
          <th className={cx('th-top')}>Số điện thoại</th>
          <th className={cx('th-top')}>Địa chỉ</th>
          <th className={cx('th-top')}>Ngày đặt hàng</th>
          <th className={cx('th-top')}>Tổng cộng</th>
          <th className={cx('th-top')}>Tùy chọn</th>
        </tr>
        </thead>
              <tbody>
              {orders.map((order,index)=>{
                if(order.state == 1)
              return (<tr key={index}>
                <td className={cx('td','mark')}>{order.shippingPhone}</td>
                <td className={cx('td','mark')}>{order.shippingAddress}</td>
                <td className={cx('td','mark')}>{order.createdAt.substring(0, 10)}</td>
                <td className={cx('td','mark')}>{order.totalPrice} vnd</td>
                <td className={cx('td','mark')}>
                    <Link className={cx('btn-action-blue')} to={`/customer/order_detail/${order._id}`}>Xem chi tiết</Link>
                    <Link className={cx('btn-action-green')}><button className={cx('btn')} onClick={()=>{
                      rq_nv.get(`/confirm_order/${order._id}`)
                      .then(res=>{
                        if(res.data.denied)
                        navigate('/denied')
                        else
                        if(res.data.confirmed)
                        navigate(0)
                      })
                    }}>Xác nhận</button></Link>
                    <Link className={cx('btn-action-red')}><button className={cx('btn')} onClick={()=>{
                      rq_nv.get(`/order/cancel/${order._id}`)
                      .then(res=>{
                        if(res.data.denied)
                        navigate('/denied')
                        else
                        navigate(0)
                      })
                    }}>Hủy đơn</button></Link>
                </td>
              </tr>)
                })}    
              </tbody>
        </table>
      )}
      
      {activeStatus == 2 && (
        <table className={cx('table')}>
        <thead>
        <tr className={cx('tr-top')}>
          <th className={cx('th-top')}>Số điện thoại</th>
          <th className={cx('th-top')}>Địa chỉ</th>
          <th className={cx('th-top')}>Ngày đặt hàng</th>
          <th className={cx('th-top')}>Tổng cộng</th>
          <th className={cx('th-top')}>Nhân viên xác nhận</th>
          <th className={cx('th-top')}>Tùy chọn</th>
        </tr>
        </thead>
              <tbody>
              {orders.map((order,index)=>{
                if(order.state == 2)
              return (<tr key={index}>
                <td className={cx('td','mark')}>{order.shippingPhone}</td>
                <td className={cx('td','mark')}>{order.shippingAddress}</td>
                <td className={cx('td','mark')}>{order.createdAt.substring(0, 10)}</td>
                <td className={cx('td','mark')}>{order.totalPrice} vnd</td>
                <td className={cx('td','mark')}>{order.employee.name}</td>
                <td className={cx('td','mark')}>
                <Link className={cx('btn-action-blue')} to={`/customer/order_detail/${order._id}`}>Xem chi tiết</Link>
                </td>
              </tr>)
                })}    
              </tbody>
        </table>
      )}

      {activeStatus == 7 && (
        <table className={cx('table')}>
        <thead>
        <tr className={cx('tr-top')}>
          <th className={cx('th-top')}>Số điện thoại</th>
          <th className={cx('th-top')}>Địa chỉ</th>
          <th className={cx('th-top')}>Ngày đặt hàng</th>
          <th className={cx('th-top')}>Ngày hủy</th>
          <th className={cx('th-top')}>Tổng cộng</th>
          <th className={cx('th-top')}>Nhân viên hủy</th>
          <th className={cx('th-top')}>Tùy chọn</th>
        </tr>
        </thead>
              <tbody>
              {orders.map((order,index)=>{
                if(order.state == 7)
              return (<tr key={index}>
                <td className={cx('td','mark')}>{order.shippingPhone}</td>
                <td className={cx('td','mark')}>{order.shippingAddress}</td>
                <td className={cx('td','mark')}>{order.createdAt.substring(0, 10)}</td>
                <td className={cx('td','mark')}>{order.cancelAt.substring(0, 10)}</td>
                <td className={cx('td','mark')}>{order.totalPrice} vnd</td>
                <td className={cx('td','mark')}>{order.employee.name}</td>
                <td className={cx('td','mark')}>
                <Link className={cx('btn-action-blue')} to={`/customer/order_detail/${order._id}`}>Xem chi tiết</Link> 
                </td>
              </tr>)
                })}    
              </tbody>
        </table>
      )}

  </div> 
        
        );

}

export default List_Order_Employee;