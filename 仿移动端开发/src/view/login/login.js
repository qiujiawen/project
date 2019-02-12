import React from 'react';
import axios from 'axios';
import qs from 'qs';
export default class LoginForm extends React.Component{
    state = {
        verify:'',
        username:'',
        password:'',
        verifyImg:`https://www.koocv.com/user/verify?${Date.now()}`,
        verifyImgShow:false
    };

    //获取input的value
    getValue = (e,attr)=>{
        this.setState({
            [attr]:e.target.value
        });
    };

    //获取或者改变验证码
    getVerifyImg = ()=>{
        this.setState({
            verifyImg:`https://www.koocv.com/user/verify?${Date.now()}`
        });
        if (this.state.verify){
            this.setState({
                verify:''
            });
        };
    };

    getData = ()=>{
        let {verify,username,password} = this.state;
        if (!username){
            alert('请输入用户名');
            if (verify){
                this.getVerifyImg();
            }
            return;
        }else if(!password){
            alert('请输入密码');
            if (verify){
                this.getVerifyImg();
            }
            return;
        }else if (!verify){
            alert('请输入验证码');
            if (verify){
                this.getVerifyImg();
            }
            return;
        }
        axios.post(
            'https://www.koocv.com/user/login',qs.stringify({
                verify,
                username,
                password,
            }),{withCredentials:true}
        ).then((res)=>{
            console.log(res.data);
            if (res.data.code === 0){
                if (window.history.length>1){
                    window.history.back();
                } else {
                    window.location.href = '/';
                }
            } else {
                alert(res.data.msg);
                this.getVerifyImg();
            }
        }).catch((error)=>{
            alert('网络连接失败，请稍后再试');
            this.getVerifyImg();
        });
    };

    render(){
        let {changeIsLogin} = this.props;
        let {verify,username,password,verifyImg,verifyImgShow} = this.state;
        return (
            <div className='login-inner login-form'>
                <div className="login-ico iconfont icon-dengluming">
                </div>
                <p className='login-info'>如有账号，请直接登录</p>
                <div className='input-txt'>
                    <input
                        type="text"
                        placeholder='用户名'
                        value={username}
                        onChange={(e)=>{
                            this.getValue(e,'username');
                        }}
                    />
                    <span className='input-txt-ico iconfont icon-youxiang'>
                    </span>
                </div>
                <div className='input-txt'>
                    <input
                        type="password"
                        placeholder='密码'
                        value={password}
                        onChange={(e)=>{
                            this.getValue(e,'password');
                        }}
                    />
                    <span className='input-txt-ico iconfont icon-mima'/>
                </div>
                <div className='input-verify'>
                    <div className='input-txt'>
                        <input
                            type="text"
                            placeholder='验证码'
                            value={verify}
                            onChange={(e)=>{
                                this.getValue(e,'verify');
                            }}
                            onFocus={()=>{
                                this.setState({
                                    verifyImgShow:true
                                });
                            }}
                        />
                        <span className='input-txt-ico icon-authcode iconfont'>
                        </span>
                    </div>
                        <img
                            src={verifyImgShow?verifyImg:''}
                            className='input-verify-img'
                            onTouchEnd={()=>{
                                this.getVerifyImg();
                            }}
                        />
                </div>
                <a
                    className='miaov-btn miaov-btn-md input-btn'
                    onTouchEnd={()=>{
                        this.getData();
                    }}
                >登录</a>
                <p className='login-info'>
                    没有帐号？
                    <a
                        href="javascript:;"
                        onTouchEnd={()=>{
                            changeIsLogin();
                            setTimeout(()=>{
                                this.setState({
                                    verifyImgShow:false
                                });
                            },1000);
                        }}
                    >立即注册</a>
                </p>
            </div>
        )
    }
}