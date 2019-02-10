import React from 'react';
export default class Tab extends React.Component{

    componentDidMount() {
        let {picList} = this.refs;
        let {data} = this.props;
        if (data.length>0){
            picList.style.width = data.length+'00vw';
        }
        if (data.length>1){
            this.imgMoveHandle();
        }
    }

    //滑动幻灯片
    imgMoveHandle =()=>{
        let {picList,tab} = this.refs;
        let startPoint = {},
            timer = 0,//定时器
            isDirFirst = true,//是不是第一次判断出方向
            isDir = false,//是不是判断出方向
            num = this.props.data.length,
            pageWidth = picList.clientWidth/num,//图片宽度
            page = 0,//第几张图片
            imgStartPoint = 0,//图片开始的位置
            imgOldPoint = 0;//图片上一次的位置

        picList.style.width = picList.children.length + '00vw';

        tab.addEventListener('touchstart',function (e) {
            clearInterval(timer);
            startPoint = {
                x:e.changedTouches[0].pageX,
                y:e.changedTouches[0].pageY
            };
            if (page === 0){
                page = num;
            } 
            if (page === picList.children.length-1){
                page = num-1;
            }
            moveTransform('none');

            imgOldPoint = imgStartPoint;
            isDir = false;
            isDirFirst = true;
        });
        tab.addEventListener('touchmove',function (e) {
            let nowPoint = {
                x:e.changedTouches[0].pageX,
                y:e.changedTouches[0].pageY
            };
            let disX = nowPoint.x-startPoint.x;
            let disY = nowPoint.y-startPoint.y;
            
            if (isDirFirst && Math.abs(disX-disY)>5){
                if (Math.abs(disX) > Math.abs(disY)){
                    isDir = true; //判断出是x轴方向移动
                    isDirFirst = false;//上面第一次判断出方向就不会重复执行判断
                } 
            } 
            
            if (isDir){
                imgStartPoint = imgOldPoint + disX;
                picList.style.WebkitTransform = picList.style.transform = `translate3d(${imgStartPoint}px,0,0)`;
                e.preventDefault();
            }
        });
        tab.addEventListener('touchend',function (e) {
            if (isDir){
                let nowPointX = e.changedTouches[0].pageX;
                let dis = nowPointX - startPoint.x;
                if (Math.abs(dis)>100){
                    page -= dis/Math.abs(dis);
                    moveTransform('.5');
                }else {
                    moveTransform('.2');
                }
                let now = page%num;
                synNav(now);
                autoPlay();
            }
        });

        //下标和图片同步
        function synNav(now) {
            let aNav = tab.querySelectorAll('.picNav span');
            aNav.forEach((item)=>{
                item.classList.remove('active');
            });
            aNav[now].classList.add('active');
        }

        function moveTransform(time) {
            imgStartPoint = -page*pageWidth;
            picList.style.WebkitTransform = picList.style.transform = `translate3d(${imgStartPoint}px,0,0)`;
            picList.style.transition = `${time}s`;
        }

        autoPlay();
        function autoPlay() {
            timer = setInterval(imgTransform,1000);
        };
        function imgTransform() {
            if (page === picList.children.length-1){
                page = num-1;
                moveTransform('none');
            }
            setTimeout(function () {
                page++;
                moveTransform('.5');
                synNav(page%num);
            },30);
        };

    };

    //生成下标
    getNav = ()=>{
        let {data} = this.props;
        if (data.length>1){
            return (
                <nav className='picNav'>
                    {data.map((item,index)=>{
                        return (
                            <span key={index} className={index===0?'active':''}>
                            </span>
                        )
                    })}
                </nav>
            )
        } else {
            return '';
        }

    };

    render(){
        let {data,className,renderItem} = this.props;
        let data1 = data.concat(data.map((item)=>{return item}));
        return (
            <div className={`tab ${className}`} ref='tab'>
                <ul className='picList' ref='picList'>
                    {data1.map((item,index)=>{
                        return (
                            <li key={index}>
                                {renderItem(item)}
                            </li>
                        )
                    })}
                </ul>
                {this.getNav()}
            </div>
        )
    }
}