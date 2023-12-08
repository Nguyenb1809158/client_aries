import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import rq_customer from "~/utils/rq_customer";
import styles from './cart.module.scss'
const cx = classNames.bind(styles)
function Cart() {
    const navigate = useNavigate()
    const[products,setProducts] = useState([])
    const[total,setTotal] = useState(0)
    const[showMessage,setShowMessage] = useState(false) //set trang thai thong bao khi het hang
    useEffect(()=>{
        rq_customer.get('/cart')
        .then(
            res=>{
              if(res.data.denied)
                navigate('/denied')
                else{
                setProducts(res.data.products)
                setTotal(res.data.total)
                }
                })
    },[])
    const handlerOrder = ()=>{
      rq_customer.get('/order')
      .then(res=>{
        if(res.data.denied)
        navigate('/denied')
        else
        if(res.data.order==true){
          navigate('/customer/order/check')
        }
        else setShowMessage(true)
      })
    }
    return ( 
    <div className={cx('wrapper')}>
    <h2>My Cart</h2>
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
      <th className={cx('th-top')}>Action</th>
    </tr>
    </thead>
    <tbody>
    {products.length > 0 ? 
    (
      products.map((product,index)=>{
        return (<tr key={index}>
            <td className={cx('td','mark')}><img src={product.product.imageUrl[0]} className={cx('img-item')} alt="img product"></img></td>
            <td className={cx('td','mark')}>{product.product.name}</td>
            <td className={cx('td','mark')}>{product.quantity}</td>
            <td className={cx('td','mark')}>{product.size.size}</td>
            <td className={cx('td','mark')}>{product.color.color}</td>
            <td className={cx('td','mark')}>{product.product.price}</td>
            <td className={cx('td','mark')}>{product.quantity * product.product.price} vnd</td>
            <td className={cx('td','mark')}>
                <Link className={cx('btn-action-red')}>
                  <button onClick={()=>{
                    rq_customer.delete(`/cart/delete/${product._id}`)
                    .then(res=>{
                      if(res.data.denied)
                      navigate('/denied')
                      else
                      navigate(0)
                    })
                  }} className={cx('btn-delete')}>Delete</button>
                </Link>
            </td>
          </tr>)
            })    
            ) : 
        (<tr>
          <td className={cx('td','mark')} colSpan={8}><p className={cx('no-love')}>Chưa có sản phẩm trong giỏ</p></td>
        </tr>)}

        {products.length > 0 ?(<tr>
        <td colSpan={5} className={cx('td','mark')}></td>
        <td className={cx('td','mark')}>Tổng tạm tính : </td>
        <td className={cx('td','mark','total')}>{total} vnd</td>
        <td className={cx('td','mark')}><button onClick={handlerOrder} className={cx('btn-action-green')}>Order</button></td>
        </tr>)  : (<div></div>)}  

        </tbody>
        </table>
          {showMessage && <p className={cx('message')}>Một số sản phẩm đã không đủ số lượng bạn yêu cầu khi bạn đi vắng vui lòng điều chỉnh số lượng trước khi đặt hàng</p>}
        </div> );

}

export default Cart;