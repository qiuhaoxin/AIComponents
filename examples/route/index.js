import {HashRouter,Switch,Route,Link,Redirect} from 'react-router-dom';
import React,{Component} from 'react';

import MainPage from '../pages/MainPage/index.js';
import DialogPage from '../pages/Dialog/index.js';
import FramePage from '../pages/Frame/index.js';

import NumberCardPage from '../pages/NumberCard/index.js';
class Router extends Component{
    constructor(props){
    	super(props);
    }
    render(){
      return (
	       <HashRouter>
	          <Switch>
	              <Route exact path="/" component={MainPage}></Route>
	              <Route path="/Dialog" component={DialogPage}/>
                <Route path="/Frame" component={FramePage} />
                <Route path="/NumberCard" component={NumberCardPage} />
	          </Switch>
	       </HashRouter>
      )
    }
}

export default Router;