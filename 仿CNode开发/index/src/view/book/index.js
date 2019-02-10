import React from 'react';
import {Link} from 'react-router-dom';
import data from './data';
import CardComponent from "../../common/component/card";
export default class Book extends React.Component{
    render(){
        return(
            <div className='book-wrap wrap banner'>
                <div className='purpose-header'>
                    <p><Link to='/index/all'>主页</Link><span>/</span></p>
                    <p>Node.js 新手入门</p>
                </div>
                <CardComponent
                    data={data}
                />
            </div>
        )
    }
};