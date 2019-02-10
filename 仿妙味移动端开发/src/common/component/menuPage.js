import React from 'react';
import Header from './header';
import Menu from './menu';
export default class MenuPage extends React.Component{
    state = {
        headerState:{
            menu : true,
            login : true,
            back : false
        },
        openMenu:false
    };
    changedOpenMenu=()=>{
        this.setState({
            openMenu:!this.state.openMenu
        })
    };

    componentDidMount() {
        let {view} = this.refs;
        let that = this;
        view.addEventListener('touchmove',function (e) {
            if (that.state.openMenu){
                e.preventDefault();
            }
        });


    /*
        let aMenu = Array.from(view.querySelectorAll('#menu a'));
        let aHeader = Array.from(view.querySelectorAll('.header a'));
        let aSet = aMenu.concat(aHeader);
        aSet.forEach((item)=>{
            item.addEventListener('touchstart',function (e) {
                this.point = {
                    x:e.changedTouches[0].pageX,
                    y:e.changedTouches[0].pageY
                };
            });
            item.addEventListener('touchend',function (e) {
                let nowPoint = {
                    x : e.changedTouches[0].pageX,
                    y : e.changedTouches[0].pageY
                };
                let addPoint = Math.abs(nowPoint.x-this.point.x)+Math.abs(nowPoint.y-this.point.y);
                if (that.state.openMenu && this.href && (addPoint<2)){
                    window.location.href = this.href;
                }
            });
        });
     */
    }
    
    render(){
        let {children,className,id} = this.props;
        let {openMenu,headerState} = this.state;
        let {changedOpenMenu} = this;
        return (
            <div className='menu-page' ref='view'
                 onTouchEnd={()=>{
                     if (openMenu){
                         changedOpenMenu();
                     }
                 }}
            >
                <Header {...headerState} changedOpenMenu={changedOpenMenu}/>
                <Menu/>
                <div
                    className={`page ${className}`} id={`${id}`}
                    style={{
                        transform:openMenu?'translate3d(4.5rem,0,0)':'',
                        transition:openMenu?'.5s cubic-bezier(.02,.84,.26,1.18)':'.3s'
                    }}
                >
                    {children}
                </div>
            </div>
        )
    }
}