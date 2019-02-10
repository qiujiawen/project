import React from 'react';
import '../../common/css/welcome.css';
import '../../common/component/viewShow';
import {viewShowHandle} from "../../common/component/viewShow";
export default class Welcome extends React.Component {

    //  当前页面消失和主页显示
    viewShow = () => {
        let home = document.querySelector('.home-wrap'),
            time = new Date().getTime(),
            time1 = 0,
            welcome = document.querySelector('.welcome-wrap');
        time1 = setInterval(function () {
            if (new Date().getTime() - time > 5000) {
                viewShowHandle(home,welcome);
                clearInterval(time1);
            }
        }, 1000)

    };

    componentDidMount() {
        this.viewShow();
    }

    render() {
        return <section className='page page-show welcome-wrap'>

            <div className='tree'>
                <img src={require('../../common/img/tree.jpg')} alt="" className='tree-img'/>
                <div className='extra'>
                    <img src={require('../../common/img/title.png')} alt=""/>
                    <span className='shake'></span>
                </div>
                <img src={require('../../common/img/title2.png')} alt="" className='title2'/>
                <span className="cloud"></span>
                <span className="cloud"></span>
                <span className="cloud"></span>
            </div>

            <div className='welcome-logo-wrap'>
                <h1><img src={require('../../common/img/logo.png')} alt=""/></h1>
            </div>

        </section>
    }
};