import classNames from "classnames/bind";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import rq_product from "~/utils/rq_product";
import styles from './create.module.scss'
const cx = classNames.bind(styles)
function Create() {
    const navigate = useNavigate()
    const[id_loai,setIDLoai] = useState(-1)
    const[ten_sp,setTen] =useState('')
    const[description,setDescription] = useState('')
    const[img_avatar,setImg] = useState('')
    const[gia_ban,setGiaBan] = useState(0)
    const handlerName = (e)=>{
      if(e.target.value === null){
        alert('Name Product không thể để trống')
      }
      else 
      setTen(e.target.value)
    }
    const handlerDes = (e)=>{
      if(e.target.value === null){
        alert('Hãy mô tả sản phẩm')
      }
      else 
      setDescription(e.target.value)
    }
    const handlerImg = (e)=>{
      if(e.target.value === null){
        alert('Nhập link hình ảnh')
      }
      else 
      setImg(e.target.value)
    }
    const handlerGiaBan = (e)=>{
      if(e.target.value == 0){
        alert('Nhập giá bán sp')
      }
      else 
      setGiaBan(e.target.value)
    }
    const handlerType = (e)=>{
      if(e.target.value == -1){
        alert(' chọn loại sản phẩm')
      }
      else 
      setIDLoai(e.target.value)
    }
    const ApiSend = ()=>{
      if(id_loai == -1 || ten_sp ==null || description == null || img_avatar ==null || gia_ban ==0 ){
        alert('Thông tin sản phẩm chưa đủ')
      }
      else{
        rq_product.post('/store',
        {
          category : id_loai,
          name : ten_sp,
          description : description,
          imageUrl : img_avatar,
          price :gia_ban
        })
        .then(res=>{
          var temp = res.data.create
          if(res.data.denied)
          navigate('/denied')
          else
          if(temp)
          {alert('Thêm sản phẩm thành công')
          temp = false}
        })
      } 
    }
    return ( 
    <div className={cx('wrapper')}>
    <h2 className={cx('title')}>Create Product</h2>
    <form>
    <div class={cx('form-group')}>
        <p for="description">Tên sản phẩm</p>
        <input type="text" onChange={handlerName} value={ten_sp} class={cx('input')}></input>
    </div>
    <div class={cx('form-group')}>
        <p for="description">Loại sản phẩm</p>
         <select class={cx('select')} onChange={handlerType} >
            <option value="-1">Chọn loại sản phẩm</option>
            <option value="1">Áo Thun</option>
            <option value="2">Nón</option>
            <option value="3">Ví</option>
            <option value="4">Mắt Kính</option>
            <option value="5">Balo</option>
         </select>
    </div>
    <div class={cx('form-group')}>
        <p for="name">Mô tả sản phẩm</p>
        <input type="text" onChange={handlerDes} value={description} class={cx('input')} ></input>
    </div>
    <div class={cx('form-group')}>
        <p for="videoID">Ảnh đại diện sản phẩm</p>
        <input type="text" onChange={handlerImg} value={img_avatar} class={cx('input')} ></input>
    </div>
    <div class={cx('form-group')}>
        <p for="slug">Giá bán </p>
        <input type="text" onChange={handlerGiaBan} class={cx('input')} ></input>
    </div>
    <div className={cx('btn-container')}>
    <button type="submit" onClick={ApiSend} class={cx('btn-send')}>Create</button>
    </div>
    </form>
    </div> );
}

export default Create;