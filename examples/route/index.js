import {HashRouter,Switch,Route,Link,Redirect} from 'react-router-dom';
import React,{Component} from 'react';

import MainPage from '../pages/MainPage/index.js';
import DialogPage from '../pages/Dialog/index.js';
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
	          </Switch>
	       </HashRouter>
      )
    }
}

export default Router;