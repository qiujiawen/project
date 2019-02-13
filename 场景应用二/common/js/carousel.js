class Carousel {
    constructor(option) {
        this.option = option;
        this.init();
        this.swipePicture();
        this.animationFirstShow(true);
    }

    /**
     *  初始化
     */
    init() {

        let {dom} = this.option,
            inner = `
            <section class="carousel-component"><ul class="list-wrap">${Carousel.createElement().li}</ul></section>
            `;
        dom.innerHTML = inner;

        let list = dom.querySelector('.list-wrap'),
            arrLi = list.querySelectorAll('.list-wrap > li');
        list.style.height = `${list.children.length}00vh`;
    };


    /**
     *  第一个页面内置动画的效果
     */
    animationFirstShow(ifShow) {

        let {dom} = this.option,
            secondList = dom.querySelector('.list-animation'),
            arrPElement = secondList.querySelectorAll('li p');

        ifShow ? arrPElement.forEach((item) => {
            item.classList.add('list-animation-show');
        }) : arrPElement.forEach((item) => {
            item.classList.remove('list-animation-show');
        })

    };


    /**
     *  无缝滑动
     */
    swipePicture() {

        let {dom} = this.option,
            list = dom.querySelector('.list-wrap'),
            arrLi = list.querySelectorAll('.list-wrap > li');

        let disPoint = {},
            nowIndex = 0,
            nextIndex = 0,
            scale = 1 / 4,
            viewportHeight = window.innerHeight,
            that = this,
            isEnd = true;

        arrLi.forEach((item, index) => {

            if (isEnd) {
                item.classList.add('position');

                item.addEventListener('touchstart', function (e) {

                    this.point = {
                        x: e.changedTouches[0].pageX,
                        y: e.changedTouches[0].pageY
                    };

                    nowIndex = parseInt(item.getAttribute('index'));
                    isEnd = false;
                });

                item.addEventListener('touchmove', function (e) {

                    let newPoint = {
                        x: e.changedTouches[0].pageX,
                        y: e.changedTouches[0].pageY
                    };

                    disPoint = {
                        x: newPoint.x - this.point.x,
                        y: newPoint.y - this.point.y
                    };

                    list.children.style = 'display: none';

                    //  图片向下滑动或者向上滑动
                    if (disPoint.y < 0) {
                        nextIndex = nowIndex === arrLi.length - 1 ? 0 : nowIndex + 1;
                        arrLi[nextIndex].style = 'display: block';
                        arrLi[nextIndex].style.webkitTransform = arrLi[nextIndex].style.transform = `translate3d(0,${viewportHeight + disPoint.y}px,0)`;
                    } else if (disPoint.y > 0) {
                        nextIndex = nowIndex === 0 ? arrLi.length - 1 : nowIndex - 1;
                        arrLi[nextIndex].style = 'display: block';
                        arrLi[nextIndex].style.webkitTransform = arrLi[nextIndex].style.transform = `translate3d(0,${-viewportHeight + disPoint.y}px,0)`;
                    }

                    arrLi[nextIndex].classList.add('show-li');
                    this.style.webkitTransform = this.style.transform = `translate3d(0,${disPoint.y * scale}px,0) scale(${1 - Math.abs(disPoint.y * scale) / viewportHeight})`;

                });

                item.addEventListener('touchend', function (e) {

                    if (disPoint.y < 0) {
                        this.style.webkitTransform = this.style.transform = `translate3d(0,${-viewportHeight * scale}px,0) scale(${1 - Math.abs(disPoint.y * scale) / viewportHeight})`;
                        arrLi[nextIndex].style.webkitTransform = arrLi[nextIndex].style.transform = `translate3d(0,0,0)`;
                    } else if (disPoint.y > 0) {
                        this.style.webkitTransform = this.style.transform = `translate3d(0,${viewportHeight * scale}px,0) scale(${1 - Math.abs(disPoint.y * scale) / viewportHeight})`;
                        arrLi[nextIndex].style.webkitTransform = arrLi[nextIndex].style.transform = `translate3d(0,0,0)`;
                    }

                    arrLi[nextIndex].style.transition = '.3s';

                    if (nowIndex !== 0) {
                        that.animationFirstShow(false);
                    }
                    if (nextIndex === 0) {
                        that.animationFirstShow(true);
                    }

                });

                item.addEventListener('webkitTransitionEnd', function () {
                    arrLi[nextIndex].classList.remove('show-li');
                    isEnd = true;
                    arrLi.forEach((item, index) => {
                        if (index !== nextIndex) {
                            item.style = 'display: none'
                        }
                    });
                });

                item.addEventListener('transitionEnd', function () {
                    arrLi[nextIndex].classList.remove('show-li');
                    isEnd = true;
                    arrLi.forEach((item, index) => {
                        if (index !== nextIndex) {
                            item.style = 'display: none'
                        }
                    });
                });


            }

        });
    };
}

