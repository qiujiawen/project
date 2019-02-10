import React, {Component} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import Home from './view/home/index';
import Course from './view/course/index';
import Lecture from './view/lecturer/index';
import Message from './view/message/index';
import Work from './view/work/index';
import Login from './view/login/index';
import './common/css/style.css';
import axios from 'axios';
import PropTypes from 'prop-types';
class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            user:''
        };
        this.getData();
    }
    getChildContext(){
        return {
            user:this.state.user
        }
    };

    componentDidUpdate() {
        this.getData();
    }

    getData = ()=>{
        axios.post(
            'https://www.koocv.com/user/islogin','',{withCredentials:true}
        ).then((res)=>{
            //防止组件不断更新死循环
            if (res.data.username === this.state.user){
                return;
            }
            if (res.data.code === 0){
                this.setState({
                    user:res.data.username
                });
            }
        }).catch((error)=>{
            alert('网络连接失败，请稍后再试');
        });
    };

    render() {
        return (
            <Switch>
                <Route path = '/' exact component={Home}/>
                <Route path = '/course' component={Course}/>
                <Route path = '/lecturer' component={Lecture}/>
                <Route path = '/message/:id' component={Message}/>
                <Route path = '/work/:id' component={Work}/>
                <Route path='/login' render={()=>{
                    if (this.state.user){
                        return <Redirect to='/'/>
                    }
                    return <Login/>
                }}/>
            </Switch>
        );
    }
}
App.childContextTypes = {
    user:PropTypes.string
};
export default App;