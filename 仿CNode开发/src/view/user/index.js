import React from 'react';
import ListComponent from './list';
import {connect} from 'react-redux';
import axios from 'axios';
import Loading from '../../common/component/loading';
import Error from '../../common/component/error';
class User extends React.Component{

    getData=(id)=>{
       this.props.dispatch((dispatch)=>{
           axios.get(`https://cnodejs.org/api/v1/user/${id}`).then((res)=>{
               dispatch({
                   type:'USER_UPDATA_SUCC',
                   data:res.data.data
               });
           }).catch((error)=>{
               dispatch({
                   type:'USER_ERROR',
                   data:error
               });
           })
       })
    };

    shouldComponentUpdate(prevPros) {
        if (this.props.match.params.id !== prevPros.match.params.id){
            this.getData(prevPros.match.params.id);
            return false;
        }
        return true;
    }

    componentDidMount() {
        this.getData(this.props.match.params.id);
    }

    render(){
        let {loading,data,error} = this.props.user;
        return(
            error?<Error/>:
            loading?<Loading/>:
            <div className='user-wrap wrap banner'>
                <div className='user-wrap-header'>
                    <div className='user-wrap-img'>
                        <img src={data.avatar_url} alt=""/>
                    </div>
                    <p className='user-wrap-p'>
                        <span>用户名：{data.loginname}</span>
                        <span>{data.score} 积分</span>
                        <span>注册时间：{data.create_at.split('T')[0]}</span>
                    </p>
                </div>
                <ListComponent
                    data={data.recent_topics}
                    loading={loading}
                    header={'最近创建的话题'}
                    isOff={false}
                />
                <ListComponent
                    data={data.recent_replies}
                    loading={loading}
                    header={'最近参与的话题'}
                    isOff={true}
                />
            </div>
        )
    }
};

export default connect(state=>state)(User);