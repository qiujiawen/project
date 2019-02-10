import React, {Component} from 'react';
import './common/css/index.css';
import Welcome from './view/welcome/index';
import Home from './view/home/index';
import Mask from './view/mask/index';
import News from './view/news/index';
import Form from './view/form/index';
import Again from './view/again/index';
class App extends Component {
    render() {
        return (
            <div className="app">
                <Welcome/>
                <Again/>
                <Form/>
                <News/>
                <Mask/>
                <Home/>
            </div>
        );
    }
}

export default App;
