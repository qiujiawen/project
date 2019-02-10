import React from 'react';

export default class Tag extends React.Component {

    touchEndHandle = (e) => {
        this.props.checkedTagHandle && this.props.checkedTagHandle();
    };

    createDom = () => {

        let {tag, name} = this.props.data;

        return tag.map((item, index) => {
            return <label key={index} onTouchEnd={this.touchEndHandle}>
                <input type="radio" value={item} name={name}/>
                <span>{item}</span>
            </label>
        });
    };

    render() {

        let {title, name} = this.props.data;

        return <section className={`tag ${name}`}>
            <h2 className='tag-title'>{title}</h2>
            {this.createDom()}
        </section>
    }
}