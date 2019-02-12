import React from 'react';
import axios from 'axios';
import qs from 'qs';
export default class RegisterForm extends React.Component{
    state = {
        verify:'',
        username:'',
        password:'',
        repassword:'',
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
        }
    };

    getData = ()=>{
        let {changeIsLogin} = this.props;
        let {verify,username,password,repassword} = this.state;
        if (!verify || !username || !password || !repassword){
            alert('请继续填写信息');
            if (verify){
                this.getVerifyImg();
            }
            return;
        }else if (password !== repassword){
            alert('密码不一致');
            if (verify){
                this.getVerifyImg();
            }
            return;
        }else if(password.length<6 || password.length>30){
            alert('密码长度在6-30个字符之间');
            if (verify){
                this.getVerifyImg();
            }
            return;
        }
        axios.post(
          'https://www.koocv.com/user/register',
            qs.stringify({
                verify,
                username,
                password,
                repassword
            }),{
              withCredentials:true
            },
        ).then((res)=>{
            if (res.data.code === 0){
                alert(res.data.msg);
                changeIsLogin();
            } else {
                alert(res.data.msg);
            }
            this.getVerifyImg();
        }).catch((error)=>{
            alert('网络连接失败，请稍后再试');
            this.getVerifyImg();
        });
    };

    render(){
        let {changeIsLogin} = this.props;
        let {verify,username,password,repassword,verifyImg,verifyImgShow} = this.state;
        return (
            <div className='login-inner register-form'>
                <p className='login-info register-title'>注册账号</p>
                <div className='input-txt'>
                    <input
                        type="text"
                        placeholder='用户名'
                        value={username}
                        onChange={(e)=>{
                            this.getValue(e,'username')
                        }}
                    />
                    <span className='input-txt-ico iconfont icon-youxiang'></span>
                </div>
                <div className='input-txt'>
                    <input
                        type="text"
                        placeholder='设置密码'
                        style={{
                            WebkitTextSecurity:'disc'
                        }}
                        value={password}
                        onChange={(e)=>{
                            this.getValue(e,'password')
                        }}
                    />
                    <span className='input-txt-ico iconfont icon-mima'></span>
                </div>
                <div className='input-txt'>
                    <input
                        type="text"
                        placeholder='确认密码'
                        style={{
                            WebkitTextSecurity:'disc'
                        }}
                        value={repassword}
                        onChange={(e)=>{
                            this.getValue(e,'repassword');
                        }}
                    />
                    <span className='input-txt-ico iconfont icon-mima'></span>
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
                        <span className='input-txt-ico iconfont icon-authcode'></span>
                    </div>
                    <img
                        src={verifyImgShow?verifyImg:""}
                        className='input-verify-img'
                        onTouchEnd={()=>{
                            this.getVerifyImg();
                        }}
                    />
                </div>
                <a
                    href="javascript:;"
                    className='miaov-btn miaov-btn-md input-btn'
                    onTouchEnd={()=>{
                        this.getData();
                    }}
                >马上注册</a>
                <p className='login-info'>
                    已有账号？
                    <a
                        href="javascript:;"
                        className='to-login'
                        onTouchEnd={()=>{
                            changeIsLogin();
                            setTimeout(()=>{
                                this.setState({
                                    verifyImgShow:false
                                });
                            },1000);
                        }}
                    >立即登录</a>
                </p>
            </div>
        )
    }
}