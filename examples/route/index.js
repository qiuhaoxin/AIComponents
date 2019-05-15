import {HashRouter,Switch,Route,Link,Redirect} from 'react-router-dom';
import React,{Component} from 'react';

import MainPage from '../pages/MainPage/index.js';
import DialogPage from '../pages/Dialog/index.js';
import FramePage from '../pages/Frame/index.js';
import ExpandListPage from '../pages/ExpandList/index.js';

import NumberCardPage from '../pages/NumberCard/index.js';
import VoiceReceivePage from '../pages/VoiceReceive/index.js';
import Iscroll from '../pages/Iscroll/index.js';
import InputPage from '../pages/input/index.js';
import RecommendPage from '../pages/Recommend/index.js';
import Input from '../pages/InputSample/index'
import DotDymEffectPages from '../pages/DotDymEffectPages/index'
import FeedbackPages   from '../pages/FeedbackPages/index';
import VoiceLoadingPage from '../pages/VoiceLoading/index';
import NumberCardConfigPage from '../pages/NumberCardConfig/index';
import SingleRecommend from '../pages/SingleRecommend/index';
import ChartPage from '../pages/Chart/index';
class Router extends Component{
    constructor(props){
    	super(props);
    }
    render(){
      return (
	       <HashRouter>
	          <Switch>
	            <Route exact path="/" component={MainPage}></Route>
            
	          </Switch>
	       </HashRouter>
      )
    }
}

export default Router;


/**
 *     <Route path="/Dialog" component={DialogPage}/>
 *                 <Route path="/Frame" component={FramePage} />
                <Route path="/NumberCard" component={NumberCardPage} />
                <Route path="/ExpandList" component={ExpandListPage} />
                <Route path="/VoiceReceive" component={VoiceReceivePage} />
                <Route path="/Iscroll" component={Iscroll} />
                <Route path='/input' component={InputPage} />
                <Route path='/SingleRecommend' component={SingleRecommend} />
                <Route path='/Recommend' component={RecommendPage} />
                <Route path='/InputSample' component={Input} />
                <Route path='/dotdotdot' component={DotDymEffectPages} />
                <Route path='/feedback' component={FeedbackPages} />
                <Route path='/voiceLoading' component={VoiceLoadingPage} />
                <Route path='/numberCardConfig' component={NumberCardConfigPage} />
                <Route path='/chart' component={ChartPage} />
 */