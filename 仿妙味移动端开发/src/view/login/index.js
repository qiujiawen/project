import React from 'react';
import Header from '../../common/component/header';
import Menu from '../../common/component/menu';
import LoginForm from './login';
import RegisterForm from './register';
import '../../common/css/login.css';
export default class Login extends React.Component{
    state = {
        headerState:{
            menu : false,
            login : true,
            back : true
        },
        isLogin:true
    };

    changeIsLogin = ()=>{
        this.setState({
            isLogin:!this.state.isLogin
        });
    };

    render(){
        let {isLogin} = this.state;
        return (
            <div className='login-wrap'>
                <Header
                    {...this.state.headerState}
                />
                <Menu/>
                <div className='page' id='login-page'>
                    <div className='page-con'>
                        <h2 className='login-title'>
                            <img src={require('../../common/img/loginTitle.png')} alt=""/>
                        </h2>
                        <div className='login-page'>
                            <div
                                className='login-3d'
                                style={{
                                    transform: isLogin?'rotateY(0deg)':'rotateY(-180deg)'
                                }}
                            >
                                <LoginForm
                                    changeIsLogin = {this.changeIsLogin}
                                />
                                <RegisterForm
                                    changeIsLogin = {this.changeIsLogin}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}