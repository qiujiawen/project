import React from 'react';
import {Input,Button,Row, Col} from 'antd';
import {Link} from "react-router-dom";
export default class Login extends React.Component{
    render(){
        return(
            <div className='login-wrap wrap banner'>
                <Row>
                    <Col md={18} xs={24} className='joint'>
                        <div className='purpose-header'>
                            <p><Link to='/register'>注册</Link><span>/</span></p>
                            <p>登录</p>
                        </div>
                        <div className='joint-info'>
                            <div className='joint-info-first'>
                                <span>用户名：</span><Input placeholder="请输入用户名" />
                            </div>
                            <div className='joint-info-first'>
                                <span>密&nbsp;码：</span><Input placeholder='请输入密码'/>
                            </div>
                            <div className='joint-info-second'>
                                <Button type="primary">登录</Button>
                                <Button>通过GitHub登录</Button>
                                <Link to='/register'>忘记密码了?</Link>
                            </div>
                        </div>
                    </Col>
                    <Col md={6} xs={0} className='joint-second'>
                        <div>
                            <div className='purpose-header'>
                                <span>关于</span>
                            </div>
                            <p>CNode：Node.js专业中文社区</p>
                            <p>在这里你可以：</p>
                            <p>向别人提出你遇到的问题</p>
                            <p>帮助遇到问题的人</p>
                            <p>分享自己的知识</p>
                            <p>和其它人一起进步</p>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
};