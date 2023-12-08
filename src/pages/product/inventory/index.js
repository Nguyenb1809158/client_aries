import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import rq_product from "~/utils/rq_product";
import styles from './inventory.module.scss'
const cx = classNames.bind(styles)
function Inventory() {
    const navigate = useNavigate()
    const {id} = useParams()
    const [inventory,setInventory] = useState([])
    useEffect(()=>{
        rq_product.get(`/inventory/${id}`)
        .then(
            res=>{
              if(res.data.denied)
              navigate('/denied')
              else
              setInventory(res.data.stock)
            })
    },[])
    return ( 
    <div className={cx('wrapper')}>
    <h2>Inventory of Products</h2>
    <table className={cx('table')}>
    <thead>
    <tr className={cx('tr-top')}>
      <th className={cx('th-top')}>Img</th>
      <th className={cx('th-top')}>Name</th>
      <th className={cx('th-top')}>Color</th>
      <th className={cx('th-top')}>Size</th>
      <th className={cx('th-top')}>Amount</th>
      <th className={cx('th-top')}>Action</th>
    </tr>
    </thead>
    <tbody>
    {inventory.length > 0 ? 
    (
      inventory.map((product,index)=>{
        return (<tr key={index}>
            <td className={cx('td','mark')}><img src={product.product.imageUrl[0]} className={cx('img-item')} alt="img product"></img></td>
            <td className={cx('td','mark')}>{product.product.name}</td>
            <td className={cx('td','mark')}>{product.color.color}</td>
            <td className={cx('td','mark')}>{product.size.size}</td>
            <td className={cx('td','mark')}>{product.quantityInStock}</td>
            <td className={cx('td','mark')}>
                <Link className={cx('btn-action-green')} to={`/product/add_inventory/${id}`}>Add Inventory</Link>
            </td>
          </tr>)
            })
            ) : 
        (<tr>
        <td colSpan={5}><p className={cx('no-inventory')}>Chưa có tồn kho của sản phẩm này</p></td>
        <td><Link className={cx('btn-action-green')} to={`/product/add_inventory/${id}`}>Add Inventory</Link></td>
        </tr>)}

        </tbody>
        </table>
        </div> );
}

export default Inventory;