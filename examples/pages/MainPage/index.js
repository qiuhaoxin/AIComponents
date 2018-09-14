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
            </div>
		)
	}
}

export default MainPage;