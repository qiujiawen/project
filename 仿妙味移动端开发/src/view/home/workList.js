import React from 'react';
import {Link} from 'react-router-dom';
export default class WorkList extends React.Component{

    render(){
        let {data,loadContentEnd,loadIconEnd} = this.props;
        return(
            <section className='work-section'>
                <h2 className='work-title'>学员作品</h2>
                <ul className='work-ul'>
                    {/*<li>*/}
                        {/*<Link to='/work'>*/}
                            {/*<img src={require('../../common/img/work.png')} alt=""/>*/}
                            {/*<div className='work-ul-li-div'>*/}
                                {/*<h4 className='work-ul-li-title'>时空唱片机</h4>*/}
                                {/*<span className='iconfont icon-tuijian1'>2000</span>*/}
                                {/*<span className='iconfont icon-liuyan'>200</span>*/}
                            {/*</div>*/}
                        {/*</Link>*/}
                    {/*</li>*/}

                    {
                        data?
                            data.map((item)=>{
                                return (
                                    <li key={item.id}>
                                        <Link to={'/work/'+item.id}>
                                            <img src={item.icon} alt=""/>
                                            <div className='work-ul-li-div'>
                                                <h4 className='work-ul-li-title'>{item.title}</h4>
                                                <span className='iconfont icon-tuijian1'>{item.good}</span>
                                                <span className='iconfont icon-liuyan'>{item.message}</span>
                                            </div>
                                        </Link>
                                    </li>
                                )
                            }):''
                    }
                </ul>
                {loadContentEnd?<footer className={`loadMore ${loadIconEnd?'':'loadIng'}`}>
                    <span>{loadIconEnd?'我是有底线的':'正在加载更多内容'}</span>
                    {loadIconEnd?<div className='baseline'></div>:''}
                </footer>:''}
            </section>
        )
    }
}