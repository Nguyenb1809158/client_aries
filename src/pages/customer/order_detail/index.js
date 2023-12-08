import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import rq_customer from "~/utils/rq_customer";
import styles from './order_detail.module.scss'
const cx = classNames.bind(styles)
function Order_detail() {
    const {id} = useParams()
    const navigate = useNavigate()
    const[products,setProducts] = useState([])
    const[prevtotal,setPrevTotal]=useState(0)
    const[total,setTotal] = useState(0)
    const[promotion,setPromo] = useState(0)
    useEffect(()=>{
        rq_customer.get(`/order_detail/${id}`)
        .then(
            res=>{
              setPrevTotal(res.data.prev_total)
              setTotal(res.data.total)
              setPromo(res.data.discountPercentage)
              setProducts(res.data.products)
              })
    },[])
    return ( 
    <div className={cx('wrapper')}>
    <h2>Detail</h2>

    <table className={cx('table')}>
    <thead>
    <tr className={cx('tr-top')}>
      <th className={cx('th-top')}>Img</th>
      <th className={cx('th-top')}>Name</th>
      <th className={cx('th-top')}>Amount</th>
      <th className={cx('th-top')}>Size</th>
      <th className={cx('th-top')}>Color</th>
      <th className={cx('th-top')}>Price</th>
      <th className={cx('th-top')}>Total</th>
    </tr>
    </thead>
    <tbody>
      {
        products.map((product,index)=>{
          return (<tr key={index}>
            <td className={cx('td','mark')}><img src={product.product.imageUrl[0]} className={cx('img-item')} alt="img product"></img></td>
            <td className={cx('td','mark')}>{product.product.name}</td>
            <td className={cx('td','mark')}>{product.quantity}</td>
            <td className={cx('td','mark')}>{product.size.size}</td>
            <td className={cx('td','mark')}>{product.color.color}</td>
            <td className={cx('td','mark')}>{product.price}</td>
            <td className={cx('td','mark')}>{product.price * product.quantity} vnd</td>
          </tr>)
        })
      }
        <tr>
        <td colSpan={4} className={cx('td','mark')}></td>
        <td className={cx('td','mark')}>Discount : </td>
        <td className={cx('td','mark')}>{promotion} %</td>
        <td className={cx('td','mark','total','discount')}>{prevtotal} vnd</td>
        </tr>

        <tr>
        <td colSpan={5} className={cx('td','mark')}></td>
        <td className={cx('td','mark')}>Tổng cộng : </td>
        <td className={cx('td','mark','total')}>{total} vnd</td>
        </tr>  

      </tbody>
      </table>
          
        </div> )

}

export default Order_detail;