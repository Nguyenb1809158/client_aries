import classNames from "classnames/bind";
import { useEffect,  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dialog from "~/components/Dialog";
import rq_nv from "~/utils/employee";
import rq_product from "~/utils/rq_product";
import styles from './products.module.scss'
const cx = classNames.bind(styles)
function Stored() {
    const [products,setProducts] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        rq_product.get('/products')
        .then(res=>{
          if(res.data.denied)
          navigate('/denied')
          else
          setProducts(res.data.products)
        }
          )
    },[])
    return ( 
    <div className={cx('wrapper')}>
    <div>
    <h2>Products</h2>
    <table className={cx('table')}>
    <thead>
    <tr>
      <th className={cx('th-top')}>Img</th>
      <th className={cx('th-top')}>Name</th>
      <th className={cx('th-top')}>Description</th>
      <th className={cx('th-top')}>Amount</th>
      <th className={cx('th-top')}>Action</th>
    </tr>
    </thead>
    <tbody>
    {products.length > 0 ? 
    (
      products.map((product,index)=>{
        return (<tr key={index}>
            <td className={cx('td','mark')}><img src={product.imageUrl[0]} className={cx('img-item')} alt="img product"></img></td>
            <td className={cx('td','mark')}>{product.name}</td>
            <td className={cx('td','mark')}>{product.description}</td>
            <td className={cx('td','mark')}>{product.total}</td>
            <td className={cx('td','group-action-one','mark')}>
                <Link className={cx('btn-action-green')} to={`/product/add_inventory/${product._id}`}>Add Inventory</Link>
                <Link className={cx('btn-action-blue')} to={`/product/inventory/${product._id}`}>Inventory</Link>
            </td>
            <td className={cx('td','group-action-two','mark')}> 
                <Link className={cx('btn-action-brown')} to={`/product/edit/${product._id}`}>Edit</Link>
                <Link className={cx('btn-action-light-green')} to={`/product/add_img/${product._id}`}>Add Image</Link>
                {/* <Link className={cx('btn-action-red')} to={`/product/delete/${product.id}`}>Delete</Link> */}
            </td>
          </tr>)
      })
      ) : 
    (<tr>
      <td colspan="5" >Bạn chưa tạo sản phẩm nào
        <a href="/product/create">Create Product now!</a>
      </td>
    </tr>)}

  </tbody>
</table>
</div>
    </div> );
}

export default Stored;