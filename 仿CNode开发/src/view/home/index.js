import React from 'react';
import {connect} from 'react-redux';
import {Menu,Row,Col,Pagination} from 'antd';
import axios from 'axios';
import {Link} from 'react-router-dom';
import ListComponent from './list';
import Error from '../../common/component/error';
let arrTab=[
    {name:'all',value:'全部'},
    {name:'good',value:'精华'},
    {name:'share',value:'分享'},
    {name:'ask',value:'问答'},
    {name:'job',value:'招聘'},
    {name:'dev',value:'客服端测试'}
];
class Home extends React.Component{
    state={
        page:1,
        limit:40
    };
    getData=(tab,page)=>{
        let {limit} = this.state;
        this.props.dispatch((dispatch)=>{
            axios.get(`https://cnodejs.org/api/v1/topics?page=${page}&tab=${tab}&limit=${limit}`)
                .then((res)=>{
                    dispatch({
                        type:'LIST_SUCC'
                    });
                    dispatch({
                        type:'LIST_UPDATA_SUCC',
                        data:res.data.data
                    });
                }).catch((error)=>{
                    console.log(error);
                    dispatch({
                        type:'LIST_ERROR',
                        data:error
                    });
            })
        });
    };
    
    componentDidMount() {
        this.getData(this.props.match.params.id,this.state.page);
    }

    shouldComponentUpdate(nextProps,nextState) {

        if (this.props.match.params.id !== nextProps.match.params.id){
            this.setState({
                page:1
            });
            this.getData(nextProps.match.params.id,this.state.page);
            return false;
        }
        if (this.state.page !== nextState.page){
            this.getData(nextProps.match.params.id,nextState.page);
            return false;
        }
        return true;
    }

    render(){
        let {loading,data,error} = this.props.home;
        return(
            <div className='home-wrap'>
                <Row className='wrap'>
                    <Col md={6} xs={24} className='home-wrap-first-col'>
                        <Menu
                            selectedKeys={[this.props.match.params.id]}
                        >
                            {
                                arrTab.map((item)=>{
                                    return(
                                        <Menu.Item key={item.name}>
                                            <Link to={`/index/${item.name}`}>{item.value}</Link>
                                        </Menu.Item>
                                    )
                                })
                            }
                        </Menu>
                    </Col>
                    <Col md={18} xs={24} className='home-wrap-second-col'>
                        {
                            error? <Error/>
                                :(<ListComponent
                                loading={loading}
                                data={data}
                            />)
                        }
                        {
                            loading?'':
                                <Pagination
                                    className='pagination-style'
                                    current={this.state.page}
                                    pageSize={20}
                                    total={1000}
                                    onChange={(page)=>{
                                        this.setState({
                                            page
                                        })
                                    }}
                                />
                        }

                    </Col>
                </Row>

            </div>
        )
    }
};

export default connect((state)=>state)(Home);