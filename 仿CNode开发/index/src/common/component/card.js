import React from 'react';
import {Card} from 'antd';
export default class CardComponent extends React.Component{
    render(){
        let {data} = this.props;
        return(
            data.map((item,index)=>{
                return(
                    <Card
                        key={index}
                        title={item.title}
                        type='inner'
                    >
                        <div
                            dangerouslySetInnerHTML={{
                                __html:item.content
                            }}
                        >
                        </div>
                    </Card>
                )
            })
        )
    }
}