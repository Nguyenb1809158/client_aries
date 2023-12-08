import classNames from "classnames/bind";
import styles from './Listproduct.module.scss'
import request from "~/utils/request";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles)
function Listproduct({path,children}) {
    const [listProduct,setListProduct] = useState([])
    const [promotions,setPromotions] = useState([])
    useEffect(()=>{
    request.get(`/${path}`)
    .then((res)=>(setListProduct(res.data.products)))
    request.get(`/get_promotions`)
    .then((res)=>{
        if(res.data.products !==null){
            setPromotions(res.data.promotions)
        }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return ( 
    <div className={cx('wrapper')}>
        <div className={cx('container')}>
        <div className={cx('row ')}>
            <div className={cx('promotions col-lg-3')}>
                <h2>Promotion</h2>
                {promotions.map(promotion=>{
                    return(
                        <div className={cx('promotion-item')}>
                            <h4>Nhập mã : {promotion.code}</h4>
                            <p>ngày bắt đầu : {promotion.startDate.substring(0, 10)}</p>
                            <p>hạn sử dụng : {promotion.endDate.substring(0, 10)}</p>
                            <p>giảm : {promotion.discountPercentage} %</p>
                        </div>
                    )
                })}
            </div>
            <div className={cx('row products col-lg-9')}>
            {listProduct.map((product)=>{
            return (
            <div class={cx('home-product-item')} key={product.id}>
            <Link to={`/product/${product._id}`}>
            <div class={cx('img-product')} style={{ backgroundImage: `url(${product.imageUrl[0]})`}}></div>
            </Link>
            <Link to={`/product/${product._id}`}>
            <h4 class={cx('name-product')}>{product.name}</h4> 
            </Link>
            <div class={cx('price-product')}>
            <span>{product.price} vnd</span>
            </div>
            <p class={cx('count-product')}>số lượng hiện có  : {product.total}</p>
            </div>)
            })}
            </div>  
        </div>
        
    </div>
        </div>
     );
}

export default Listproduct;