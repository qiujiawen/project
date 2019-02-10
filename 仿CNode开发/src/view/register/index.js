import React from 'react';
import {Button, Col, Input, Row} from "antd";
import {Link} from "react-router-dom";
export default class Register extends React.Component{
    render(){
        return(
            <div className='register-wrap wrap banner'>
                <Row>
                    <Col md={18} xs={24} className='joint'>
                        <div className='purpose-header'>
                            <p><Link to='/login'>登录</Link><span>/</span></p>
                            <p>注册</p>
                        </div>
                        <div className='joint-info register-joint-info'>
                            <div className='joint-info-first'>
                                <span>邮箱：</span><Input placeholder="请输入用户名" />
                            </div>
                            <div className='joint-info-first'>
                                <span>设置密码：</span><Input placeholder='请输入密码'/>
                            </div>
                            <div className='joint-info-first'>
                                <span>确认密码：</span><Input placeholder='请输入密码'/>
                            </div>
                            <div className='joint-info-second register-joint-info-second'>
                                <Button type="primary">注册</Button>
                                <Link to='/register'>已有帐号，直接登录»</Link>
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
}