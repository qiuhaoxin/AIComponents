import React,{Component} from 'react';
import PropTypes from 'prop-types';

class SuperComponent extends Component{
	constructor(props){
       super(props);
       this.move=false;
	}
	handleTouchStart=(e)=>{
       const point=e.touches ? e.touches[0] : e;
       this.startX=point.pageX;
       this.startY=point.pageY;
       this.move=false;
       this.startTime=e.tiemstamp || Date.now();
	}
	handleTouchMove=(e)=>{
       //move 
       const point=e.touches ? e.touches[0] : e;
       const pageX=point.pageX,
             pageY=point.pageY,
             distanceX=pageX - this.startX,
             distanceY=pageY - this.startY;
       if(Math.abs(distanceX) < 4 && Math.abs(distanceY) < 4){
          this.move=false;
          return;
       }else{
          this.move=true;
       }

	}

	handleTouchEnd=(e,callback)=>{
       const point = e.changedTouches ? e.changedTouches[0] : e;
       const endPageX=point.pageX,
             endPageY=point.pageY;
       const distanceX=endPageX - this.startX,
             distanceY=endPageY - this.startY;
       if(!this.move){
       	  callback && callback();
       }      
	}
	render(){
		return (
           <div className={`super-class`}>

           </div>
		)
	}
}

export default SuperComponent;