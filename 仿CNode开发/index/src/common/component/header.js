import React from 'react';
import MenuComponent from './menu';
import {Layout,Row, Col,Divider,Icon,Dropdown,Button} from 'antd';
const { Header } = Layout;
export default class HeaderComponent extends React.Component{
    render(){
        return (
            <div className='header-wrap'>
                <Layout>
                    <Header>
                        <Row className='wrap'>
                            <Col md={6} xs={24}>
                                <a href="/index/all" className="logo">
                                    <img src={require('../img/cnodejs_light.svg')} alt=""/>
                                </a>
                            </Col>
                            <Col md={18} xs={0} >
                                <Divider type='vertical' className='divider'/>
                                <MenuComponent
                                    theme = {'dark'}
                                    mode = {'horizontal'}
                                    className={'header-menu'}
                                />
                            </Col>
                            <Col md={0} xs={24} className='drop-down'>
                                <Dropdown
                                    placement='bottomRight'
                                    trigger={['click']}
                                    overlay={
                                        <MenuComponent
                                            theme = {'light'}
                                            mode = {'vertical'}
                                            className={''}
                                        />
                                    }
                                >
                                    <Button><Icon type="bars"/></Button>
                                </Dropdown>
                            </Col>
                        </Row>
                    </Header>
                </Layout>
            </div>
        )
    }
};