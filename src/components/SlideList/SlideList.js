(function(window,document){
    
    function SlideList(container,options){
    	console.log("container is "+container);
        this.container=typeof container == 'string' ? document.querySelector(container) : container;
        console.log("options is "+JSON.stringify(options));
        this.options={};
        for(let key in options){
        	this.options[key]=options[key];
        }
        this.prefixCls="ai-sl";
        this.init();
    }
    SlideList.prototype={
    	sourceTarget:null,
    	distTarget:null,
        direction:0,
        curPageIdx:0,
    	init:function(){
    	   const _this=this;
    	   if(this.options.data && this.options.data.length==0)return;
           this.ULWrapper=document.createElement('UI');
           this.ULWrapper.className=this.prefixCls+"-inner";
           this.options.data.forEach(function(item,index){
                
               _this['list-'+index]=document.createElement('LI');
               if(index==_this.curPageIdx)_this['list-'+index].style['transform']="translate3d(0,0,0)";
               else _this['list-'+index].style['transform']="translate3d("+315+"px,0,0)";
               
               _this.createEachPageItem(item,_this['list-'+index]);
               _this.ULWrapper.appendChild(_this['list-'+index]);
               _this._bind(_this['list-'+index],'touchstart',_this);
               _this._bind(_this['list-'+index],'touchmove',_this);
               _this._bind(_this['list-'+index],'touchend',_this);
           })
           this.container.appendChild(this.ULWrapper);
    	},
    	createEachPageItem:function(item,container){
    		const _this=this;
           this.innerWrapper=document.createElement('UL');
           item.value.forEach(function(itemData){
           	  _this.innerLI=document.createElement('LI');
           	  console.log("itemData is "+JSON.stringify(itemData));
           	  _this.innerLI.innerHTML=itemData.value;
           	  _this.innerWrapper.appendChild(_this.innerLI);

           })
           container.appendChild(this.innerWrapper);
    	},
    	_start:function(e){
           const point=e.touches ? e.touches[0] : e;
           this.startX=point.pageX;
           this.startY=point.pageY;
    	},
    	_move:function(e){
           const point=e.touches ? e.touches[0] : e;
           const pageX=point.pageX;
           const pageY=point.pageY;
           const distanceX=pageX - this.startX;
           const distanceY=pageY - this.startY;
           if(Math.abs(distanceX) > Math.abs(distanceY) + 40){
		        const direction=distanceX > 0 ? 1 : -1;
		        if(this.direction==0 || this.direction!=direction){
		        	this.getTarget();
		        }
		       	this.transform(distanceX);
           }
    	},
    	_end:function(e){

    	},
    	getTarget:function(){
			const curPageIdx=this.curPageIdx;
			if(this.distTargetX==0){
				this.distTargetX=-315 * this.direction;
			}
	        if(this.direction==-1){
	        	//左滑
	        	if(this.curPageIdx==this.options.data.length - 1){
	        		// return {
	        		//     sourceTarget:this[`list-${curPageIdx}`],
	        		//     distTarget:null,
	        		// }
	        		this.sourceTarget=this['list-'+curPageIdx];
	        		this.distTarget=null;
	        	}
	        	// return {
	        	// 	sourceTarget:this[`list-${curPageIdx}`],
	        	// 	distTarget:this[`list-${curPageIdx + 1}`],
	        	// }
	        	this.sourceTarget=this['list-'+curPageIdx];
	        	this.distTarget=this[`list-${curPageIdx + 1}`];
	        }else{
	        	//右滑
	        	if(this.curPageIdx==0){
	        		// return {
	        		// 	sourceTarget:this[`list-${curPageIdx}`],
	        		// 	distTarget:null,
	        		// }
	        		this.sourceTarget=this['list-'+curPageIdx];
	        	    this.distTarget=null;
	        	}
	        	// return {
	        	// 	sourceTarget:this[`list-${curPageIdx}`],
	        	// 	distTarget:this[`list-${curPageIdx - 1}`],
	        	// }\
	        	this.sourceTarget=this['list-'+curPageIdx];
	        	this.distTarget=this[`list-${curPageIdx - 1}`];
	        }
			
	    },
        transform:function(x){
	        if(this.sourceTarget){
	        	this.sourceTarget.style['transform']=`translate3d(${x}px,0,0)`;
	        }
	        console.log("distTarget is "+this.distTarget);
	        if(this.distTarget){
	        	const shouldTranslateX=this.distTargetX +x;
	        	this.distTarget.style['transform']=`translate3d(${shouldTranslateX}px,0,0)`;
	        }
	    },
    	_bind:function(container,event,cb,bubble){    	
    	   if(!container)return;
           container.addEventListener(event,cb,!!bubble);
    	},
    	_unbind:function(container,event,cb,bubble){
           if(!container)return;
           container.removeEventListener(event,cb,!!bubble);
    	},
    	handleEvent:function(e){
    		const type=e.type;
    		switch(type){
    			case 'touchstart':
    			   console.log("start");
                   this._start(e);
    			break;
    			case 'touchmove':
                   this._move(e);
    			break;
    			case 'touchend':

    			break;
    			case 'transitionEnd':

    			break;
    		}
    	}


    }
    if(typeof module!='undefined' && module.exports){
    	module.exports=SlideList;
    }else if(typeof define!='function' && define.amd){
        define(function(){return SlideList;})
    }else{
        window.SlideList=SlideList;
    }
})(window,document)