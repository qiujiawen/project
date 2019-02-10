import React, {Component} from 'react';
import {Link} from "react-router-dom";
import data from './data';
import CardComponent from '../../common/component/card';
export default class About extends Component{
    render(){
        return(
            <div className='about-wrap wrap banner'>
                <div className='purpose-header'>
                    <p><Link to='/index/all'>主页</Link><span>/</span></p>
                    <p>关于</p>
                </div>
                <CardComponent
                    data={data}
                />
            </div>
        )
    }
};