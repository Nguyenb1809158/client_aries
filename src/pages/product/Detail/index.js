import classNames from "classnames/bind";
import styles from './Detail.module.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect,  useState } from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faChevronDown, faChevronUp, faHeartCirclePlus } from "@fortawesome/free-solid-svg-icons";
import rq_product from "~/utils/rq_product";
import { useNavigate, useParams } from "react-router-dom";
import rq_customer from "~/utils/rq_customer";
const cx = classNames.bind(styles)

function Detail() {
    const {id} = useParams()
    const navigate = useNavigate()

    const [access,setAccsess] = useState(false)
    const [loved,setLoved] = useState(false)
    const [colors,setColors] = useState([])
    const [sizes,setSizes] = useState([])
    const [img,setImg] = useState([{}])
    const [product,setProduct] = useState({})
    const [amount,setAmount] = useState(-1) //so hang co trong kho

    const [ten_mau,setTenMau] = useState('')
    const [id_mau,setIDMau] = useState(null)
    const [ten_size,setTenSize] = useState('')
    const [id_size,setIDSIze] = useState(null)
    const [so_luong,SetSL] = useState(1)

    const [activeColor,setActive] = useState(null)
    const [activeSize,setSize] = useState(null)

    const upOne = ()=>{
        if(so_luong < amount)
        SetSL((prev)=>prev+1)
        else 
        alert('Chúng tôi không có đủ sản phẩm bạn yêu cầu')
    }
    const downOne = ()=>{if(so_luong>1){SetSL((prev)=>prev-1)}}
    // hàm thêm vào sản phẩm yêu thích khi nhấn nút
    const handlerAddLove = ()=>{
        rq_customer.get(`/add_love/${id}`)
        .then(res=>{
            if(res.data.denied)
            setAccsess(true)
            else
            if(res.data.add){
                navigate('/customer/love')
            }
            else{
                setLoved(true)
            }
        })
    }

    const handlerAddcart = ()=>{
        if(amount == -1)
        alert('Vui lòng chọn size và màu sắc trước khi thêm vào giỏ hàng')
        else if(amount < so_luong)
        alert('Không đủ sản phẩm có sẵn , vui lòng giảm số lượng mua hoặc chọn sản phẩm khác')
        else{
            rq_customer.post('/add_product',{
                product : id,
                color : id_mau,
                size : id_size,
                quantity : so_luong,
            })
            .then(res=>{
                if(res.data.denied)
                setAccsess(true)
                else
                if(res.data.add)
                navigate('/customer/cart')
            })
        }
    }
    // gọi api hiển thị thông tin các size có sẵn 
    useEffect(()=>{
        rq_product.get(`/${id}`)
        .then(res=>{
            setColors(res.data.colors)
            setSizes(res.data.sizes)
            setProduct(res.data.product)
            setImg(res.data.product.imageUrl)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    // gọi api lấy tồn kho
    useEffect(()=>{
        if(id_mau!=null && id_size!=null)
        {
            rq_product.post(`/${id}`,{
                product : id,
                size : id_size,
                color : id_mau
            })
            .then(res=>(setAmount(res.data.ton_kho)))
        }
    })

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      }
    return ( <div className={cx('wrapper')}>
        <div className={cx('content')}>
        <div className={cx('image-product')}>
            <Slider {...settings}>
                {img.map((item)=>{
                    return(
                        <div key={item._id}>
                        <img className={cx('img-item')} alt='img product' src={item}></img>
                        </div>
                    )
                })}
            </Slider>
        </div>
        <div className={cx('info-product')}>
            <h2>{product.name}</h2>
            <h1>Giá bán : {product.price} vnd</h1>
            <h4>{product.description}</h4>
            <div className={cx('colors')}>
                <span className={cx('title-size-color')}>Màu Sắc</span>
                {
                    colors.map((curentColor,index)=>{
                        return (<button key={curentColor._id} onClick={()=>{setActive(curentColor.color);setIDMau(curentColor._id);setTenMau(curentColor.color)}} className={cx('color-btn',`${activeColor === curentColor.color && 'active'}`)}>{curentColor.color}</button>)
                    })
                }
            </div>
            <div className={cx('sizes')}>
                <span className={cx('title-size-color')}>Kích Cỡ</span>
                {
                    sizes.map((currentSize,index)=>{
                        return (<button key={currentSize._id} onClick={()=>{setSize(currentSize.size);setIDSIze(currentSize._id);setTenSize(currentSize.size)}} className={cx('size-btn',`${activeSize === currentSize.size && 'active'}`)}>{currentSize.size}</button>) //bên trong 3 dấu bằng đó là true hoặc false nếu là true sẽ gán active 
                    })
                }
            </div>
            <div>
                {sizes.map((size)=>{
                    return(<h5 key={size._id} className={cx('size-detail')}>{size.description}</h5>)
                })}
            </div>
            <div className={cx('amount-area')}>
            <span className={cx('title-amount')}>Số lượng</span>
            <input className={cx('amount')} value={so_luong}></input>
            <button className={cx('btn-icon')} onClick={upOne}><FontAwesomeIcon icon={faChevronUp} className={cx('icon-up')}></FontAwesomeIcon></button>
            <button className={cx('btn-icon')} onClick={downOne}><FontAwesomeIcon icon={faChevronDown} className={cx('icon-down')}></FontAwesomeIcon></button>
                {amount>-1 ? (<h4> {amount} sản phẩm có sẵn</h4>) : (<div></div>)}
            </div>
            
            <div className={cx('btn-group')}>
            <button className={cx('add-love')} onClick={handlerAddLove}><FontAwesomeIcon icon= {faHeartCirclePlus} ></FontAwesomeIcon> Thêm vào yêu thích </button>
            <button className={cx('add-cart')} onClick={handlerAddcart}><FontAwesomeIcon icon= {faCartArrowDown} ></FontAwesomeIcon> Thêm vào giỏ hàng</button>
            </div>
            {loved && <p>Sản phẩm này đã có trong danh sách sản phẩm yêu thích</p>}
            {access && <p>Bạn phải là khách hàng để sử dụng tính năng này</p>}
        </div>
        </div>
    </div> )
}

export default Detail;