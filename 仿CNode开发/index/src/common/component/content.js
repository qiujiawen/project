import React from 'react';
export default class ContentComponent extends React.Component{
    render(){
        return(
            <div className='content-wrap'>
                {this.props.children}
            </div>
        )
    }
}