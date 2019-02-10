import React from 'react';
import {Link} from 'react-router-dom';
import {List,Avatar} from 'antd';
export default class ListComponent extends React.Component{
    render(){
        let {reply_count,data,loading} = this.props;
        return(
            <div className='list-wrap'>
                <List
                    header={<div>{reply_count}条回复</div>}
                    loading={loading}
                    bordered
                    dataSource={data}
                    renderItem={item => (
                        <List.Item
                            key={item.id}
                            className='details-list-wrap'
                        >
                            <List.Item.Meta
                                avatar={<Link to={'/user/'+item.author.loginname}><Avatar src={item.author.avatar_url}/></Link>}
                                title={
                                    <div>
                                        <Link to={'/user/'+item.author.loginname} className='user-name-style'>{item.author.loginname}</Link>
                                        <span> 发表于：{item.create_at.split('T')[0]}</span>
                                    </div>
                                }
                                description={
                                    <div
                                    dangerouslySetInnerHTML={{__html:item.content}}>
                                    </div>
                                }
                            />
                        </List.Item>
                    )}
                >
                </List>
            </div>
        )
    }
};