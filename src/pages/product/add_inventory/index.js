import classNames from "classnames/bind";
import { useEffect,  useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import rq_product from "~/utils/rq_product";
import styles from './add_inventory.module.scss'
const cx = classNames.bind(styles)
function AddInventory() {
    const[colors,setColors] = useState([])
    const[sizes,setSizes] = useState([])
    const[id_size,setIDSize] = useState(0)
    const[id_mau,setIDMau] = useState(0)
    const[so_luong,setSL] = useState(1)
    const {id} = useParams()
    const navigate = useNavigate()
    const handlerSL = (e)=>{
      if(e.target.value<0)
      alert('Số lượng không thể nhỏ hơn 1 ')
      else
      setSL(e.target.value)
    }
    const handlerColor = (e)=>{
      if(e.target.value==-1)
      alert('Chọn color bạn nhé')
      else
      setIDMau(e.target.value)
    }
    const handlerSize = (e)=>{
      if(e.target.value==-1)
      alert('Chọn size bạn nhé')
      else
      setIDSize(e.target.value)
    }
    const ApiSend = ()=>{
      if(id_mau==0 || id_size==0 || so_luong<1)
      alert('Lựa chọn chưa phù hợp vui lòng chọn lại')
      else{
        rq_product.post('/action/add_inventory',{
          product : id,
          size : id_size,
          color : id_mau,
          quantityInStock : so_luong
        })
        .then(res=>{
          var temp = res.data.sent
          if(res.data.denied)
          navigate('/denied')
          else
          if(res.data.sent){
            alert('Thêm tồn kho thành công')
            temp = false
          }
        })
      }
    }
    useEffect(()=>{
      rq_product.get(`/add_inventory/${id}`)
      .then(res=>{
        if(res.data.denied)
          navigate('/denied')
          else
        {setColors(res.data.colors)
        setSizes(res.data.sizes)}
      })
    },[])
    return ( 
    <div className={cx('wrapper')}>
    <div>
    <h2 className={cx('title')}>Thêm số dư tồn kho </h2>
    <form>
    <div class={cx('id-sp')}>
        <label for="description">ID sản phẩm : {id}</label>
    </div>
    <div class={cx('form-group')}>
        <p for="description">Màu</p>
         <select class={cx('select')} onChange={handlerColor}>
            <option value="-1">Chọn màu sản phẩm </option>
            {colors.map((color,index)=>{
              return(<option value={color._id}>{color.color}</option>)
            })}
         </select>
    </div>
    <div class={cx('form-group')}>
        <p for="description">Kích cỡ</p>
         <select class={cx('select')} onChange={handlerSize}>
            <option value="-1">Chọn kích cỡ sản phẩm </option>
            {sizes.map((size,index)=>{
              return(<option value={size._id}>{size.size}</option>)
            })}
         </select>
    </div>
    <div class={cx('form-group')}>
        <p for="name">Số lượng </p>
        <input type="text" class={cx('input')} value={so_luong} onChange={handlerSL}></input>
    </div>
    <div className={cx('btn-container')}>
    <button onClick={ApiSend} class={cx('btn-send')}>Add Inventory</button>
    </div>
    </form>

</div>
    </div> );
}

export default AddInventory;