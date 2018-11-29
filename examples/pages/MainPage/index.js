import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class MainPage extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
            <div>
                  <div>
                      <Link to="/Dialog">Dialog</Link>
                  </div>
                  <div>
					            <Link to="/Frame">Frame</Link>
                  </div>
                  <div>
                      <Link to="/NumberCard">NumberCard</Link>
                  </div>
                  <div>
                      <Link to="/ExpandList">ExpandList</Link>
                  </div>
                  <div>
                      <Link to="/VoiceReceive">VoiceReceive</Link>
                  </div>
                <div>
                      <Link to="/VoiceReceive2">VoiceReceive2</Link>
                  </div>
                  <div>
                      <Link to="/Iscroll">Iscroll</Link>
                  </div>
                  <div>
                      <Link to="/input">Input</Link>
                  </div>
                <div>
                    <Link to="/SingleRecommend">SingleRecommend</Link>
                </div>

                <div>
                    <Link to="/Recommend">Recommend</Link>
                </div>

                <div>
                    <Link to="/InputSample">InputSample</Link>
                </div>
                <div>
                    <Link to="/dotdotdot">DotDymEffect</Link>
                </div>
            </div>
		)
	}
}

export default MainPage;