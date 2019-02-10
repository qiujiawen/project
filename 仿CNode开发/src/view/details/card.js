import React from 'react';
import {Card,Tag,Avatar} from 'antd';
import TagComponent from '../../common/component/tag';
import {Link} from "react-router-dom";
export default class CardComponent extends React.Component{
    render(){
        let {data,loading} = this.props;
        return (
            <Card
                loading={loading}
                title={
                    <div className='details-wrap-title'>
                        <h1>{data.title}</h1>
                        <div>
                            <TagComponent data={data}/>
                            <Link to={'/user/'+data.author.loginname}><Avatar src={data.author.avatar_url}/></Link>
                            <Link to={'/user/'+data.author.loginname} className='user-name-style'>{data.author.loginname}</Link><span> 发表于：{data.create_at.split('T')[0]}</span>&nbsp;<span>文章已被浏览{data.visit_count}次</span>
                        </div>
                    </div>
                }
            >
                <div
                    className='details-card-body'
                    dangerouslySetInnerHTML={{
                        __html:data.content
                    }}
                >
                </div>
            </Card>
        )
    }
}