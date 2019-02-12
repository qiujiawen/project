import React from 'react';
import axios from 'axios';
import qs from 'qs';
import BScroll from 'better-scroll';
export default class LoadMore extends React.Component{

    state = {
        page:1,
        data : [],
        loadContentEnd:false,
        loadIconEnd:false
    };

    componentDidMount() {
        let {renderComponent} = this.props;
        let {loadMoreWrap} = this.refs;
        let arrA = loadMoreWrap.querySelectorAll('a');
        let workUl = loadMoreWrap.querySelector('.work-ul');
        if (workUl){
            workUl.addEventListener('touchstart',function (e) {
                this.startPoint = {
                    x : e.changedTouches[0].pageX,
                    y : e.changedTouches[0].pageY
                }
            });
            workUl.addEventListener('touchend',function (e) {
                let nowPoint = {
                    x : e.changedTouches[0].pageX,
                    y : e.changedTouches[0].pageY
                };
                let dis = Math.abs(nowPoint.x-this.startPoint.x)+Math.abs(nowPoint.y-this.startPoint.y)
                if (dis<5){
                    if (e.target.tagName === 'H4'|| e.target.tagName === 'IMG'|| e.target.tagName === 'SPAN'){
                        let a = e.target.parentNode;
                        if (a.href){
                            window.location.href = a.href;
                        }
                    }
                }
            })
        }

        if (arrA){
            arrA.forEach((item)=>{
                item.addEventListener('touchstart',function (e) {
                    this.startPoint = {
                        x : e.changedTouches[0].pageX,
                        y : e.changedTouches[0].pageY
                    }
                    this.classList.add('a-active');
                });
                item.addEventListener('touchend',function (e) {
                    let nowPoint = {
                        x : e.changedTouches[0].pageX,
                        y : e.changedTouches[0].pageY
                    };
                    this.classList.remove('a-active');
                    let dis = Math.abs(nowPoint.x-this.startPoint.x)+Math.abs(nowPoint.y-this.startPoint.y)
                    if (dis<5 && this.href){
                        window.location.href = this.href;
                    }
                })
            });
        }

        //上滑加载
        if (renderComponent){
            this.scroll = new BScroll(loadMoreWrap,{
                bounce:false,
                pullUpLoad:50
            });
            //上拉加载
            this.scroll.on('pullingUp',()=>{
                this.getData();
            });
        }else {
            this.scroll = new BScroll(loadMoreWrap,{
                bounce:false
            })
        }
    }
    getData = ()=>{
        let {urlParameter,postParameter,rows} = this.props;
        let {page,loadContentEnd} = this.state;
        page++;
        if (loadContentEnd){
            return;
        }
        this.setState({
            loadContentEnd:true
        });
        axios.post(
            `https://www.koocv.com/lecturer/${urlParameter}?page=${page}&rows=${rows}`,
            qs.stringify(postParameter)
        ).then((res)=>{
            if (res.data.length){
                let {data} = this.state;
                data = data.concat(res.data);
                this.setState({
                    data,
                    page,
                    loadContentEnd:false
                });
                this.scroll.finishPullUp();
            }else {
                this.setState({
                    loadIconEnd:true
                })
            }
        }).catch((error)=>{
            console.log(error);
        })
    };

    slidingLoading = ()=>{
        let windowTop = window.scrollY;
        let pageTotalHeight = document.body.scrollHeight;
        let pageHeight = document.body.clientHeight;
        if (pageTotalHeight-pageHeight-windowTop<200){
            this.getData();
        }
    };

    render(){
        let {children,renderComponent} = this.props;
        let {data,loadContentEnd,loadIconEnd} = this.state;
        let ListComponent = renderComponent;
        return (
            <div className='load-more-wrap' ref='loadMoreWrap'>
                <div className='load-more-wrap-div'>
                    {children}
                    <ListComponent
                        data = {data}
                        loadContentEnd = {loadContentEnd}
                        loadIconEnd = {loadIconEnd}
                    />
                </div>
            </div>
        )
    }
}