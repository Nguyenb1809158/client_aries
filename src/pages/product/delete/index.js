import classNames from "classnames/bind";
import { useEffect,  useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import rq_product from "~/utils/rq_product";
import styles from './delete.module.scss'
const cx = classNames.bind(styles)
function Delete() {
    const navigate = useNavigate()
    const [product,setProduct] = useState({})
    const {id} = useParams()
    const ApiDelete = ()=>{
      rq_product.delete(`/action_delete/${product.id}`,{
        params:{
          id : product.id
        }
      })
      .then(res=>{
        if(res.data.denied)
          navigate('/denied')
          else
        navigate(-1)
      })
    }
    const Back = ()=>{
      navigate(-1)
    }
    useEffect(()=>{
        rq_product.get(`/delete/${id}`)
        .then(res=>{
          if(res.data.denied)
          navigate('/denied')
          else
          setProduct(res.data.product)
        })
    })
    
    return ( 
    <div className={cx('wrapper')}>
      <div>
        <h2 className={cx('title')}>Xác nhận xóa sản phẩm</h2>
        <div className={cx('info-product')}>
          <img className={cx('img')} alt="img product" src={product.img_avatar}></img>
          <div>
            <h3>{product.ten_sp}</h3>
            <h4>{product.description}</h4>
            <h3 className={cx('note')}>Lưu ý việc xóa sẽ không thể hoàn tác , hãy kiểm tra thật kỹ trước khi thao tác</h3>
            <div className={cx('group-btn')}>
            <button onClick={Back} className={cx('no-btn')}>Không, Quay lại</button>
            <button onClick={ApiDelete} className={cx('yes-btn')}>Có , Xóa đi</button>
            </div>
          </div>
        </div>
      </div>
    </div> );
}

export default Delete;