import React from 'react';

export default class Score extends React.Component {

    constructor(props) {
        super(props);
        this.scoreList = React.createRef();
    }

    state = {
        score: [{
            name: "综合印象",
            star: -1,
        }, {
            name: "服务指数",
            star: -1,
        }, {
            name: "消费指数",
            star: -1,
        }],
        inputData: ['很差', '差', '一般', '中等', '优秀']
    }

    /**
     * 创建DOM元素的函数
     * @returns {any[]}
     */
    createDom = () => {

        return this.state.score.map((item, index) => {

            return <li key={index} data-index={index}>
                <span>{item.name}</span>
                <nav>{this.createDomSpan(item.star)}</nav>
                <input type="hidden" name='0'/>
            </li>
        });
    };

    createDomSpan = (star) => {
        let arr = [];
        for (let i = 0; i < 5; i++) {
            arr.push(<a className={star > -1 && star >= i ? "score-active" : ""} key={i} data-index={i}
                        onTouchEnd={this.touchEndHandle}></a>)
        }
        return arr;
    };

    listTouchEnd = ()=> {
        let list = this.scoreList.current,
            num = 0,
            arrInput = list.querySelectorAll('input');
        arrInput.forEach((item)=>{
            if (parseInt(item.name) !== 0){
                num++;
                if (num === 3){
                    this.props.activeStarHandle();
                }
            }else if (parseInt(item.name) === 0){
                this.props.starHandle();
            }
        })
    };

    touchEndHandle = (e) => {

        let targetNode = e.target,
            nowIndex = targetNode.getAttribute("data-index"),
            parentIndex = targetNode.parentNode.parentNode.getAttribute("data-index"),
            currentInput = targetNode.parentNode.parentNode.querySelector('input'),
            score = this.state.score;

        score[parentIndex].star = nowIndex == score[parentIndex].star ? -1 : nowIndex;

        nowIndex == score[parentIndex].star ? currentInput.name = this.state.inputData[nowIndex] : currentInput.name = '0';

        this.setState({
            score
        })
    };

    render() {
        return <section className='score'>

            <h2 className='score-title'>给景区评分</h2>

            <ul className='score-list' ref={this.scoreList} onTouchEnd={this.listTouchEnd}>
                {this.createDom()}
            </ul>

        </section>
    }
}