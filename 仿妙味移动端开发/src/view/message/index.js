import React from 'react';
import Header from '../../common/component/header';
import Menu from '../../common/component/menu';
import axios from 'axios';
import qs from 'qs';
import '../../common/css/message.css';
export default class Message extends React.Component{
    state = {
        headerState:{
            menu : false,
            login : false,
            back : true
        },
        content:'',
        article_id:this.props.match.params.id
    };
    
    getData = ()=>{
        let {content,article_id} = this.state;
        if (!content.trim()) {
            alert('请输入内容！');
        }
        axios.post('https://www.koocv.com/lecturer/addcomment',qs.stringify({
            content,
            article_id
        }),{withCredentials:true}).then((res)=>{
            if (res.data.code === 0){
                window.history.back();
            }
        }).catch((error)=>{
            console.log(error);
        })
    };

    render(){
        let {content} = this.state;
        return (
            <div className='message-wrap'>
                <Header
                    {...this.state.headerState}
                />
                <Menu/>
                <div className='page'>
                    <div className='page-con'>
                        <div>
                            <textarea 
                                className='message-textarea' 
                                value={content} 
                                onChange={(e)=>{
                                    this.setState({
                                        content:e.target.value
                                    });
                                    console.log(content);
                                }}>
                            </textarea>
                            <a
                                className='miaov-btn miaov-btn-md message-btn'
                                onTouchEnd={this.getData}
                            >提交留言</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}