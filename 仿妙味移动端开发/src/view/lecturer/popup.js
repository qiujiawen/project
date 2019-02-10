import React from 'react';
import BScroll from 'better-scroll';
export default class Popup extends React.Component{

    componentDidMount() {
        let {scrollWrap} = this.refs;
        new BScroll(scrollWrap,{
            bounce:false
        });
    }

    render(){
        let {close,popupData} = this.props;
        return (
            <div className='popup' onTouchEnd={close}>
                <div className='popup-win' onTouchEnd={(e)=>{e.stopPropagation();}}>
                    <div
                        className='popup-photo'
                        style={{
                            backgroundImage:`url(${popupData.icon})`
                        }}
                    >
                    </div>
                    <h3 className='popup-title'>{popupData.title}</h3>
                    <div className='popup-con'
                         ref='scrollWrap'
                         dangerouslySetInnerHTML={{
                             __html:popupData.content
                         }}
                    >
                    </div>
                    <a
                        className='close'
                    >
                    </a>
                </div>
            </div>
        )
    }
}