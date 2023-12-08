import { faCircleXmark  , faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import HeadlessTipy from '@tippyjs/react/headless'
import Tippy from '@tippyjs/react';
import { Wrapper as PopperWrapper } from '../Popper';
import AccountItem from '../../../AccountItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Search.module.scss'
import React, { useState ,useEffect, useRef } from 'react';
import { useDebounce } from '~/hooks';
import request from '~/utils/request';
const cx = classNames.bind(styles)
function Search() {
    const [searchValue,setSearchValue] = useState('')
    const [searchResult,setSearchResult] = useState([])
    const [showResult,setShowResult] = useState(true)
    const inputRef = useRef()
    const debounce = useDebounce(searchValue,300)
    useEffect(()=>{
        if(!debounce.trim()) return
        request
        .get('/search',{
            params:{
                key:debounce,
            }
        })
        .then((res)=>{
            setSearchResult(res.data.products)})
    },[debounce])
    const HandleClickOutside = ()=> setShowResult(false)
    return ( 
        <HeadlessTipy
                interactive
                visible={showResult && searchResult.length>0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>
                                Products Found
                            </h4>
                            {searchResult.map((item)=>(
                                <AccountItem key={item.id} data={item}></AccountItem>
                            ))}
                            
                        </PopperWrapper>
                    </div>
                                )}
                onClickOutside={HandleClickOutside}>
                <div className={cx('search')}>
                    <input placeholder='Find Your Products' 
                            ref = {inputRef}
                            value={searchValue}
                            spellCheck={false}
                            onFocus = {()=>setShowResult(true)}
                            onChange={(e=>(setSearchValue(e.target.value)))}>
                    </input>
                    {!!searchValue && (
                        <button className={cx('clear')} onClick={()=>{
                            setSearchValue('')
                            setSearchResult([])
                            inputRef.current.focus()
                        }}>
                            <FontAwesomeIcon icon={faCircleXmark}></FontAwesomeIcon>
                        </button>
                    )}
                    <Tippy content="Tìm kiếm"><button className={cx('search-btn')}><FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon></button></Tippy>
                </div>
            </HeadlessTipy>
     );
}

export default Search;