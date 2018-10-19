(function(window,document){
    function Circle (el,options){
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
       this._draw();
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
          const frequency=Math.PI * 2 / 50;
          this.options.startAngle+=frequency;
          if(this.options.startAngle > this.options.endAngle)return;
          this.ctx.clearRect(0,0,this.wrapperWidth,this.wrapperHeight);
          this.ctx.beginPath();
          this.ctx.moveTo(this.wrapperWidth / 2,this.wrapperHeight / 2);
          this.ctx.arc(this.wrapperWidth / 2,this.wrapperHeight / 2,this.options.radius / 2,this.options.startAngle,this.options.endAngle,false);
          this.ctx.closePath();
          this.ctx.fillStyle="#000";
          this.ctx.fill();
          window.rAF(this.animate.bind(this));
        }
    }

    if(typeof module!='undefined' && module.exports){
    	console.log("module");
    	module.exports=Circle;
    }else if(typeof define=='function' && define.amd){
    	console.log("define");
        define(function(){return Circle;});
    }else{
    	console.log("window");
    	window.Circle=Circle;
    }

})(window,document);