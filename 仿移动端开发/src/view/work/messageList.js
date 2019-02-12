import React from 'react';
export default class MessageList extends React.Component{

    renderAside = ()=>{
        let {data} = this.props;
        return(
            data.map((item,index)=>{
                return (
                    <aside key={index}>
                        <div className='message-info'>
                            <span>{item.username}</span> 回复：
                        </div>
                        <div className='message-con'>{item.content}</div>
                    </aside>
                )
            })
        )
    };

    render(){
        let {data,loadContentEnd,loadIconEnd} = this.props;
        return (
            <div className='message-list'>
                {data.length?this.renderAside():<p className='work-no-info'>抢个沙发吧</p>}
                {loadContentEnd?<footer className={`loadMore ${loadIconEnd?'':'loadIng'}`}>
                    <span>{loadIconEnd?'我是有底线的':'正在加载更多内容'}</span>
                    {loadIconEnd?<div className='baseline'></div>:''}
                </footer>:''}
            </div>
        )
    }
}