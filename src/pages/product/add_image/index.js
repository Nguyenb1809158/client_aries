import classNames from "classnames/bind";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import rq_product from "~/utils/rq_product";
import styles from './add_image.module.scss'
const cx = classNames.bind(styles)
function AddImg() {
    const navigate = useNavigate()
    const {id} = useParams()
    const[link_hinh,setLink] = useState('')
    const handlerLink = (e)=>{
      if(e.target.value === null){
        alert('Link không thể để trống')
      }
      else 
      setLink(e.target.value)
    }
    const ApiSend = ()=>{
      if(link_hinh === null){
        alert('Link không thể để trống')
      }
      else{
        rq_product.post(`/add_image/${id}`,
        {
          sanPhamId : id,
          imageUrl : link_hinh
        })
        .then(res=>{
          if(res.data.denied)
          navigate('/denied')
          else
          navigate(-1)
        })
      } 
    }
    return ( 
    <div className={cx('wrapper')}>
    <div>
    <h2 className={cx('title')}>Thêm hình ảnh sản phẩm </h2>
    <form>
    <div class={cx('id-sp')}>
        <label for="description">ID sản phẩm : {id}</label>
    </div>
    <div class={cx('form-group')}>
        <p for="name">Link hình : </p>
        <input type="text" class={cx('input')} value={link_hinh} onChange={handlerLink}></input>
    </div>
    <div className={cx('btn-container')}>
    <button onClick={ApiSend} class={cx('btn-send')}>Add Image</button>
    </div>
    </form>

</div>
    </div> );
}

export default AddImg;