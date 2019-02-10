import React from 'react';
import {connect} from 'react-redux';
import Loading from '../../common/component/loading';
import axios from 'axios';
import {List} from 'antd';
import ListComponent from './list';
import CardComponent from './card';
import Error from '../../common/component/error';
class Details extends React.Component{

    getData=(id)=>{
        this.props.dispatch((dispatch)=>{
            dispatch({
                type:'DETAILS_SUCC'
            });
            axios.get(`https://cnodejs.org/api/v1/topic/${id}`)
                .then((res)=>{
                    dispatch({
                        type:'DETAILS_UPDATA_SUCC',
                        data:res.data.data
                    });
                }).catch((error)=>{
                dispatch({
                    type:'DETAILS_ERROR',
                    data:error
                });
            })
        });
    };

    componentDidMount() {
        this.getData(this.props.match.params.id)
    }

    render(){
        let {data,loading,error} = this.props.details;
        return(
            error?<Error/>:loading?(<Loading/>):(<div className='details-wrap wrap banner'>
                <CardComponent
                    data={data}
                    loading={loading}
                />
                {data.reply_count===0?(<List
                    header={<div>0条回复</div>}
                    bordered
                    dataSource={['哈哈~抢个沙发']}
                    renderItem={item => (<List.Item><div className='no-data-style'>{item}</div></List.Item>)}
                />):(<ListComponent
                    data={data.replies}
                    reply_count = {data.reply_count}
                    loading={loading}
                />)}
            </div>)
        )
    }
};
export default connect((state)=>state)(Details);