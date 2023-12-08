import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import rq_admin from "~/utils/rq_admin";
import styles from './employees.module.scss'
const cx = classNames.bind(styles)
function Employees() {
  const navigate = useNavigate()
    const [employees,setEmployees] = useState([])
    const [addnewemployees,setAdd]= useState(false)
    const [createfalse,setCreateFalse] =useState(false)

    const [ten_nv,setTenNV] =useState('')
    const [pass_nv,setPassNV] = useState('')
    const [pass_confirm,setPassConfirm] = useState('')
    const [phone_nv,setPhoneNV]= useState(0)
    const [dia_chi_nv,setDCNV] = useState('')
    const [email_nv,setEmailNV] = useState('')
    
    const handlerName = (e)=>{setTenNV(e.target.value)}
    const handlerPass = (e)=>{setPassNV(e.target.value)}
    const handlerPassConfirm = (e)=>{setPassConfirm(e.target.value)}
    const handlerPhone = (e)=>{setPhoneNV(e.target.value)}
    const handlerAddress = (e)=>{setDCNV(e.target.value)}
    const handlerEmail = (e)=>{setEmailNV(e.target.value)}

    const Apiadd = ()=>{
      if(pass_nv!=pass_confirm)
      alert('Mật khẩu xác nhận không đúng')
      else{
        if(ten_nv == '' || pass_nv == '' || phone_nv == '' || dia_chi_nv == '' || email_nv == '' )
        alert('Hãy điền đầy đủ thông tin trước khi tạo mới tài khoản nhân viên')
        else{
          rq_admin.post('/action_add_employee',{
            name : ten_nv,
            password : pass_nv,
            phone : phone_nv,
            address : dia_chi_nv,
            isActive : true,
            email : email_nv
          })
          .then(res=>{
            if(res.data.denied){
              navigate('/denied')
            }
            if(res.data.created)
            navigate(0)
            else setCreateFalse(true)
          })
        }
      }
      
    }
    useEffect(()=>{
        rq_admin.get('/employees')
        .then(
            res=>{
              if(res.data.denied)
              navigate('/denied')
              else
              setEmployees(res.data.employees)})
    },[])
    return ( 
    <div className={cx('wrapper')}>
    <h2>Employees</h2>
    <table className={cx('table')}>
    <thead>
    <tr className={cx('tr-top')}>
      <th className={cx('th-top')}>Address</th>
      <th className={cx('th-top')}>Name</th>
      <th className={cx('th-top')}>Phone</th>
      <th className={cx('th-top')}>Email</th>
      <th className={cx('th-top')}>Action</th>
    </tr>
    </thead>
    <tbody>
    {employees.length > 0 ? 
    (
      employees.map((employee,index)=>{
        return (
          <tr key={index}>
            <td className={cx('td','mark')}>{employee.address}</td>
            <td className={cx('td','mark')}>{employee.name}</td>
            <td className={cx('td','mark')}>{employee.phone}</td>
            <td className={cx('td','mark')}>{employee.email}</td>
            {employee.isActive ? 
            (<td className={cx('td','mark')}>     
                <button className={cx('btn-action-red')} onClick={()=>{
                  rq_admin.get(`/block_employee/${employee._id}`)
                  .then(res=>{
                    if(res.data.denied)
                    navigate('/denied')
                    else
                    navigate(0)
                  })
                }}>Block</button>
            </td>) : 
            (<td className={cx('td','mark')}>     
            <button className={cx('btn-action-green')} onClick={()=>{
              rq_admin.get(`/unblock_employee/${employee._id}`)
              .then(res=>{
                if(res.data.denied)
                navigate('/denied')
                else
                navigate(0)
              })
            }}>UnBlock</button>
            </td>)
            }
            
          </tr>
                                    )
            })
            ) : 
        (<tr>
        <td colSpan={5}><p className={cx('no-inventory')}>Chưa có Nhân Viên nào</p></td>
        </tr>)}
          {/* kich hoat form */}
        {!addnewemployees ? 
        (<tr>
          <td></td>
          <td colSpan={3}><button className={cx('btn-action-green')} onClick={()=>{setAdd(true)}}>Add New Employee</button></td>
          <td></td>
        </tr>) : 
        (<tr>
          <td colSpan={2}><span> Address</span><input type='text' className={cx('input')} onChange={handlerAddress}></input></td>
          <td><span> Name</span><input type='text' className={cx('input')} onChange={handlerName}></input></td>
          <td><span> Phone</span><input type='text' className={cx('input')} onChange={handlerPhone}></input></td>
          <td></td>
        </tr>)
        }
        {addnewemployees && (
          <tr>
            <td colSpan={2}><span> Email</span><input type='text' className={cx('input')} onChange={handlerEmail}></input></td>
            <td><span> Pass</span><input type='password' className={cx('input')} onChange={handlerPass}></input></td>
            <td><span> Pass Confirm</span><input type='password' className={cx('input')} onChange={handlerPassConfirm}></input></td>
            <td><button className={cx('btn-action-green')} onClick={Apiadd}>Add Now</button></td>
          </tr>
        )}

        {createfalse && <tr><td colSpan={6} className={cx('used')}>Số điện thoại này đã được sử dụng hãy chọn số khác</td></tr>}
        </tbody>
        </table>
        </div> );
}

export default Employees;