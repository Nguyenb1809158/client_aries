import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss'
import {Wrapper as PopperWrapper} from '../../Popper/index'
import MenuItem from "./MenuItem";
const cx = classNames.bind(styles)
function Menu({children,items = []}) {
    const renderItems = ()=>{
        return items.map((item,index)=> <MenuItem key={index} data={item}></MenuItem>)
    }
    return ( 
        <Tippy
        interactive
        delay={[0,500]}
        render={(attrs) => (
        <div className={cx('content')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>{renderItems() }</PopperWrapper>
        </div>
                    )}>
        {children}
        </Tippy>
     );
}

export default Menu;