/**
 *  创建dom元素
 */
Carousel.createElement = function() {

    let inner = '';
    for (let i = 0; i < 8; i++) {
        if (i === 0) {
            inner += `<li index = ${i}>${Carousel.animationFirstFn().ul}</li>`
        } else if (i === 1) {
            inner += `<li index = ${i}>${Carousel.animationSecondFn().ul}</li>`
        } else if (i === 2) {
            inner += `<li index = ${i}>${Carousel.animationThirdFn().ul}</li>`
        } else if (i === 3){
            inner += `<li index = ${i}>${Carousel.animationFourthFn().ul}</li>`
        }  else {
            inner += `<li index = ${i}></li>`
        }
    }

    return {
        li: inner
    };

};

/**
 *  生成第一个li内置动画元素
 */
Carousel.animationFirstFn = function() {
    return {
        ul: `
                <ul class="list-animation">
                    <li>
                        <p>《王者荣耀》是腾讯第一5V5团队公平竞技手游</p>
                        <p>于10月28日开启不限号测试！</p>
                    </li>
                    <li>
                        <p>有什么模式？</p>
                        <p>5V5王者峡谷、5V5深渊大乱斗、以及3V3、1V1</p>
                    </li>
                    <li>
                        <p>召唤师您是否已准备充分</p>
                        <p>与好友组队登顶最强王者！</p>
                    </li>
                    <li>
                        <p>一血！五杀！超神！</p>
                    </li>
                </ul>
        `
    }
};

/**
 *  生成第二个li内置动画元素
 */
Carousel.animationSecondFn = function() {

    let inner = '我们拥有5V5经典地图，使用三路推塔核心玩法，呈现出最原滋原味的MOBA游戏对战体验！在王者荣耀里，我们根据英雄玩法使用不同的策略，根据英雄特色组建完美阵容，默契配合成就最强王者！';

    return {
        ul: `
                   <ul class="open-animation"><li>${inner}</li></ul> 
            `
    }
};

/**
 *  生成第三个li内置动画元素
 */
Carousel.animationThirdFn = function() {
    return {
        ul: "<div class='third-animation'></div>>"
    }
};


/**
 *  生成第四个li内置动画元素
 */
Carousel.animationFourthFn = function () {

    let arr = [
        '指的是英雄的右下方可升级技能中从左往右数第一个技能，每2级可以升级一次，技能最高可达6级',
        '指的是英雄的右下方可升级技能中从左往右数第二个技能，每2级可以升级一次，技能最高可达6级',
        '指的是英雄的右下方可升级技能中从左往右数第二个技能，每4级可以升级一次，技能最高可达3级'
    ];


    let inner = arr.map((item,index)=>{
        return `<li key=${index}>${item}</li>`
    });

    return {
        ul : `<ul class="fourth-animation">${inner}</ul>`
    }
};

new Carousel({
    dom: document.querySelector('.page')
});