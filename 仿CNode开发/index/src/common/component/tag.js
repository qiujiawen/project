import React from 'react';
import {Tag} from 'antd';
let tab = {
    top:{
        color:'magenta',
        txt:'置顶'
    },
    good:{
        color:'geekblue',
        txt:'精华'
    },
    job:{
        color:'cyan',
        txt:'招聘'
    },
    share:{
        color:'purple',
        txt:'分享'
    },
    ask:{
        color:'green',
        txt:'问答'
    },
    dev:{
        color:'lime',
        txt:'测试'
    }
};
function getTab(data) {
    if (!data.tab){
        return
    }
    return (
        data.top?"top":data.good?'good':data.tab
    )
}

export default class TagComponent extends React.Component{
    render(){
        let nowTab={};
        if (this.props.data.tab){
            nowTab = tab[getTab(this.props.data)];
        }
        return(
            !this.props.data.tab? <Tag color='red'>{'其他'}</Tag>:<Tag color={nowTab.color}>{nowTab.txt}</Tag>
        )
    }
}