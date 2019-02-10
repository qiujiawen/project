import React from 'react';
import {Menu,Icon} from 'antd';
import {Link,withRouter} from 'react-router-dom';
class MenuComponent extends React.Component{
    render(){
        let {theme,mode,className} = this.props;
        let keyValue=this.props.location.pathname.split('/')[1];
        return (
                <Menu
                    theme={theme}
                    mode={mode}
                    className={className}
                    selectedKeys={[keyValue]}
                >
                    <Menu.Item key='index'><Link to='/index/all'><Icon type='home'/>首页</Link></Menu.Item>
                    <Menu.Item key='book'><Link to='/book'><Icon type='book'/>新手入门</Link></Menu.Item>
                    <Menu.Item key='about'><Link to='/about'><Icon type='info-circle-o'/>关于</Link></Menu.Item>
                    <Menu.Item key='register'><Link to='/register'><Icon type="unlock" />注册</Link></Menu.Item>
                    <Menu.Item key='login'><Link to='/login'><Icon type="lock" />登录</Link></Menu.Item>
                </Menu>
        )
    }
};

export default withRouter(MenuComponent);