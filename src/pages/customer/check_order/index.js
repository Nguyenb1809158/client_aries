import { faCheck, faGift, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect,  useState } from "react";
import { useNavigate } from "react-router-dom";
import rq_customer from "~/utils/rq_customer";
import styles from './check_order.module.scss'
const cx = classNames.bind(styles)
function Check_Order() {
    const navigate = useNavigate()
    const[products,setProducts] = useState([])
    const[total,setTotal] = useState(0)
    const[total_prev,setTotalPrev] = useState(0)
    const[customer,setCustomer] = useState({})
    const[address,setAdd] = useState([])
    const[id_km,setID]=useState(null)
    const[add_kh,setAddkh]=useState('')
    const[phone_kh,setPhone]= useState('')
    const[promotion,setPromotion] = useState({})
    const[nopromo,setNoPromo] = useState(false)
    const[codepromo,setCode] = useState('')
    const[showdiscount,setShowdiscount] = useState(false)
    const handlertypingcode = (e)=>{
        setCode(e.target.value)
    }
    const handlerpromotion = ()=>{
      rq_customer.get('/check_promotion',{
        params:{
          code : codepromo
        }
      })
      .then(res=>{
        //neu co khuyen mai
        if(res.data.promotion != false){
          setID(res.data.promotion._id)
          setPromotion(res.data.promotion)
          setNoPromo(false)
          setTotalPrev(total)
          setTotal(total*(100 - res.data.promotion.discountPercentage)/100)
          setShowdiscount(true)
        }
        else
        setNoPromo(true)
      })
    }
    useEffect(()=>{
        rq_customer.get('/order/check')
        .then(
            res=>{
              if(res.data.denied)
              navigate('/denied')
              else
              {setAddkh(res.data.customer.addresses[0].address)
              setPhone(res.data.customer.phone)
              setProducts(res.data.products)
              setTotal(res.data.total)
              setAdd(res.data.customer.addresses)
              setCustomer(res.data.customer)
            }})
    },[])
    const handlerphone = (e)=>{setPhone(e.target.value)}
    const handlerAdd = (e)=>{setAddkh(e.target.value)}
    const handlerOrder = ()=>{
        rq_customer.post('/order/action',{
          promotion : id_km,
          shippingPhone : phone_kh,
          shippingAddress : add_kh,
          totalPrice : total
        })
        .then(res=>{
          if(res.data.denied)
          navigate('/denied')
          else
          if(res.data.ordered)
          navigate('/customer/order/list_order')
        })
    }
    return ( 
    <div className={cx('wrapper')}>
    <h2>Confirm Information of Your Order and Promotion</h2>

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
      {products.map((product,index)=>{
        return (
          <tr key={index}>
            <td className={cx('td','mark')}><img src={product.product.imageUrl[0]} className={cx('img-item')} alt="img product"></img></td>
            <td className={cx('td','mark')}>{product.name}</td>
            <td className={cx('td','mark')}>{product.quantity}</td>
            <td className={cx('td','mark')}>{product.size.size}</td>
            <td className={cx('td','mark')}>{product.color.color}</td>
            <td className={cx('td','mark')}>{product.product.price}</td>
            <td className={cx('td','mark')}>{product.total} vnd</td>
          </tr>
      )}) }

        {showdiscount && (
          <tr>
          <td colSpan={4} className={cx('td','mark')}></td>
          <td className={cx('td','mark')}>Discount : </td>
          <td className={cx('td','mark')}>{promotion.discountPercentage} %</td>
          <td className={cx('td','mark','total','discount')}>{total_prev} vnd</td>
          </tr>
        )}

        <tr>
        <td colSpan={5} className={cx('td','mark')}></td>
        <td className={cx('td','mark')}>Tổng cộng : </td>
        <td className={cx('td','mark','total')}>{total} vnd</td>
        </tr>

      </tbody>
      </table>
      <div className={cx('info-order')}>
          <h2>Thông tin vận chuyển và khuyến mãi <FontAwesomeIcon icon={faPaperPlane}  ></FontAwesomeIcon></h2>
        <div className={cx('form-info')}>
          <p>Số điện thoại khi nhận hàng</p>
          <input className={cx('input')} onChange={handlerphone} type='text' defaultValue={phone_kh}></input>
          <div>
          <p>Chọn địa chỉ giao hàng</p>
          <select onChange={handlerAdd}>
            {address.map((item)=>{
              return(<option>{item.address}</option>)
            })}     
          </select>
          </div>
          <p>Nhập mã khuyến mãi tại đây</p>
          <div className={cx('add-promo')}>
          <input className={cx('input')} type='text' onChange={handlertypingcode}></input>
          {!showdiscount && <button className={cx('btn-action-add')} onClick={handlerpromotion}>Áp dụng <FontAwesomeIcon icon={faGift}></FontAwesomeIcon></button>}
          </div>
          {nopromo && <p className={cx('no-promo')}>Mã khuyến mãi bạn nhập sai hoặc không còn áp dụng</p>}
          <button onClick={handlerOrder} className={cx('btn-confirm')}>Xác nhận thông tin và đặt hàng <FontAwesomeIcon icon={faCheck} ></FontAwesomeIcon></button>
        </div>
      </div>    
        </div> );

}

export default Check_Order;