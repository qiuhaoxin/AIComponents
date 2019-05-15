/**
 * [description]
 * @param  {[type]} window   [description]
 * @param  {[type]} document [description]
 * @return {[type]}          [description]
 * @author  haoxin_qiu
 */
(function(window,document){
    function SlideList(container,options){
        this.container=typeof container == 'string' ? document.querySelector(container) : container;
        this.options={};
        for(let key in options){
        	this.options[key]=options[key];
        }
        this.init();
    }
    SlideList.prototype={
      prefixCls:'ai-sl',
    	sourceTarget:null,
    	distTarget:null,
      direction:0,
      curPageIdx:0,
      distTargetX:0,
      isMove:true,
      events:{},
    	init:function(){
    	   const _this=this;
    	   if(this.options.data && this.options.data.length==0)return;
         this.ULWrapper=document.createElement('UL');
         this.ULWrapper.className=this.prefixCls+"-inner";
         this.options.data.forEach(function(item,index){      
           _this['list-'+index]=document.createElement('LI');
           _this['list-'+index].setAttribute('id',item.id);
           if(index==_this.curPageIdx)_this['list-'+index].style['transform']="translate3d(0,0,0)";
           else _this['list-'+index].style['transform']="translate3d("+315+"px,0,0)";
                
           _this.createEachPageItem(item,_this['list-'+index]);
           _this.ULWrapper.appendChild(_this['list-'+index]);
           _this.bindEvent(_this['list-'+index]);
         })
         this.container.appendChild(this.ULWrapper);
         this.createDecoration();
    	},
      //
      createDecoration:function(){
          const decorateUL=document.createElement('UL');
          decorateUL.className=this.prefixCls+"-decorate";
          for(let i=0,len=this.options.data.length;i<len;i++){
            this['decoration-'+i]=document.createElement('LI');
            if(i==this.curPageIdx){
               this['decoration-'+i].className=this.prefixCls+"-selected";
            }else
               this['decoration-'+i].className=this.prefixCls+"-dec";
            decorateUL.appendChild(this['decoration-'+i]);
          }
          this.container.appendChild(decorateUL);
      },
      changeDecoration:function(){
          for(let i=0,len=this.options.data.length;i<len;i++){
            if(i==this.curPageIdx){
               this['decoration-'+i].className=this.prefixCls+"-selected";
            }else{
              this['decoration-'+i].className=this.prefixCls+"-dec";
            }
          }
      },
      bindEvent:function(container){
          this._bind(container,'touchstart',this);
          this._bind(container,'touchmove',this);
          this._bind(container,'touchend',this);
          this._bind(container,'transitionend',this);
      },
    	createEachPageItem:function(item,container){
    		const _this=this;
           this.innerWrapper=document.createElement('UL');
           this.innerWrapper.className=this.prefixCls+"-page";
           item.value.forEach(function(itemData,index){
           	  _this.innerLI=document.createElement('LI');
           	  _this.innerLI.innerHTML=itemData.value;
              _this.innerLI.setAttribute('id','innerList-'+itemData.id);
           	  _this.innerWrapper.appendChild(_this.innerLI);
              //console.log("index is "+index+" and lenghth is "+item.value.length);
              if(index!=item.value.length - 1){
                  var lineDiv=document.createElement('DIV');
                  lineDiv.className=_this.prefixCls+"-line";
                  _this.innerWrapper.appendChild(lineDiv);
              }


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
                this.direction=direction;
  		        	this.getTarget();
  		        }
  		       	this.transform(distanceX / 3);
              this.isMove=true;
           }

    	},
    	_end:function(e){
          const point = e.changedTouches ? e.changedTouches[0] : e;
          const endPageX=point.pageX;
          const endPageY=point.pageY;
          const CHANGE_DISTANCE=Math.round(315 / 4);
          const distanceX=Math.abs(Math.round(endPageX - this.startX));
          const distanceY=Math.abs(Math.round(endPageY - this.startY));
          if((this.curPageIdx==0 && this.direction==1) || (this.curPageIdx==this.options.data.length - 1 && this.direction==-1)){
             this.setTransition('transform .5s');
             this.transform(0);
          }else if(distanceX > CHANGE_DISTANCE){
            this.setTransition('transform .5s');
            this.transform(this.direction * 315);
            this.curPageIdx+=this.direction * -1;
            this.changeDecoration();
          }else{
            this.setTransition('transform .5s');
            this.transform(0);
          }
          if(!this.isMove || (Math.abs(distanceX) <6 && Math.abs(distanceY) < 6)){
             if('click' in this.events && this.events.click){
                let pageIndex=0;
                const target=e.target;
                let parent=target && target.parentNode;
                if(parent && parent.nodeName!='LI'){
                   parent=parent && parent.parentNode;
                }
                if(parent.nodeName=='LI' && parent.getAttribute('id')){
                   pageIndex=parent.getAttribute('id');
                }
                let id=target.getAttribute('id');
                id=id && id.split('-')[1];
                this.events.click.call(this,target.innerText,id);
             }
          }
          this.reset();
    	},
      setTransition:function(transitionStr){
         if(this.sourceTarget){
             this.sourceTarget.style['transition']=transitionStr;
         }
         if(this.distTarget){
             this.distTarget.style['transition']=transitionStr;
         }
      },
      reset:function(){
          this.distTargetX=0;
          this.direction=0;
          this.sourceTarget=null;
          this.distTarget=null;
      },
    	getTarget:function(){
    			const curPageIdx=this.curPageIdx;
    			if(this.distTargetX==0){
    				this.distTargetX=-315 * this.direction;
    			}
	        if(this.direction==-1){
	        	//左滑
	        	if(this.curPageIdx==this.options.data.length - 1){
	        		this.distTarget=null;
	        	}else{
               this.distTarget=this[`list-${curPageIdx + 1}`];
            }
	        	this.sourceTarget=this['list-'+curPageIdx];
	        }else{
	        	//右滑
	        	if(this.curPageIdx==0){
	        	  this.distTarget=null;
	        	}else{
              this.distTarget=this[`list-${curPageIdx - 1}`];
            }
	        	this.sourceTarget=this['list-'+curPageIdx];
	        }
	    },
      transform:function(x){
	        if(this.sourceTarget){
	        	this.sourceTarget.style['transform']=`translate3d(${x}px,0,0)`;
	        }
	        if(this.distTarget){
	        	const shouldTranslateX=this.distTargetX +x;
	        	this.distTarget.style['transform']=`translate3d(${shouldTranslateX}px,0,0)`;
	        }
	    },
      _transitionEnd:function(){

          for(let i=0,len=this.options.data.length;i<len;i++){
             this['list-'+i].style['transition']='';
          }
          this.events['pageChange'] && this.events['pageChange'](this.curPageIdx);
      },
      //对外开放的接口   绑定事件
      on:function(eventName,eventFn){
          console.log("eventNAme is "+eventName);
          this.events[eventName]=eventFn;
      },
      off:function(eventName,eventFn){
          if(eventName in this.events){
              this.events[eventName]=null;
              delete this.events[eventName];
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
              this._start(e);
    			break;
    			case 'touchmove':
              this._move(e);
    			break;
    			case 'touchend':
              this._end(e);
    			break;
    			case 'transitionend':
              this._transitionEnd(e);
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