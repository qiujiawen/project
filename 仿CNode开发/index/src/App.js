import React, { Component } from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import HeaderComponent from './common/component/header';
import FooterComponent from './common/component/footer';
import ContentComponent from './common/component/content';
import Home from './view/home/index';
import About from './view/about/index';
import Book from './view/book/index';
import Details from './view/details/index';
import User from './view/user/index';
import Login from './view/login/index';
import Register from './view/register/index';
import reducer from './common/redux/reducer/index';
import './common/css/index.css';
let store = createStore(reducer,applyMiddleware(thunk));
class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <div id='page'>
                <HeaderComponent/>
                <ContentComponent>
                    <Switch>
                        <Route path='/index/:id' component={Home}/>
                        <Route exact path='/' render={()=>{
                            return (
                                <Redirect to='/index/all'/>
                            )
                        }}/>
                        <Route path='/about' component={About}/>
                        <Route path='/book' component={Book}/>
                        <Route path='/details/:id' component={Details}/>
                        <Route path='/user/:id' component={User}/>
                        <Route path='/register' component={Register}/>
                        <Route path='/login' component={Login}/>
                    </Switch>
                </ContentComponent>
                <FooterComponent/>
            </div>
        </Provider>
    );
  }
}
export default App;
