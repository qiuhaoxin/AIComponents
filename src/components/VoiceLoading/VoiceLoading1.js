(function(window,document){
    (function(){
        window.rAF=window.requestAnimationFrame       ||
                   window.webkitRequestAnimationFrame ||
                   window.oRequestAnimationFrame      ||
                   window.MozRequestAnimationFrame    ||
                   window.MsRequestAnimationFrame;
        window.stopRAF=window.cancelAnimationFrame; 
    })()
    function VoiceLoading(el,options){
       this.container=typeof el =='string' ? document.querySelector(el) : el;
       var w=this.container.clientWidth;
       console.log("container is "+this.container+" and w is "+w);
       w=375;
       this.options={
           width:w,
           height:200,
           circle:{
           	   r:50,
           	   y:200,
           	   lineWidth:12,
           },
       };
       for(var key in options){
       	  this.options[key]=options[key];
       }
       this.initCanvas();

       this.drawGradientCircle();
       //this.drawFrameCircle()
       // this.drawLines();
       // this.drawCircles();
       return this;
    }
    VoiceLoading.prototype={
    	clientRect:null,  
    	_events:{},
    	mode:0,//loading 2,listening 1,waiting 0
    	endAngle:0,
        initCanvas:function(){
        	this.canvas=document.createElement('canvas');
        	this.canvas.width=this.options.width * 2;
        	this.canvas.height=this.options.height * 2;

          this.options.circle.x=this.options.width;
        	this.canvas.style.width=this.options.width + "px";
        	this.canvas.style.height=this.options.height + "px";
          this.canvasCtx=this.canvas.getContext('2d');
        	this.container.appendChild(this.canvas);
          this.clientRect=this.canvas.getBoundingClientRect();
        	this.initEvent();
        },
        initEvent:function(){
            this.canvas.addEventListener('touchstart',this,false);
            this.canvas.addEventListener('touchmove',this,false);
            this.canvas.addEventListener('touchend',this,false);
        },
        //清除画布
        clearRect:function(x=this.options.width * 2,y=this.options.height * 2){
            this.canvasCtx.clearRect(0,0,x,y);  
        },
        _clear:function(){
              this.canvasCtx.globalCompositeOperation = 'destination-out';
              this.canvasCtx.fillRect(0, 0, this.options.width * 2, this.options.height * 2);
              this.canvasCtx.globalCompositeOperation = 'source-over';
        },
        //画渐变的圆
        drawGradientCircle:function(){
            this.clearRect();
            this.canvasCtx.beginPath();
            this.canvasCtx.lineWidth=this.options.circle.lineWidth;
            let lg=this.canvasCtx.createLinearGradient(0,0,this.options.width * 2,0);
            lg.addColorStop(0,'#4690f3');
            lg.addColorStop(0.6,'#80E1FE');
            this.canvasCtx.strokeStyle=lg;
            this.canvasCtx.arc(this.options.circle.x,this.options.circle.y,this.options.circle.r,Math.PI / 2,Math.PI * 5 / 2,false);
            this.canvasCtx.stroke();
            this.canvasCtx.closePath();
        },
        isInCircle:function(x,y){
            if(this.clientRect){
            	x=x - this.clientRect.left;
            	y=y - this.clientRect.top;
            }
        	const distX=(this.options.circle.x / 2 - x);
        	const distY=(this.options.circle.y / 2 - y);
            const dist=Math.sqrt(distX * distX + distY * distY);
            if(dist <= this.options.circle.r / 2){
            	if(this.mode==0){
            		//waiting状态点击变listening
            		this.mode=1;
                this.beginAnim();
                //this.startAnim();
                this._events['circleClick'] && this._events['circleClick']();
            	}else if(this.mode==1){
                    //listening
                    this.stopAnim();
                    console.log("waacelick is "+this._events['waveClick']);
                    this._events['waveClick'] && this._events['waveClick']();
                    //this.drawFrameCircle();
            	}
            	return;
            }
        },
        drawFrameCircle:function(){
	       	this.endAngle+=Math.PI / 40 * 1;
	       	if(this.endAngle > Math.PI * 2){
	       	  this.endAngle=0;
	       	}
	       	//this.clearRect();
          this._clear();
	        this.drawNormalCircle();
	        this.canvasCtx.beginPath();
	        this.canvasCtx.lineWidth=this.options.circle.lineWidth;
	        let lg=this.canvasCtx.createLinearGradient(0,0,400,0);
	        lg.addColorStop(0,'#4690f3');
	        lg.addColorStop(1,'#80E1FE')

	        this.canvasCtx.strokeStyle=lg;
	        this.canvasCtx.arc(this.options.circle.x,this.options.circle.y,this.options.circle.r,Math.PI / 2,this.endAngle,false);
	        this.canvasCtx.stroke();
	        this.canvasCtx.closePath();
	        this.circleFrameId=window.rAF(this.drawFrameCircle.bind(this));
        },
        drawNormalCircle:function(){
	        this.canvasCtx.beginPath();
	        this.canvasCtx.strokeStyle='#eee';
	        this.canvasCtx.lineWidth=this.options.circle.lineWidth;
	        this.canvasCtx.arc(this.options.circle.x,this.options.circle.y,this.options.circle.r,0,Math.PI * 2,false);
	        this.canvasCtx.stroke();
	        this.canvasCtx.closePath();
        },
        drawCircle:function(options){
	          this.canvasCtx.beginPath();
	       	  //this.canvasCtx.fillStyle=options.style.fill;
	       	  if(options.style && options.style.fill){
	       	  	this.canvasCtx.fillStyle=options.style.fill;
	       	  }else{
	       	  	this.canvasCtx.strokeStyle=options.style.stroke;
	       	  }
	       	  if(options.style && options.style.lineWidth)
	       	  	  this.canvasCtx.lineWidth=options.style.lineWidth;
	          this.canvasCtx.arc(options.x,options.y,options.r,options.startAngle,options.endAngle,options.aniti ? options.aniti : false); //(options.x,options.y,options.r,options.startAngle,options.endAngle,options.aniti);
	          this.canvasCtx.closePath();
	          if(options.style && options.style.fill){
	             this.canvasCtx.fill();
	          }else{
	          	 this.canvasCtx.stroke();
	          }
        },
        drawCircles:function(){
       	    var _this=this;
            var arr=this.options.circleArr;
            arr.forEach(function(item){
               _this.drawCircle(item);
            })
        },
        drawColumn:function(options){
	        this.drawLine(options);

	        var circleOptions={
	          	x:options.x,
	          	y:0,
	          	r:options.width / 2,
	          	startAngle:0,
	          	endAngle:Math.PI,
	          	aniti:false,
	          	style:{
	          		fill:options.style.fill,
	          	}
	        }
	        circleOptions.y=options.y - options.height / 2;
	        circleOptions.aniti=true;
	        this.drawCircle(circleOptions);

	        circleOptions.y=options.y + options.height / 2;
	        circleOptions.aniti=false;
	        this.drawCircle(circleOptions);
        },
        drawRect:function(options){
       	    this.canvasCtx.fillStyle=options.style.fill;
       	    this.canvasCtx.fillRect(options.x,options.y,options.width,options.height);  
        },
        drawLine:function(options){
	       	this.canvasCtx.beginPath();
	        this.canvasCtx.strokeStyle=options.style.fill;
	        this.canvasCtx.lineWidth=options.width;
	        this.canvasCtx.moveTo(options.x,options.y);
	        this.canvasCtx.lineTo(options.x,options.y + options.height / 2);
	        this.canvasCtx.closePath();
	        this.canvasCtx.stroke();

	        this.canvasCtx.beginPath();
	        this.canvasCtx.strokeStyle=options.style.fill;
	        this.canvasCtx.lineWidth=options.width;
	        this.canvasCtx.moveTo(options.x,options.y);
	        this.canvasCtx.lineTo(options.x,options.y - options.height / 2);
	        this.canvasCtx.closePath();
	        this.canvasCtx.stroke();
        },
        drawLines:function(){
	       	var _this=this;
	        var arr=this.options.lineArr;
	        arr.forEach(function(item){
	            _this.drawColumn(item); 
	        })
        },
        startAnim:function(randomH){
       	   	  //this.clearRect();
              this._clear();
              this.options.lineArr.forEach(function(item){
                 item.height=item.fixHeight * randomH * item.weight;
              })
              this.drawLines();
              this.drawCircles();
       },
       beginAnim:function(){
       	   var _this=this;
           this.clearRect();
       	   this.intervalId=setInterval(function(){
       	   	   var randomH=Math.random() * 0.8 + 0.8;
       	   	   window.rAF(_this.startAnim.bind(_this,randomH));
       	   },200)
       },
       showLoading:function(){
          this.stopAnim();
       	  this.drawFrameCircle();
       	  this.mode=2;
       },
       showWaiting:function(){
          this.stopAnim();
          this.mode=0;
          this.stopCircleFrame();
          this.drawGradientCircle();
       },
       stopAnim:function(){
            clearInterval(this.intervalId);
            this.intervalId=0;
       	  
       },
       stopCircleFrame:function(){
           window.stopRAF(this.circleFrameId);
       },
        on:function(eventName,fn){
            this._events[eventName]=fn;
        },
        off:function(eventName,fn){
            delete this._events[eventName];
        },
        handleEvent:function(e){
            switch(e.type){
            	case 'touchstart':
                   this._start(e);
            	break;
            	case 'touchmove':
                   this._move(e);
            	break;
            	case 'touchend':
                   this._end(e);
            	break;
            }
        },

        _start:function(e){
            const point=e.touches ? e.touches[0] : e;
            this.startX=point.pageX;
            this.startY=point.pageY;
        },
        _move:function(e){

        },
        _end:function(e){
            const point=e.changedTouches ? e.changedTouches[0] : e;
            const pageX=point.pageX;
            const pageY=point.pageY;
            const distanceX=pageX - this.startX;
            const distanceY=pageY - this.startY;
            this.isInCircle(pageX,pageY);
        }
    }

    if(typeof module!='undefined' && module.exports){
        module.exports=VoiceLoading;
    }else if(typeof define=='function' && define.amd){
    	define(function(){return VoiceLoading;})
    }else{
    	window.VoiceLoading=VoiceLoading;
    }
})(window,document)