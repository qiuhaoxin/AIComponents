(function(window,document){
    function Circle (el,options){
       const _this=this;
       this.wrapper=typeof el ==='string' ? document.querySelector(el) : el;
       let wrapperHeight=0,
           wrapperWidth=0;
       if(this.wrapper){
           this.wrapperWidth=window.getComputedStyle(this.wrapper).width.replace('px','');
           this.wrapperHeight=this.wrapperWidth;
       }
       this.options={};
       for(var key in options){
       	  this.options[key]=options[key];
       }
       this._init();
       //this._draw();
       setTimeout(function(){
          _this.reDraw();
       },180);
       this.stopAnimation=false;
       
       //this.reDraw();
    }
    Circle.prototype={
        _init:function(){
        	this.canvas=document.createElement('canvas');
  		    this.canvas.width=this.wrapperWidth;
  		    this.canvas.height=this.wrapperHeight;
  		    this.ctx=this.canvas.getContext('2d');
  		    this.wrapper.appendChild(this.canvas);

          window.rAF=window.requestAnimationFrame       ||
                     window.webkitRequestAnimationFrame ||
                     window.oRequestAnimationFrame      ||
                     window.MozRequestAnimationFrame    ||
                     window.MsRequestAnimationFrame;
          window.stopRAF=window.cancelAnimationFrame;        
        },
        _draw:function(startAngle,endAngle){
        	this.ctx.clearRect(0,0,this.wrapperWidth,this.wrapperHeight);
  		    this.ctx.beginPath();
  		    this.ctx.moveTo(this.wrapperWidth/2,this.wrapperHeight/2);
  		    this.ctx.arc(this.wrapperWidth/2,this.wrapperHeight/2,this.options.radius/2,this.options.startAngle,this.options.endAngle,false);
  		    this.ctx.closePath();
  		    this.ctx.fillStyle="#000";
  		    this.ctx.fill();
        },
        reDraw:function(frequency){
        	const rAF=window.requestAnimationFrame;

        	if(rAF){
                //rAF(this._draw,this.options.startAngle,this.options.endAngle);
                window.rAF(this.animate.bind(this));
        	}else{

        	}

        },
        animate:function(){
          if(this.stopAnimation)return;
          const frequency=Math.PI * 2 / 50;
          this.options.startAngle+=frequency;
          if(this.options.startAngle > this.options.endAngle){
            this.options.endAngle+=Math.PI * 2;
          }
          this.ctx.clearRect(0,0,this.wrapperWidth,this.wrapperHeight);
          this.ctx.beginPath();
          this.ctx.moveTo(this.wrapperWidth / 2,this.wrapperHeight / 2);
          this.ctx.arc(this.wrapperWidth / 2,this.wrapperHeight / 2,this.options.radius / 2,this.options.startAngle,this.options.endAngle,false);
          this.ctx.closePath();
          this.ctx.fillStyle="#000";
          this.ctx.fill();
          this.animationId=window.rAF(this.animate.bind(this));
        },
        stopAnimate:function(){
          //console.log("animationId is "+this.animationId);
          window.stopRAF(this.animationId);
          this.stopAnimation=true;
        }
    }

    if(typeof module!='undefined' && module.exports){
    	module.exports=Circle;
    }else if(typeof define=='function' && define.amd){
        define(function(){return Circle;});
    }else{
    	window.Circle=Circle;
    }

})(window,document);