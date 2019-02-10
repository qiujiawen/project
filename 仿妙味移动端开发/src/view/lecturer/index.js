import React from 'react';
import MenuPage from '../../common/component/menuPage';
import Footer from '../../common/component/footer';
import Tab from '../../common/component/tab';
import JoinUs from './join-us';
import JobDescription from './job-description';
import Popup from './popup';
import '../../common/css/lecturer.css';
import axios from 'axios';
import qs from 'qs';

let dataImg = [
    [
        {id: 1, name: 'leo1', img: require('../../common/img/job-photo.png')},
        {id: 2, name: 'leo2', img: require('../../common/img/job-photo.png')},
        {id: 3, name: 'leo3', img: require('../../common/img/job-photo.png')}
    ],
    [
        {id: 4, name: 'leo1', img: require('../../common/img/job-photo.png')},
        {id: 5, name: 'leo2', img: require('../../common/img/job-photo.png')},
        {id: 6, name: 'leo3', img: require('../../common/img/job-photo.png')}
    ],
    [
        {id: 7, name: 'leo1', img: require('../../common/img/job-photo.png')},
        {id: 8, name: 'leo2', img: require('../../common/img/job-photo.png')},
        {id: 9, name: 'leo3', img: require('../../common/img/job-photo.png')}
    ]
];
export default class Lecture extends React.Component {

    state = {
        data : [],
        openPopup : false,
        popupData:{}
    };
    
    componentDidMount() {
        this.getData();
    }

    getData = ()=>{
        axios.post(
            'https://www.koocv.com/lecturer/lists?page=1&rows=100',
            qs.stringify({
                order:'desc',
                sort:'id',
                category_id:2
            })).then((res)=>{
            let arr1 = [];
            for (let i=0;i<res.data.length/3;i++){
                let arr2 = [];
                for (let j=0;j<res.data.length;j++){
                    if (i*3<=j&&j<(i+1)*3){
                        arr2.push(res.data[j]);
                    }
                }
                arr1.push(arr2);
            }
            this.setState({
                data:arr1
            });
        }).catch((error)=>{
            console.log(error);
        })
    };
    
    getPopupData = (id)=>{
        let {data} = this.state;
        let filterData = [];
        data.forEach((item)=>{
            filterData = filterData.concat(item);
        });
        let filterData1 = filterData.filter((item)=>{
            return item.id === id;
        });
        this.setState({
            openPopup : true,
            popupData:filterData1[0]
        });
    };

    changedOpenPopup = ()=>{
        this.setState({
            openPopup : false
        });
    };

    renderTab = ()=>{
        let {data} = this.state;
        return (
            <Tab
                className='lecturer-item-tab'
                data={data}
                renderItem={
                    (item) => {
                        return (
                            <ul className='lecturer-item-tab-list'>
                                {item.map((item, index) => {
                                    return (
                                        <li key={item.id}
                                            onTouchStart={(e)=>{
                                                e.currentTarget.point = {
                                                    x:e.changedTouches[0].pageX,
                                                    y:e.changedTouches[0].pageY
                                                }
                                            }}
                                            onTouchEnd={(e)=>{
                                                let nowPoint = {
                                                    x:e.changedTouches[0].pageX,
                                                    y:e.changedTouches[0].pageY
                                                };
                                                let dix = Math.abs(e.currentTarget.point.x-nowPoint.x)+Math.abs(e.currentTarget.point.y-nowPoint.y);
                                                if (dix<5){
                                                    this.getPopupData(item.id);
                                                }
                                            }}
                                        >
                                            <a>
                                                <div
                                                    className='lecturer-item-tab-list-thumbnail'
                                                    style={
                                                        {backgroundImage: `url(${item.icon})`}}
                                                >
                                                </div>
                                                <p
                                                    className='lecturer-item-tab-list-name'>
                                                    {item.title}
                                                </p>
                                            </a>
                                        </li>
                                    )
                                })}
                            </ul>
                        )
                    }
                }
            />
        )
    };

    render() {
        return (
            <div className='lecturer-wrap'>
                <MenuPage className='lecturer-page'>
                    <div className='page-con'>
                        <section className='lecturer-item'>
                            <h2 className='lecturer-item-title'>
                                <img src={require('../../common/img/lecturer-title.png')} alt=""/>
                            </h2>
                            {this.state.data.length>0?this.renderTab():''}
                        </section>
                        <JoinUs/>
                        <JobDescription/>
                    </div>
                    <Footer/>
                </MenuPage>
                {this.state.openPopup?
                    <Popup
                        popupData={this.state.popupData}
                        close={this.changedOpenPopup}
                    /> : ''
                }
            </div>
        )
    }
}