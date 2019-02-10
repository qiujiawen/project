import React from 'react';
import {Link} from 'react-router-dom';
import {List,Avatar} from 'antd';
import TagComponent from  '../../common/component/tag';
export default class ListComponent extends React.Component{
    render(){
        let {loading,data} = this.props;
        return (
            <div className='list-wrap'>
                <List
                    loading={loading}
                    dataSource={data}
                    renderItem={(item)=>(
                        <List.Item
                            className='list-add-style'
                            key={item.id}
                            actions={[<span>回复:{item.reply_count}</span>, <span>访问:{item.visit_count}</span>]}
                        >
                            <List.Item.Meta
                                avatar={<Link to={'/user/'+item.author.loginname}><Avatar src={item.author.avatar_url}/></Link>}
                                title={<div><TagComponent data={item}/><Link to={'/details/'+item.id}>{item.title}</Link></div>}
                                description={<p><Link to={'/user/'+item.author.loginname}>{item.author.loginname}</Link><span> 发表于：{item.create_at.split('T')[0]}</span></p>}
                            />
                        </List.Item>
                    )}
                >
                </List>
            </div>
        )
    }
}