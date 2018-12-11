(function(window,document){
    function VoiceLoading(el,options){
       this.container=typeof el=='string' ? document.querySelector(el) : el;
       var w=this.container.clientWidth;

       this.options={
          width:375,
          height:200,
          circle:{

          },
          line:{
            x:200,
            y:200,
            height:20,
          }
       }
       for(var key in options){
          if(options[key]){
            this.options[key]=options[key];
          }
       }
       this.initCanvas();
       this.initImg();
       //this.drawLines();
       this.initActionDiv();
       window.rAF=window.requestAnimationFrame;
       window.stopRAF=window.cancelAnimationFrame;
    }
    VoiceLoading.prototype={
        height:20,
        direction:1,
        distM:true,
        mode:0,
        random:0.2,
        _events:{},
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
        initActionDiv:function(){
            this.actionDiv=document.createElement('div');
            var imgObj=document.createElement('IMG');
            imgObj.src='https://ai.kingdee.com:9992/aidemo/static/Icon/dong.png';
            this.actionDiv.appendChild(imgObj);
            this.actionDiv.className="ai-vl-dong";
            this.actionDiv.style['height']=this.options.height+"px";
            this.actionDiv.style['display']='none';
            this.container.appendChild(this.actionDiv);
        },
        initImg:function(){
            var _this=this;
            this.img=new Image();
            this.img.src='https://ai.kingdee.com:9992/aidemo/static/Icon/loading_sient.png'//'../images/loading_sient.png';https://ai.kingdee.com:9992/aidemo/static/Icon/img_0.png
            this.img.onload=function(e){
               _this.drawImage();
            }
            this.img.onerror=function(){
               console.log("onerror");
            }
        },
        createVoiceData:function(){
           var data=this.options.data.lineArr;
           this.lineArr=[];
           var lineLenght=data.lineArr.length;
        },
        drawHalfLine:function(direction,option){
          this.canvasCtx.beginPath();
          this.canvasCtx.strokeStyle=option.style.fill;
          this.canvasCtx.lineWidth=12;
          this.canvasCtx.moveTo(option.x,option.y);
          this.canvasCtx.lineTo(option.x,option.y + direction * option.height); 
          this.canvasCtx.stroke();
          this.canvasCtx.closePath();
        },
        drawHalfCircle:function(direction,option){
          this.canvasCtx.beginPath();
          this.canvasCtx.fillStyle=option.style.fill;
          this.canvasCtx.arc(option.x,option.y + direction * (option.height - 1),6,0,Math.PI,direction==1 ? false : true);

          this.canvasCtx.fill();
          this.canvasCtx.closePath();
        },
        drawLine:function(options){
           this.drawHalfLine(1,options);
           this.drawHalfLine(-1,options);
           this.drawHalfCircle(1,options);
           this.drawHalfCircle(-1,options);
        },
        drawLines:function(){
          var lineArr=this.options.lineArr;
          for(var i=0,len=lineArr.length;i<len;i++){
             this.drawLine(lineArr[i]);
          }
          this.drawCircles();
        },
        drawCircles:function(){
          var circleArr=this.options.circleArr;
          for(var i=0,len=circleArr.length;i<len;i++){
            circleArr[i].y=this.options.height;
            this.drawCircle(circleArr[i]);
          }
        },
        drawCircle:function(option){
           this.canvasCtx.beginPath();
           this.canvasCtx.fillStyle=option.style.fill;
           this.canvasCtx.arc(option.x,option.y,option.r,option.startAngle,option.endAngle,true);
           this.canvasCtx.fill();
           this.canvasCtx.closePath();
        },
        startVoiceAnim:function(){
            this._clear();
            var lineArr=this.options.lineArr;
            for(var i=0,len=lineArr.length;i<len;i++){
                lineArr[i].y=this.options.height;
                var curHeight=this.random * lineArr[i].fixHeight * lineArr[i].weight;
                var lastHeight=lineArr[i].height;
                if(curHeight > lastHeight){
                    lineArr[i].height=lastHeight + this.options.changeL;
                }else{
                    lineArr[i].height=lastHeight - this.options.changeL;
                }
            }
            this.drawLines();
            this.rAFId=window.rAF(this.startVoiceAnim.bind(this));
        },
        //画图片
        drawImage:function(){
          if(this.img){
            this._clearRect();
            this.canvasCtx.drawImage(this.img,this.options.width - this.img.width / 2,this.options.height - this.img.height / 2);
          }
        },
        _clear:function(){
              this.canvasCtx.globalCompositeOperation = 'destination-out';
              this.canvasCtx.fillRect(0, 0, this.options.width * 2, this.options.height * 2);
              this.canvasCtx.globalCompositeOperation = 'source-over';
        },
        _clearRect:function(){
            this.canvasCtx.clearRect(0,0,this.options.width * 2,this.options.height * 2);
        },
        // startAnim:function(){
        //    this._clear();
        //    this.height=this.height + this.direction * 1.2;
        //    if(this.height  > this.maxHeight && this.distM){
        //       this.direction=-1;
        //       this.distM=false;
        //    }
        //    if(this.height < this.minHeight && !this.distM){
        //       this.direction=1;
        //       this.distM=true;
        //    }
        //    this.drawLine();
        //    window.rAF(this.startAnim.bind(this));
        // },
        setWeight:function(voice){
            var _this=this;
            //setInterval(function(){
              if(voice){
                _this.random=voice * 80;
              }else{
                var random=Math.random();
                 _this.random=(1 + random);
              }
            //},120);
        },
        on:function(eventName,fn){
            this._events[eventName]=fn;
        },
        off:function(eventName,fn){
            delete this._events[eventName];
        },
        stopAnim:function(){
            window.stopRAF(this.rAFId);
        },
        _start:function(e){
           var point=e.touches ? e.touches[0] : e;
           this.startX=point.pageX;
           this.startY=point.pageY;
        },
        _move:function(e){

        },
        _end:function(e){
          var point=e.changedTouches ? e.changedTouches[0] :e;
          var pageX=point.pageX;
          var pageY=point.pageY;
          if(Math.abs(pageX - this.startX) < 4 && Math.abs(pageY - this.startY) < 4){
            //click
            this.isInImage(pageX,pageY);
          }
        },
        isInImage:function(pageX,pageY){
          console.log("pageX is "+pageY+" and clineRect is "+JSON.stringify(this.clientRect));
           pageY-=this.clientRect.top;

           var imgWidth=this.img && this.img.width;
           var imgHeight=this.img && this.img.height;
           var beginX=this.options.width - this.img.width / 2;
           var beginY=this.options.height - this.img.height / 2;
           var endX=this.options.width + this.img.width / 2;
           var endY=this.options.height + this.img.height / 2;

           pageX*=2;
           pageY*=2;
           if(this.mode==0){
             if(pageX < endX && pageX > beginX && pageY < endY && pageY > beginY){
                this.startVoiceAnim();
                this.mode=1; 
                this._events['circleClick'] && this._events['circleClick']();
             }else{
                console.log(" not in circle!");
             }
           }else if(this.mode==1){
              this.stopAnim();
              this._events['waveClick'] && this._events['waveClick']();
           }
        },
        showLoading:function(){
            this.canvas.style['display']='none';
            this.actionDiv.style['display']='inline-flex';
            this.mode=2; 
        },
        showWaiting:function(){
            this.stopAnim();
            this.drawImage();
            this.mode=0;
            this.canvas.style.display='block';
            this.actionDiv.style.display='none';
        },
        handleEvent:function(e){
          switch(e.type){
            case 'touchstart':
                this._start(e);
            break;
            case 'touchemove':
                this._move(e);
            break;
            case 'touchend':
                this._end(e);
            break;
          }
        }

    }
    if(typeof module!='undefined' && module.exports){
      module.exports=VoiceLoading;
    }else if(typeof define == 'function' && define.amd){
      define(function(){return VoiceLoading;})
    }else {
      window.VoiceLoading=VoiceLoading;
    }
})(window,document)