import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faArrowUpRightFromSquare, faCircleExclamation, faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect,  useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import rq_shipper from "~/utils/rq_shipper";
import styles from './list_order_shipper.module.scss'
const cx = classNames.bind(styles)
function List_Order_Shipper() {
    const navigate = useNavigate()
    const[orders,setOrders] = useState([])
    useEffect(()=>{
        rq_shipper.get('/orders')
        .then(
            res=>{
              if(res.data.denied)
              navigate('/denied')
              else
              {setOrders(res.data.orders)}
            })
    },[])
    const[activeStatus,setActive] = useState(2)
    const status = [
    {
      id : 2,
      message : 'Đơn hàng đang chờ',
      icon : faClock
    },
    {
      id : 3,
      message : 'Đang giao hàng',
      icon : faArrowUpRightFromSquare
    },
    {
      id : 4,
      message : 'Giao thành công',
      icon : faClipboardCheck
    },
    {
      id : 5,
      message : 'Giao thất bại',
      icon : faCircleExclamation
    },
  ]
    return ( 
  <div className={cx('wrapper')}>
    <h2>List Orders</h2>
    <div className={cx('menu')}>
      {status.map((item)=>{
        return(<button key={item.id} onClick={()=>{setActive(item.id)}} className={cx('btn-menu-item',`${activeStatus === item.id && 'active'}`)}>{item.message} <FontAwesomeIcon icon={item.icon} ></FontAwesomeIcon></button>)
      })}
    </div>
      
      {activeStatus === 2 && (
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
                if(order.state === 2)
              return (<tr key={index}>
                <td className={cx('td','mark')}>{order.shippingPhone}</td>
                <td className={cx('td','mark')}>{order.shippingAddress}</td>
                <td className={cx('td','mark')}>{order.createdAt.substring(0, 10)}</td>
                <td className={cx('td','mark')}>{order.totalPrice} vnd</td>
                <td className={cx('td','mark')}>{order.employee.name}</td>
                <td className={cx('td','mark')}>
                <Link className={cx('btn-action-blue')} to={`/customer/order_detail/${order._id}`}>Xem chi tiết</Link>
                <Link className={cx('btn-action-green')}><button className={cx('btn')} onClick={()=>{
                  rq_shipper.get(`/get_order/${order._id}`)
                  .then(res=>{
                    if(res.data.got_order)
                    navigate(0)
                  })
                }}>Lấy đơn này</button></Link>
                </td>
              </tr>)
                })}    
              </tbody>
        </table>
      )}

      {activeStatus === 3 && (
        <table className={cx('table')}>
        <thead>
        <tr className={cx('tr-top')}>
          <th className={cx('th-top')}>Số điện thoại</th>
          <th className={cx('th-top')}>Địa chỉ</th>
          <th className={cx('th-top')}>Ngày đặt hàng</th>
          <th className={cx('th-top')}>Ngày bắt đầu giao</th>
          <th className={cx('th-top')}>Tổng cộng</th>
          <th className={cx('th-top')}>Nhân viên giao</th>
          <th className={cx('th-top')}>Tùy chọn</th>
        </tr>
        </thead>
              <tbody>
              {orders.map((order,index)=>{
                if(order.state === 3)
              return (<tr key={index}>
                <td className={cx('td','mark')}>{order.shippingPhone}</td>
                <td className={cx('td','mark')}>{order.shippingAddress}</td>
                <td className={cx('td','mark')}>{order.createdAt.substring(0, 10)}</td>
                <td className={cx('td','mark')}>{order.deliverAt.substring(0, 10)}</td>
                <td className={cx('td','mark')}>{order.totalPrice} vnd</td>
                <td className={cx('td','mark')}>{order.shipper.name}</td>
                <td className={cx('td','mark')}>
                <Link className={cx('btn-action-blue')} to={`/customer/order_detail/${order._id}`}>Xem chi tiết</Link>
                <Link className={cx('btn-action-red')}><button className={cx('btn')} onClick={()=>{
                  rq_shipper(`/delivery_fail/${order._id}`)
                  .then(res=>{
                    navigate(0)
                  })
                }}>Giao thất bại</button></Link>
                <Link className={cx('btn-action-green')}><button className={cx('btn')} onClick={()=>{
                  rq_shipper.get(`/delivered/${order._id}`)
                  .then(res=>{
                    navigate(0)
                  })
                }}>Đã giao</button></Link>
                </td>
              </tr>)
                })}    
              </tbody>
        </table>
      )}

      {activeStatus === 4 && (
        <table className={cx('table')}>
        <thead>
        <tr className={cx('tr-top')}>
          <th className={cx('th-top')}>Số điện thoại</th>
          <th className={cx('th-top')}>Địa chỉ</th>
          <th className={cx('th-top')}>Ngày đặt hàng</th>
          <th className={cx('th-top')}>Ngày giao</th>
          <th className={cx('th-top')}>Tổng cộng</th>
          <th className={cx('th-top')}>Nhân viên giao</th>
          <th className={cx('th-top')}>Tùy chọn</th>
        </tr>
        </thead>
              <tbody>
              {orders.map((order,index)=>{
                if(order.state === 4)
              return (<tr key={index}>
                <td className={cx('td','mark')}>{order.shippingPhone}</td>
                <td className={cx('td','mark')}>{order.shippingAddress}</td>
                <td className={cx('td','mark')}>{order.createdAt.substring(0, 10)}</td>
                <td className={cx('td','mark')}>{order.deliverAt.substring(0, 10)}</td>
                <td className={cx('td','mark')}>{order.totalPrice} vnd</td>
                <td className={cx('td','mark')}>{order.shipper.name}</td>
                <td className={cx('td','mark')}>
                <Link className={cx('btn-action-blue')} to={`/customer/order_detail/${order._id}`}>Xem chi tiết</Link> 
                </td>
              </tr>)
                })}    
              </tbody>
        </table>
      )}

      {activeStatus === 5 && (
        <table className={cx('table')}>
        <thead>
        <tr className={cx('tr-top')}>
          <th className={cx('th-top')}>Số điện thoại</th>
          <th className={cx('th-top')}>Địa chỉ</th>
          <th className={cx('th-top')}>Ngày đặt hàng</th>
          <th className={cx('th-top')}>Ngày giao thất bại</th>
          <th className={cx('th-top')}>Tổng cộng</th>
          <th className={cx('th-top')}>Nhân viên giao</th>
          <th className={cx('th-top')}>Tùy chọn</th>
        </tr>
        </thead>
              <tbody>
              {orders.map((order,index)=>{
                if(order.state === 5)
              return (<tr key={index}>
                <td className={cx('td','mark')}>{order.shippingPhone}</td>
                <td className={cx('td','mark')}>{order.shippingAddress}</td>
                <td className={cx('td','mark')}>{order.createdAt.substring(0, 10)}</td>
                <td className={cx('td','mark')}>{order.completeAt.substring(0, 10)}</td>
                <td className={cx('td','mark')}>{order.totalPrice} vnd</td>
                <td className={cx('td','mark')}>{order.shipper.name}</td>
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

export default List_Order_Shipper;