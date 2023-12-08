import classNames from "classnames/bind";
import { useEffect,  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import rq_customer from "~/utils/rq_customer";
import styles from './love.module.scss'
const cx = classNames.bind(styles)
function Love() {
    const navigate = useNavigate()
    const[loves,setLoves] = useState([])
    useEffect(()=>{
        rq_customer.get('/love')
        .then(
            res=>{
              if(res.data.denied)
              navigate('/denied')
              else
              setLoves(res.data.loves)})
    },[])
    return ( 
    <div className={cx('wrapper')}>
    <h2>Love Products</h2>
    <table className={cx('table')}>
    <thead>
    <tr className={cx('tr-top')}>
      <th className={cx('th-top')}>Img</th>
      <th className={cx('th-top')}>Name</th>
      <th className={cx('th-top')}>Price</th>
      <th className={cx('th-top')}>Action</th>
    </tr>
    </thead>
    <tbody>
    {loves.length > 0 ? 
    (
      loves.map((product,index)=>{
        return (<tr key={index}>
            <td className={cx('td','mark')}><img src={product.imageUrl[0]} className={cx('img-item')} alt="img product"></img></td>
            <td className={cx('td','mark')}>{product.name}</td>
            <td className={cx('td','mark')}>{product.price}</td>
            <td className={cx('td','mark')}>
                <Link className={cx('btn-action-green')} to={`/product/${product._id}`}>Go to Detail Page</Link>
                <Link className={cx('btn-action-red')}>
                  <button onClick={()=>{
                    rq_customer.delete(`/delete_love_product/${product._id}`)
                    .then(res=>{
                      if(res.data.denied)
                      navigate('/denied')
                      else
                      navigate(0)
                    })
                  }} className={cx('btn-delete')}>Delete</button>
                  </Link>
            </td>
          </tr>

          )
            })
            ) : 
        (<tr>
        <td className={cx('td','mark')} colSpan='4'><p className={cx('no-love')}>Chưa có Sản phẩm yêu thích</p></td> 
        </tr>)}

        </tbody>
        </table>
        </div> );
}

export default Love;