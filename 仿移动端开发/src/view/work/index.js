import React from 'react';
import '../../common/css/work.css';
import MenuPage from '../../common/component/menuPage';
import Tab from '../../common/component/tab';
import Loading from '../../common/component/loading';
import MessageList from './messageList';
import LoadMore from '../../common/component/load-more';
import axios from 'axios';
import qs from 'qs';
import PropTypes from 'prop-types';
import data from './data';
import WorkList from "../home/workList";
let tabImg = [
    require('../../common/img/tab/img1.png'),
    require('../../common/img/tab/img2.png'),
    require('../../common/img/tab/img3.png'),
    require('../../common/img/tab/img4.png'),
];
export default class Work extends React.Component{

    state = {
        isLoading : true,
        isGood:false,
        article_id:this.props.match.params.id,
        data:{},
        good:0
    };

    componentDidMount() {
        this.getData();
        this.getIsGood();
    }
    getData = ()=>{
        let {article_id} = this.state;
        axios.post(`https://www.koocv.com/lecturer/info`,qs.stringify({
            article_id
        }),{withCredentials:true}).then((res)=>{
            this.setState({
                data:res.data,
                good:res.data.good,
                isLoading:false
            })
        }).catch((error)=>{
            console.log(error);
        })
    };

    getIsGood = ()=>{
        let {article_id} = this.state;
        axios.post(`https://www.koocv.com/lecturer/getgood`,qs.stringify({
            article_id
        }),{withCredentials:true}).then((res)=>{
            if (res.data.code === 0){
                this.setState({
                    isGood:true
                });
            }
        }).catch((error)=>{
            console.log(error);
        })
    };

    getGood = ()=>{
        let {article_id} = this.state;
        if (!this.context.user){
            window.location.href = '/login'
        } else {
            axios.post('https://www.koocv.com/lecturer/getgood?',qs.stringify({
                article_id
            }),{withCredentials:true}).then((res)=>{
                if (res.data.code === 0){
                    axios.post("https://www.koocv.com/lecturer/cancelgood",qs.stringify({
                        article_id,
                        gooid:res.data.gooid
                    }),{withCredentials:true}).then((res)=>{
                        console.log(res);
                        if (res.data.code === 0){
                            this.setState({
                                isGood:false,
                                good:parseInt(this.state.good)-1
                            });
                        }
                    })
                } else if (res.data.code === 3){
                    axios.post("https://www.koocv.com/lecturer/good",qs.stringify({
                        article_id
                    }),{withCredentials:true}).then((res)=>{
                        if (res.data.code === 0){
                            this.setState({
                                isGood:true,
                                good:parseInt(this.state.good)+1
                            });
                        }
                    })
                } 
            }).catch((error)=>{
                console.log(error);
            })
        }
    };

    renderWork = ()=>{
        let {data,isGood,article_id} = this.state;
        return (
            <div className='work-wrap'>
                <MenuPage className=''>
                    <div className='page-con work-page-con'>
                        <LoadMore
                            renderComponent = {MessageList}
                            urlParameter = 'getcomment'
                            postParameter = {{
                                article_id
                            }}
                            rows = {5}
                        >
                            <Tab
                                className='banner'
                                data={data.image_path}
                                renderItem = {
                                    (item)=>{
                                        return(
                                            <img src={item.path} alt=""/>
                                        )
                                    }
                                }
                            />
                            <h1 className='work-title'>{data.title}</h1>
                            <article
                                className='work-details'
                                dangerouslySetInnerHTML={{
                                    __html:data.content
                                }}
                            >
                            </article>
                            <div className='work-aside'>
                                <span className='good'>{data.good}人觉得很赞</span>
                                <a
                                    className={'iconfont icon-tuijian1 '+(isGood?'isGood':'')}
                                    onTouchStart={(e)=>{
                                        e.target.classList.add('a-active');
                                    }}
                                    onTouchEnd={(e)=>{
                                        this.getGood();
                                        e.target.classList.remove('a-active');
                                    }}
                                >
                                </a>
                            </div>
                            <div className='post-message'>
                                <a
                                    id='message-btn'
                                    className='iconfont icon-liuyan'
                                    href={'/message/'+article_id}
                                >回复本帖</a>
                            </div>
                        </LoadMore>
                    </div>
                </MenuPage>
            </div>
        )
    };

    render(){
        return (
            this.state.isLoading?<Loading/>:this.renderWork()
        )
    }
}

Work.contextTypes = {
    user:PropTypes.string
};