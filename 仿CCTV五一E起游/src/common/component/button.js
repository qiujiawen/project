import React from 'react';
import './viewShow';
import {viewShowHandle} from "./viewShow";

export default class ButtonComponent extends React.Component {

    constructor(props) {
        super(props);
        this.labelBtn = React.createRef();
    }

    state = {
        ifShow: true
    };


    /**
     *  按钮在不同页面下展示不同形态
     */
    touchEndHandle = () => {

        //  主页状态下
        let {name} = this.props;

        if (name === 'home') {

            let {score, tag} = this.props;
            if (score && tag) {
                this.viewShow();
            } else {
                this.showIfHiddenHandle();
            }

        } else if (name === 'form') {

            //  给视频/照片添加标签页面下
            let {formTag} = this.props;

            if (formTag) {
                let form = document.querySelector('.form-wrap'),
                    again = document.querySelector('.again-wrap');
                viewShowHandle(again, form)
            } else {
                this.showIfHiddenHandle();
            }

        } else if (name === 'again') {

            //  再次评价页面
            let home = document.querySelector('.home-wrap'),
                again = document.querySelector('.again-wrap');
            viewShowHandle(home, again);
        }
    };

    showIfHiddenHandle = () => {
        //  p标签显示
        this.setState({
            ifShow: false
        });

        //  p标签2秒后消失
        setTimeout(() => {
            this.setState({
                ifShow: true
            });
        }, 2000);
    };

    /**
     * 主页消失，遮罩层显示
     */
    viewShow = () => {
        let home = document.querySelector('.home-wrap'),
            mask = document.querySelector('.mask-wrap'),
            news = document.querySelector('.news-wrap');
        mask.classList.add('page-show');
        home.style.filter = 'blur(10px)';
        setTimeout(function () {
            home.classList.add('page-hidden');
            home.style.filter = 'blur(0px)';
            mask.classList.add('page-hidden');
        }, 3000);
        setTimeout(function () {
            news.classList.add('page-show');
            home.classList.remove('page-hidden');
            mask.classList.remove('page-hidden');
            home.classList.remove('page-show');
            mask.classList.remove('page-show');
        }, 4000);
    };


    render() {

        let {className, value} = this.props;

        return <label className='label-btn' ref={this.labelBtn} onTouchEnd={this.touchEndHandle}>
            <p className={this.state.ifShow ? 'btn-info btn-info-default' : 'btn-info btn-info-default btn-info-active'}>请先评分</p>
            <input type="submit" value={value} className={className}/>
        </label>
    }
}