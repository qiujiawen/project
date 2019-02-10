import React from 'react';
import Tab from './tab';
import Score from './score';
import Tag from '../../common/component/tag';
import ButtonComponent from '../../common/component/button';
import '../../common/component/viewShow';
import '../../common/css/home.css';
import {viewShowHandle} from "../../common/component/viewShow";

export default class Home extends React.Component {

    state = {
        data: {
            title: '添加标签',
            tag: [
                '服务好', '景色赞', '千篇一律', '看人海', '挤爆了', '如厕难', '贼贵', '累挂了', '再来一次',
                '再也不来'
            ],
            name: 'home-tag'
        },
        score: false,
        tag: false,
        home: 'home'
    };

    activeStarHandle = () => {
        this.setState({
            score: true
        })
    };

    starHandle = () => {
        this.setState({
            score: false
        })
    };


    checkedTagHandle = () => {
        this.setState({
            tag: true
        })
    };

    viewShow = () => {
        let home = document.querySelector('.home-wrap'),
            news = document.querySelector('.news-wrap');
        viewShowHandle(news, home)
    };

    render() {
        return <section className='page home-wrap'>
            <div className='scroll-wrap'>
                <Tab/>
                <Score
                    starHandle={this.starHandle}
                    activeStarHandle={this.activeStarHandle}
                />
                <Tag
                    data={this.state.data}
                    checkedTagHandle={this.checkedTagHandle}
                />
                <ButtonComponent
                    value={'提交'}
                    className='btn btn-active'
                    score={this.state.score}
                    tag={this.state.tag}
                    name={this.state.home}
                />
                <a className='home-news' onTouchEnd={this.viewShow}>
                    <em>新闻线索</em>
                    <span></span>
                    <span></span>
                    <span></span>
                </a>
            </div>
        </section>
    }
};