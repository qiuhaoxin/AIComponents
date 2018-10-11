import React,{Component} from 'react';
import './index.less';
import iScroll from 'iscroll/build/iscroll-lite';
import Iscroll from '../../../src/components/Iscroll';

class IscrollTest extends Component{
	constructor(props){
		super(props);
	}
	state={
       url:'',
	}
    handleClick=()=>{
    	console.log("hei");
    	if(this.wrapper){
    		this.wrapper.scrollBy(0,-200,200);
    	}
    }
	render(){
		return (
            <div className={'wrapper'}>
	            <Iscroll ref={el=>this.wrapper=el} iScroll={iScroll} className="example" options={{ mouseWheel: false }}>
		              <ul>
			<li>Pretty row 1</li>
			<li>Pretty row 2</li>
			<li>Pretty row 3</li>
			<li>Pretty row 4</li>
			<li>Pretty row 5</li>
			<li>Pretty row 6</li>
			<li>Pretty row 7</li>
			<li>Pretty row 8</li>
			<li>Pretty row 9</li>
			<li>Pretty row 10</li>
			<li>Pretty row 11</li>
			<li>Pretty row 12</li>
			<li>Pretty row 13</li>
			<li>Pretty row 14</li>
			<li>Pretty row 15</li>
			<li>Pretty row 16</li>
			<li>Pretty row 17</li>
			<li>Pretty row 18</li>
			<li>Pretty row 19</li>
			<li>Pretty row 20</li>
			<li>Pretty row 21</li>
			<li>Pretty row 22</li>
			<li>Pretty row 23</li>
			<li>Pretty row 24</li>
			<li>Pretty row 25</li>
			<li>Pretty row 26</li>
			<li>Pretty row 27</li>
			<li>Pretty row 28</li>
			<li>Pretty row 29</li>
			<li>Pretty row 30</li>
			<li>Pretty row 31</li>
			<li>Pretty row 32</li>
			<li>Pretty row 33</li>
			<li>Pretty row 34</li>
			<li>Pretty row 35</li>
			<li>Pretty row 36</li>
			<li>Pretty row 37</li>
			<li>Pretty row 38</li>
			<li>Pretty row 39</li>
			<li>Pretty row 40</li>
			<li>Pretty row 41</li>
			<li>Pretty row 42</li>
			<li>Pretty row 43</li>
			<li>Pretty row 44</li>
			<li>Pretty row 45</li>
			<li>Pretty row 46</li>
			<li>Pretty row 47</li>
			<li>Pretty row 48</li>
			<li>Pretty row 49</li>
			<li>Pretty row 50</li>
			</ul>
		        </Iscroll>
		        <div onClick={this.handleClick} style={{position:'absolute',bottom:0}}>
                     scrollby
		        </div>
            </div>
		)
	}
}

export default IscrollTest;