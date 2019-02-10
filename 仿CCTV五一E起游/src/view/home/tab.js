import React from 'react';

let data = [
    require('../../common/img/1.jpg'),
    require('../../common/img/2.jpg'),
    require('../../common/img/3.jpg'),
    require('../../common/img/4.jpg'),
    require('../../common/img/5.jpg')
];

export default class Tab extends React.Component {

    constructor(props){
        super(props);
        this.tab = React.createRef();
    }

    state = {
        dis: {},                            //手指移动的偏移量
        viewportWidth: window.innerWidth,   //窗口的宽度
        imgNewPoint: 0,                     //图片最新的坐标
        imgOldPoint: 0,                     //图片上一次的坐标
        page: 0,                            //建立图片和变量page相关联
        isDirFirst: true,                   //是不是第一次判断出手指滑动方向
        isDir: false,                       //是不是判断出手指滑动方向
        time: 0,                            //定时器
    };

    //  创建图片和下标
    createDom = () => {

        let listData = data.concat(data.map((item) => item));

        return {
            list: listData.map((item, index) => {
                return <li key={index}><img src={item} alt=""/></li>
            }),
            span: data.map((item, index) => {
                return <span key={index} className={index === (this.state.page % data.length) ? 'active' : ''}></span>
            })
        }
    };

    componentDidMount = () => {

        //  根据数据重新计算ul的宽度
        let {list} = this.getDom();
        list.style.width = `${list.children.length}00vw`;

        this.autoPlay();
    };

    //  获取dom对象
    getDom = () => {

        let tab = this.tab.current,
            list = tab.querySelector('.list'),  //获取ul
            arrDot = tab.querySelectorAll('.tab-mask nav span');    //获取下标圆点

        return {
            list: list,
            dot: arrDot
        }
    };

    /**
     * 轮播触摸开始事件处理
     * @param e     事件对象集
     */
    listTouchStartHandle = (e) => {

        clearInterval(this.state.time);

        let {page, imgNewPoint, viewportWidth, imgOldPoint} = this.state,
            {list, dot} = this.getDom();

        list.style.transition = 'none';

        // 当前手指的坐标
        this.point = {
            x: e.changedTouches[0].pageX,
            y: e.changedTouches[0].pageY
        };

        if (page === 0) {
            page = dot.length;
        } else if (page === list.children.length - 1) {
            page = dot.length - 1;
        }
        imgNewPoint = -page * viewportWidth;
        list.style.webkitTransform = list.style.transform = `translate3d(${imgNewPoint}px,0,0)`;

        //  储存上一次手指结束的位置
        imgOldPoint = imgNewPoint;

        //  状态更新
        this.setState({
            page,
            imgNewPoint,
            imgOldPoint,
            isDir: false,
            isDirFirst: true
        });
    };

    /**
     * 轮播触摸移动事件
     * @param e     事件对象集
     */
    listTouchMoveHandle = (e) => {
        // 当前手指的坐标
        let point = {
            x: e.changedTouches[0].pageX,
            y: e.changedTouches[0].pageY
        };

        // 手指移动的偏移量
        this.setState({
            dis: {
                x: point.x - this.point.x,
                y: point.y - this.point.y
            }
        });

        // 定义变量
        let {imgNewPoint, imgOldPoint, dis} = this.state,
            {list} = this.getDom();

        //  判断手指移动方向，同时判断出是否第一次判断方向
        if (this.state.isDirFirst && Math.abs(dis.x - dis.y) > 5) {
            if (Math.abs(dis.x) > Math.abs(dis.y)) {
                this.setState({
                    isDir: true,
                    isDirFirst: false
                });
            }
        }

        //  手指移动的偏移量不为空的时候才执行
        if (dis.x && this.state.isDir) {

            imgNewPoint = imgOldPoint + dis.x;
            list.style.webkitTransform = list.style.transform = `translate3d(${imgNewPoint}px,0,0)`;

            /*
                touchstart 和 touchmove 事件处理函数中调用 e.preventDefault() ，会被浏览器忽略掉，并不会阻止默认行为。
                应用 CSS 属性 touch-action: none; 这样任何触摸事件都不会产生默认行为，但是 touch 事件照样触发。
            */
            //  滑动图片的时候禁止页面上下的滚动条滚动
            // e.preventDefault();


            this.setState({
                imgNewPoint
            });
        }
    };

    /**
     * 轮播触摸结束事件
     * @param e     事件对象集
     */
    listTouchEndHandle = (e) => {

        if (this.state.isDir) {
            let point = {
                x: e.changedTouches[0].pageX,
                y: e.changedTouches[0].pageY
            };

            let dis = {
                x: point.x - this.point.x,
                y: point.y - this.point.y
            };

            // 定义变量
            let {imgNewPoint, page, viewportWidth} = this.state,
                {list, dot} = this.getDom();

            list.style.transition = '.3s';

            if (Math.abs(dis.x) > 100) {
                page -= dis.x / Math.abs(dis.x);
            }

            //  图片偏移
            imgNewPoint = -page * viewportWidth;
            list.style.transform = list.style.webkitTransform = `translate3d(${imgNewPoint}px,0,0)`;

            this.autoPlay();

            //  状态更新
            this.setState({
                imgNewPoint,
                page
            });
        }

    };

    /**
     * 自动播放
     */
    autoPlay = () => {

        // 定义变量
        let {imgNewPoint, page, viewportWidth} = this.state,
            {list, dot} = this.getDom();

        // 定时器
        let time = setInterval(()=>{

            if(page === list.children.length - 1){

                page = dot.length - 1;
                imgNewPoint = -page * viewportWidth;

                list.style.transition = 'none';
                list.style.transform = list.style.webkitTransform = `translate3d(${imgNewPoint}px,0,0)`;
            }

            //  给最后一张图片切换时一点延时时间
            setTimeout(()=>{
                page++;
                imgNewPoint = -page * viewportWidth;

                list.style.transform = list.style.webkitTransform = `translate3d(${imgNewPoint}px,0,0)`;
                list.style.transition = '.3s';

                // 每3秒更新一次page
                this.setState({
                    page
                });

            }, 30);
        },3000);

        this.setState({
            time
        });
    };


    render() {
        return (
            <div className='tab' ref={this.tab}>
                <ul
                    className='list'
                    onTouchStart={this.listTouchStartHandle}
                    onTouchMove={this.listTouchMoveHandle}
                    onTouchEnd={this.listTouchEndHandle}
                >
                    {this.createDom().list}
                </ul>
                <section className='tab-mask'>
                    <p>成都九寨沟</p>
                    <nav>
                        {this.createDom().span}
                    </nav>
                </section>
            </div>
        )
    }
}