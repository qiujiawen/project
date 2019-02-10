import React from 'react';
import '../../common/component/viewShow';
import '../../common/css/news.css';
import {viewShowHandle} from "../../common/component/viewShow";

export default class News extends React.Component {

    constructor(props) {
        super(props);
        this.news = React.createRef();
    }

    viewShow = () => {
        let news = this.news.current,
            form = document.querySelector('.form-wrap');
        viewShowHandle(form, news);
    };

    videoChangedHandle = () => {

        let news = this.news.current,
            video = news.querySelector('.video');

        if (video.files[0].type.split('/')[0] === 'video') {
            if (video.files[0].size >= 10 * 1024 * 1024) {
                alert('文件大于10兆');
            } else {
                this.viewShow();
                video.value = '';
            }
        }else {
            alert('请上传视频');
        }
    };

    photoChangedHandle = ()=>{
        let news = this.news.current,
            photo = news.querySelector('.photo');
        if (photo.files[0].type.split('/')[0] === 'image'){
            if (photo.files[0].size >= 1024*1024){
                alert('图片大于1兆');
            } else {
                this.viewShow();
                photo.value = '';
            }
        } else {
            alert('请上传图片');
        }
    };

    render() {
        return <section className='page news-wrap' ref={this.news}>
            <img src={require('../../common/img/news.png')} alt=""/>
            <h2>请上传旅游投诉以及突发事件线索</h2>
            <section className='news-file'>
                <label>
                    <input type="file" onChange={this.videoChangedHandle} className='video'/>
                    <span>导入视频</span>
                </label>
                <label>
                    <input type="file" onChange={this.photoChangedHandle} className='photo'/>
                    <span>上传照片</span>
                </label>
            </section>
        </section>
    }
};