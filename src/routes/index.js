import Home from '~/pages/site/Home';
import Hat from '~/pages/site/Hat';
import Tshirt from '~/pages/site/Tshirt';
import { HeaderOnly } from '~/components/Layout';
import Wallet from '~/pages/site/Wallet';
import Glass from '~/pages/site/Glass';
import Balo from '~/pages/site/Balo';
import Regist from '~/pages/site/Regist';
import Login from '~/pages/site/Login';
import Logout from '~/pages/site/Logout';
import Detail from '~/pages/product/Detail';
import Stored from '~/pages/product/stored_products/products';
import Inventory from '~/pages/product/inventory';
import AddInventory from '~/pages/product/add_inventory';
import AddImg from '~/pages/product/add_image';
import Create from '~/pages/product/create';
import Edit from '~/pages/product/edit';
import Delete from '~/pages/product/delete';
import Address from '~/pages/customer/address';
import Love from '~/pages/customer/love';
import Cart from '~/pages/customer/cart';
import List_Order from '~/pages/customer/list_order';
import List_Order_Admin from '~/pages/admin/list_order';
import List_Order_Shipper from '~/pages/shipper/list_order_shipper';
import List_Order_Employee from '~/pages/nhan_vien/orders_employee';
import Check_Order from '~/pages/customer/check_order';
import Order_detail from '~/pages/customer/order_detail';
import Promotions from '~/pages/admin/promotions';
import Employees from '~/pages/admin/employees';
import Shippers from '~/pages/admin/shippers';
import Deny from '~/components/Layout/components/Deny';
import Password from '~/pages/site/Password';
import AddPromotions from '~/pages/admin/add_promotion';
const publicRoutes = [
    {path: '/',component: Home, layout : HeaderOnly},
    {path: '/regist',component: Regist , layout : HeaderOnly},
    {path: '/login',component: Login },
    {path: '/logout',component: Logout , layout : Logout},
    {path: '/hat',component: Hat , layout : HeaderOnly},
    {path: '/t-shirt',component: Tshirt , layout : HeaderOnly},
    {path: '/wallet',component: Wallet , layout : HeaderOnly},
    {path: '/glass',component: Glass , layout : HeaderOnly},
    {path: '/balo',component: Balo , layout : HeaderOnly},

    {path: '/product/create',component: Create, layout : HeaderOnly},
    {path: '/product/edit/:id',component: Edit, layout : HeaderOnly},
    {path: '/product/delete/:id',component: Delete, layout : HeaderOnly},
    {path: '/product/:id',component: Detail, layout : HeaderOnly},
    {path: '/product/inventory/:id',component: Inventory, layout : HeaderOnly},
    {path: '/product/add_img/:id',component: AddImg, layout : HeaderOnly},
    {path: '/product/add_inventory/:id',component: AddInventory, layout : HeaderOnly},
    {path: '/products',component: Stored, layout : HeaderOnly},

    {path: '/customer/order_detail/:id',component: Order_detail, layout : HeaderOnly},
    {path: '/customer/address',component: Address, layout : HeaderOnly},
    {path: '/customer/love',component: Love, layout : HeaderOnly},
    {path: '/customer/cart',component: Cart, layout : HeaderOnly},
    {path: '/customer/order/list_order',component: List_Order, layout : HeaderOnly},
    {path: '/customer/order/check',component: Check_Order, layout : HeaderOnly},

    {path: '/admin/orders',component: List_Order_Admin, layout : HeaderOnly},
    {path: '/admin/promotions',component: Promotions, layout : HeaderOnly},
    {path: '/admin/add_promotion',component: AddPromotions, layout : HeaderOnly},
    {path: '/admin/employees',component: Employees, layout : HeaderOnly},
    {path: '/admin/shippers',component: Shippers, layout : HeaderOnly},

    {path: '/shipper/orders',component: List_Order_Shipper, layout : HeaderOnly},

    {path: '/employee/orders',component: List_Order_Employee, layout : HeaderOnly},

    
    {path: '/denied',component: Deny, layout : HeaderOnly},

    {path: '/password/change/:phone',component: Password, layout : HeaderOnly},
]

const privateRoutes = [

]

export { publicRoutes , privateRoutes}