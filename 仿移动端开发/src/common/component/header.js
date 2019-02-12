import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
export default class Header extends React.Component{
    render(){
        let {menu,login,back,changedOpenMenu} = this.props;
        let {user} = this.context;
        return (
            <header className='header'>
                {menu?<a
                         className='header-btn header-btn-left iconfont icon-hycaidan'
                         onTouchEnd={(e)=>{
                             changedOpenMenu();
                             e.stopPropagation();
                         }}
                >
                </a>:''}
                {back?<a
                         className='header-btn header-btn-left iconfont icon-back'
                         onTouchEnd={()=>{
                             if (window.history.length>1){
                                 window.history.back();
                             } else {
                                 window.location.href = '/';
                             }
                         }}
                >
                </a>:''}
                <img src={require('../../common/img/logo.png')} alt="" id='logo'/>
                {/*<span className='header-btn header-btn-right header-btn-username'>miaov</span>*/}
                {
                    user?(<span className='header-btn header-btn-right header-btn-username'>{login?user:''}</span>)
                    :(login?<Link to='/login' className='header-btn header-btn-right iconfont icon-denglu'></Link>:'')
                }
            </header>
        )
    }
}
Header.contextTypes = {
    user:PropTypes.string
};