import React from 'react';
import {List,Avatar} from 'antd';
import {Link} from 'react-router-dom';
export default class ListComponent extends React.Component{
    render(){
        let {data,loading,header,isOff} = this.props;
        return(
            <List
                bordered
                loading={loading}
                header={header}
                dataSource={data}
                renderItem={item => (
                    <List.Item
                        key={item.id}
                        actions={[<span>最后回复：{item.last_reply_at.split('T')[0]}</span>]}
                    >
                        <List.Item.Meta
                            className='add-ant-list-item-meta'
                            avatar={
                                isOff?
                                    (<Link to={'/user/'+item.author.loginname}><Avatar src={item.author.avatar_url}/></Link>)
                                    :(<span><Avatar src={item.author.avatar_url}/></span>)
                            }
                            title={
                                <div>
                                    {isOff?
                                        (<Link to={'/user/'+item.author.loginname} className='add-user-name-style'>{item.author.loginname}</Link>)
                                        :(<span className='add-user-name-style'>{item.author.loginname}</span>)
                                    }
                                    <Link to={'/details/'+item.id}>{item.title}</Link>
                                </div>
                            }
                        />
                    </List.Item>
                )}
            >
            </List>
        )
    }
}