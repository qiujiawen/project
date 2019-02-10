import React from 'react';
import Tag from '../../common/component/tag';
import ButtonComponent from '../../common/component/button';
import '../../common/css/form.css';

export default class Form extends React.Component {

    state = {
        data: {
            title: '给视频/图片添加标签',
            tag: [
                '点赞', '吐槽', '投诉', '表扬', '弱爆了', '给力', '分享', '感动', '气愤',
                '开心', '抓拍', '惊喜'
            ],
            name: 'form-tag'
        },
        tag: false,
        form: 'form'
    }

    checkedTagHandle = () => {
        this.setState({
            tag: true
        })
    };

    render() {

        return <section className='page form-wrap'>
            <Tag
                data={this.state.data}
                checkedTagHandle={this.checkedTagHandle}
            />
            <textarea rows="6" className='form-text' placeholder='（选填：说点什么呢~ ~）'>
            </textarea>
            <input type="tel" className='form-text' placeholder='请输入手机号码'/>
            <ButtonComponent
                value={'上传'}
                className={this.state.tag ? 'btn btn-active' : 'btn'}
                formTag={this.state.tag}
                name={this.state.form}
            />
        </section>
    }
}