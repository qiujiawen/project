class Arrow {

    constructor(option) {
        this.option = option;
        this.init();
    }

    /**
     *  创建元素、添加元素
     */
    init() {

        let {dom} = this.option,
            div = document.createElement('DIV');

        dom.appendChild(div);
        div.classList.add('arrow');
    }

}

new Arrow({
    dom: document.querySelector('.page')
});