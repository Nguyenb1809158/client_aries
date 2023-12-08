import classNames from "classnames/bind";
import {  useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import rq_product from "~/utils/rq_product";
import styles from './edit.module.scss'
const cx = classNames.bind(styles)
function Edit() {
    const {id} = useParams()
    const navigate = useNavigate()
    const[product,setProduct] =  useState({})
    const handlerName = (e)=>{
      if(e.target.value === null){
        alert('Name Product không thể để trống')
      }
      else 
      setProduct(product=>{
        product.name = e.target.value
        return product
      })
    }
    const handlerDes = (e)=>{
      if(e.target.value === null){
        alert('Hãy mô tả sản phẩm')
      }
      else 
      setProduct(product=>{
        product.description = e.target.value
        return product
      })
    }
    const handlerpriceBan = (e)=>{
      if(e.target.value === 0){
        alert('Nhập giá bán sp')
      }
      else 
      setProduct(product=>{
        product.price = e.target.value
        return product
      })
    }
    useEffect(()=>{
      rq_product.get(`/edit/${id}`,{
        params:{id:id}
      })
      .then(res=>{
        if(res.data.denied)
          navigate('/denied')
          else
        {setProduct(res.data.product)}
      })
    },[])
    const ApiSend = ()=>{
      if( product.name ===null || product.description === null ||  product.price ===0 ){
        alert('Hãy điền đầy đủ thông tin')
      }
      else{
        rq_product.put(`/update/${id}`,
        {
          name : product.name,
          description : product.description,
          price :product.price
        })
        .then(res=>{
          if(res.data.denied)
          navigate('/denied')
        else
          alert('cập nhật thành công')
        })
      } 
    }
    return ( 
    <div className={cx('wrapper')}>
    <h2 className={cx('title')}>Chỉnh sửa sản phẩm</h2>
    <form  method="put">
    <div class={cx('form-group')}>
        <p for="description">Tên sản phẩm</p>
        <input type="text" onChange={handlerName} Value={product.name} class={cx('input')}></input>
    </div>
    <div class={cx('form-group')}>
        <p for="name">Mô tả sản phẩm</p>
        <input type="text" onChange={handlerDes} Value={product.description} class={cx('input')} ></input>
    </div>
    <div class={cx('form-group')}>
        <p for="slug">Giá </p>
        <input type="text" onChange={handlerpriceBan} Value={product.price} class={cx('input')} ></input>
    </div>
    <div className={cx('btn-container')}>
    <button type="submit" onClick={ApiSend} class={cx('btn-send')}>Cập nhật</button>
    </div>
    </form>
    </div> );
}

export default Edit;