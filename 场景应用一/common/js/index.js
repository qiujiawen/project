/**
 *  开始页面的添加动画监听事件
 */
(function () {

    let text1 = document.querySelector('.t1'),
        wrap = document.querySelector('.wrap'),
        listWrap = wrap.querySelector('.list-wrap'),
        firstLi = listWrap.querySelectorAll('li')[0],
        startPage = document.querySelector('.start-page'),
        mask = document.querySelector('.start-mask'),
        extra = document.querySelector('.extra'),
        audio = document.querySelector('.music audio'),
        text2 = document.querySelector('.t2');

    text1.addEventListener('animationIteration', function (e) {
        if (e.elapsedTime === 4) {
            text1.classList.remove('start-text-animation');
            text2.classList.add('start-text-animation');
        }
    });

    text1.addEventListener('webkitAnimationIteration', function (e) {
        if (e.elapsedTime === 4) {
            text1.classList.remove('start-text-animation');
            text2.classList.add('start-text-animation');
            extra.addEventListener('touchstart', function () {
                mask.classList.add('start-mask-hidden');
                audio.play();
                setTimeout(function () {
                    startPage.classList.add('hidden');
                    startPage.classList.remove('show');
                    wrap.classList.add('show');
                    wrap.classList.remove('hidden');
                    firstLi.classList.add('li-show');
                    listImgAnimation(0);
                }, 1000)
            })
        }
    });


})();


/**
 *  每个li向上或者向下滑动的事件
 */
(function swipePicture() {

    let listWrap = document.querySelector('.list-wrap'),
        arrowSpan = document.querySelector('.arrow span'),
        disPoint = {},
        nowIndex = 0,
        nextIndex = 0,
        ifClick = false,
        arrLi = listWrap.querySelectorAll('li');

    arrLi.forEach((item, index) => {

        item.addEventListener('touchstart', function (e) {

            this.startPoint = {
                x: e.changedTouches[0].pageX,
                y: e.changedTouches[0].pageY
            };

            nowIndex = index;
            ifClick = false;

        });

        item.addEventListener('touchmove',function (e) {

            let nowPoint = {
                x: e.changedTouches[0].pageX,
                y: e.changedTouches[0].pageY
            };

            disPoint = {
                x: nowPoint.x - this.startPoint.x,
                y: nowPoint.y - this.startPoint.y
            };

            if (disPoint.y !== 0){
                if (Math.abs(disPoint.y) > 5 ) {
                    ifClick = true;
                    item.classList.remove('li-next-animation');
                    item.classList.remove('li-next-second-animation');
                }
            }

        });

        item.addEventListener('touchend', function (e) {

            if (ifClick){

                let nowPoint = {
                    x: e.changedTouches[0].pageX,
                    y: e.changedTouches[0].pageY
                };

                disPoint = {
                    x: nowPoint.x - this.startPoint.x,
                    y: nowPoint.y - this.startPoint.y
                };

                if (disPoint.y < 0) {

                    nextIndex = nowIndex === arrLi.length - 1 ? 0 : nowIndex + 1;

                    item.classList.add('li-now-animation');

                    setTimeout(function () {
                        arrLi[nextIndex].classList.add('li-show');
                        arrLi[nextIndex].classList.add('li-next-animation');
                        item.classList.remove('li-show');
                        item.classList.remove('li-now-animation');
                    }, 300);

                } else if (disPoint.y > 0) {

                    nextIndex = nowIndex === 0 ? arrLi.length - 1 : nowIndex - 1;

                    item.classList.add('li-now-second-animation');
                    arrLi[nextIndex].classList.add('li-show');
                    arrLi[nextIndex].classList.add('li-next-second-animation');
                    setTimeout(function () {
                        item.classList.remove('li-show');
                        item.classList.remove('li-now-second-animation');
                    }, 1000);

                }

                listImgAnimation(nextIndex);
                delListImgAnimation(nowIndex);
                arrowSpan.innerHTML = `${nextIndex + 1}/${arrLi.length}`;

            }

        });

    })

})();

/**
 *  li内部的动画效果
 */
function listImgAnimation(nextIndex) {

    let listWrap = document.querySelector('.list-wrap'),
        arrLi = listWrap.querySelectorAll('li'),
        arrImg = arrLi[nextIndex].querySelectorAll('img');


    arrImg[0].classList.add('list-img-animation');
    arrImg[1].classList.add('list-second-img-animation');

    arrImg[1].addEventListener('animationEnd', function () {
        arrImg[2].classList.add('list-third-img-animation');
    });

    arrImg[1].addEventListener('webkitAnimationEnd', function () {
        arrImg[2].classList.add('list-third-img-animation');
    });
}

/**
 *  li内部的动画效果
 */
function delListImgAnimation(index) {

    let listWrap = document.querySelector('.list-wrap'),
        arrLi = listWrap.querySelectorAll('li'),
        arrImg = arrLi[index].querySelectorAll('img');
    arrImg[2].classList.remove('list-third-img-animation');

    setTimeout(function () {
        arrImg[0].classList.remove('list-img-animation');
        arrImg[1].classList.remove('list-second-img-animation');
    }, 1000)
}

/**
 *  音乐
 */

(function music() {

        let music = document.querySelector('.music'),
            audio = music.querySelector('audio');

        music.addEventListener('touchstart',function () {

            if (audio.paused){
                audio.play();
                music.classList.add('play');
                music.classList.remove('stop');
            } else {
                audio.pause();
                music.classList.add('stop');
                music.classList.remove('play');
            }

        })
})();
