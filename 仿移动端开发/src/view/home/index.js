import React from 'react';
import MenuPage from '../../common/component/menuPage';
import Tab from '../../common/component/tab';
import HomeCourse from './course';
import Vip from './vip';
import News from './news';
import WorkList from './workList';
import LoadMore from '../../common/component/load-more';
import '../../common/css/home.css';
let tabImg = [
    require('../../common/img/tab/img1.png'),
    require('../../common/img/tab/img2.png'),
    require('../../common/img/tab/img3.png'),
    require('../../common/img/tab/img4.png'),
];
export default class Home extends React.Component{
    state = {
        headerState:{
            menu : true,
            login : true,
            back : false
        }
    };
    render(){
        return (
            <div className='home-wrap'>
                <MenuPage className=''>
                    <div className='page-con'>
                        <LoadMore
                            renderComponent = {WorkList}
                            urlParameter = 'lists'
                            postParameter = {{
                                order:'desc',
                                sort:'id',
                                category_id:1,
                                recommend:1
                            }}
                            rows = {6}
                        >
                            <Tab
                                className='banner'
                                data={tabImg}
                                renderItem = {
                                    (item)=>{
                                        return(
                                            <img src={item} alt=""/>
                                        )
                                    }
                                }
                            />
                            <HomeCourse/>
                            <Vip/>
                            <News/>
                        </LoadMore>
                    </div>
                </MenuPage>
            </div>
        )
    }
}