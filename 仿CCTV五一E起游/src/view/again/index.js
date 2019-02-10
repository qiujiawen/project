import React from 'react';
import ButtonComponent from '../../common/component/button';
import '../../common/css/again.css';

export default class Again extends React.Component {

    render() {
        return <section className='page again-wrap'>
            <div className='tree again-tree'>
                <img src={require('../../common/img/tree.jpg')} alt="" className='tree-img'/>
                <div className='extra'>
                    <img src={require('../../common/img/tranks2.png')} alt=""/>
                </div>
                <span className='cloud'></span>
                <span className='cloud'></span>
                <span className='cloud'></span>
            </div>
            <ButtonComponent
                value={'再次评价'}
                className={'btn btn-active'}
                name = 'again'
            />
        </section>
    }
}