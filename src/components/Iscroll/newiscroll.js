(function(window,doc,Math){
   var rAF=window.requestAnimationFrame ||
           window.webkitRequestAnimationFrame ||
           window.oRequestAnimationFrame ||
           window.msRequestAnimationFrame ||
           window.mozRequestAnimationFrmae ||
           function(callback){setTimeout(callback,1000/60);};

   var utils=(function(){
       var me={};
       var _elementStyle=doc.createElement('div').style;
       //获取浏览器前缀
       var _vendor=(function(){
           var vendors=['t','webkitT','MozT','msT','OT'],
               transform,
               l=vendors.length;
            for(var i=0;i<l;i++){
            	transform=vendors[i]+'ransform';
            	if(transform in _elementStyle){return vendors[i].substr(0,vendors[i].length - 1)}
            }
            return false;
       })();
       function _prefixStyle(style){
       	  if(_vendor===false)return false;
          if(_vendor==='')return style;
          return _vendor + style.chatAt(0).toUpperCase() + style.substr(1);
       }
       me.getTime=Date.now || function(){return new Date().getTime()};
       me.extend=function(target,obj){
       	  for(var i in obj){
       	  	 target[i]=obj[i];
       	  }
       }
       me.addEvent=function(el,type,fn,capture){
           el.addEventListener(type,fn,!!capture);
       }
       me.removeEvent=function(el,type,fn,capture){
           el.removeEventListener(type,fn,!!capture);
       }
       me.momentum = function (current, start, time, lowerMargin, wrapperSize, deceleration) {
			var distance = current - start,
				speed = Math.abs(distance) / time,
				destination,
				duration;

			deceleration = deceleration === undefined ? 0.0006 : deceleration;

			destination = current + ( speed * speed ) / ( 2 * deceleration ) * ( distance < 0 ? -1 : 1 );
			duration = speed / deceleration;

			if ( destination < lowerMargin ) {
				destination = wrapperSize ? lowerMargin - ( wrapperSize / 2.5 * ( speed / 8 ) ) : lowerMargin;
				distance = Math.abs(destination - current);
				duration = distance / speed;
			} else if ( destination > 0 ) {
				destination = wrapperSize ? wrapperSize / 2.5 * ( speed / 8 ) : 0;
				distance = Math.abs(current) + destination;
				duration = distance / speed;
			}

			return {
				destination: Math.round(destination),
				duration: duration
			};
	   };

	   var _transform=_prefixStyle('transform');
	   me.extend(me,{
	   	  hasTransform:_transform!==false,
	   	  hasTouch:'ontouchstart' in window,
	   	  hasPerspective:_prefixStyle('perspective') in _elementStyle,
        hasPointer:!!(window.PointerEvent || window.MSPointerEvent),
	   	  hasTransition:_prefixStyle('transition') in _elementStyle,
	   })


	 /*
		This should find all Android browsers lower than build 535.19 (both stock browser and webview)
		- galaxy S2 is ok
	    - 2.3.6 : `AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1`
	    - 4.0.4 : `AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30`
	   - galaxy S3 is badAndroid (stock brower, webview)
	     `AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30`
	   - galaxy S4 is badAndroid (stock brower, webview)
	     `AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30`
	   - galaxy S5 is OK
	     `AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.36 (Chrome/)`
	   - galaxy S6 is OK
	     `AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.36 (Chrome/)`
	  */
		me.isBadAndroid = (function() {
			var appVersion = window.navigator.appVersion;
			// Android browser is not a chrome browser.
			if (/Android/.test(appVersion) && !(/Chrome\/\d/.test(appVersion))) {
				var safariVersion = appVersion.match(/Safari\/(\d+.\d)/);
				if(safariVersion && typeof safariVersion === "object" && safariVersion.length >= 2) {
					return parseFloat(safariVersion[1]) < 535.19;
				} else {
					return true;
				}
			} else {
				return false;
			}
		})();

		me.extend(me.style={},{
		   transform:_transform,
		   transitionTimingFunction:_prefixStyle('transitionTimingFunction'),
		   transitionDuration:_prefixStyle('transitionDuration'),
		   transitionDelay:_prefixStyle('transitionDelay'),
		   transformOrigin:_prefixStyle('transformOrigin'),
		   touchAction:_prefixStyle('touchAction'),
		})
		me.hasClass=function(target,className){
           var reg=new RegExp("(^|\\s)"+className+"($|\\s)");
           return reg.test(target.className);
		}
		me.addClass=function(target,className){
           if(me.hasClass(target,className)){
           	  return;
           }

           var oldClass=target.className.split(' ');
           oldClass.push(className);
           target.className=oldClass.join(' ');
		}
		me.removeClass=function(target,className){
           if(!me.hasClass(target,className)){
           	 return;
           }
           var reg=new RegExp('(^|\\s)'+className+'($|\\s)');
           reg.replace(target.className,'');
		}
		me.offset=function(el){
            var left=-el.offsetLeft,
                top=-e.offsetTop;
            while(el=el.offsetParent){
                left-=el.offsetLeft;
                top-=el.offsetTop;  
            }
            return {
            	left:left,
            	top:top,
            }
		}
		me.extend(me.eventType={},{
            touchstart:1,
            touchmove:1,
            touchend:1
		})
		me.extend(me.ease = {}, {
			quadratic: {
				style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
				fn: function (k) {
					return k * ( 2 - k );
				}
			},
			circular: {
				style: 'cubic-bezier(0.1, 0.57, 0.1, 1)',	// Not properly "circular" but this looks better, it should be (0.075, 0.82, 0.165, 1)
				fn: function (k) {
					return Math.sqrt( 1 - ( --k * k ) );
				}
			},
			back: {
				style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
				fn: function (k) {
					var b = 4;
					return ( k = k - 1 ) * k * ( ( b + 1 ) * k + b ) + 1;
				}
			},
			bounce: {
				style: '',
				fn: function (k) {
					if ( ( k /= 1 ) < ( 1 / 2.75 ) ) {
						return 7.5625 * k * k;
					} else if ( k < ( 2 / 2.75 ) ) {
						return 7.5625 * ( k -= ( 1.5 / 2.75 ) ) * k + 0.75;
					} else if ( k < ( 2.5 / 2.75 ) ) {
						return 7.5625 * ( k -= ( 2.25 / 2.75 ) ) * k + 0.9375;
					} else {
						return 7.5625 * ( k -= ( 2.625 / 2.75 ) ) * k + 0.984375;
					}
				}
			},
			elastic: {
				style: '',
				fn: function (k) {
					var f = 0.22,
						e = 0.4;

					if ( k === 0 ) { return 0; }
					if ( k == 1 ) { return 1; }

					return ( e * Math.pow( 2, - 10 * k ) * Math.sin( ( k - f / 4 ) * ( 2 * Math.PI ) / f ) + 1 );
				}
			}
	    });

	    me.getRect=function(el){
            if(el instanceof SVGElement){
                var rect=el.getBoundingClientRect();
                return {
                	left:rect.left,
                	top:rect.top,
                	width:rect.width,
                	height:rect.height,
                }
            }else{
                return {
                	left:el.offsetLeft,
                	top:el.offsetTop,
                	width:el.offsetWidth,
                	height:el.offsetHeight,
                }
            }
	    }

       return me;
   })();
   function IScroll(el,options){
      this.wrapper=typeof el==='string' ? doc.querySelector(el) : el;
      this.scroller=this.wrapper.children[0];
      this.scrollerStyle=this.scroller.style;

      this.options={
          disablePointer:!utils.hasPointer,
      	  disableTouch:!utils.hasTouch,
      	  startX:0,
      	  startY:0,
      	  scrollY:true,
      	  directionLockThreshold:5,
      	  momentum:true,
      	  bounce:true,
      	  bounceTime:600,
      	  bounceEasing:'',
      	  preventDefault:true,

      	  useTransition:true,
      	  useTransform:true,
          freeScroll

      }
      for(var i in options){
      	 this.options[i]=options[i];
      }

      this.options.freeScroll=this.options.freeScroll;

      this.translateZ = this.options.HWCompositing && utils.hasPerspective ? ' translateZ(0)' : '';

      this.options.useTransition = utils.hasTransition && this.options.useTransition;
      this.options.useTransform = utils.hasTransform && this.options.useTransform;

      this.options.eventPassthrough = this.options.eventPassthrough === true ? 'vertical' : this.options.eventPassthrough;
      this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault;

      // If you want eventPassthrough I have to lock one of the axes
      this.options.scrollY = this.options.eventPassthrough == 'vertical' ? false : this.options.scrollY;
      this.options.scrollX = this.options.eventPassthrough == 'horizontal' ? false : this.options.scrollX;

      this.options.resizePolling=this.options.resizePolling==undefined ? 60 : this.options.resizePolling;

      this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold;

      this.options.bounceEasing = typeof this.options.bounceEasing == 'string' ? utils.ease[this.options.bounceEasing] || utils.ease.circular : this.options.bounceEasing;

      if(!this.options.useTransform && !this.options.useTransition){
         if(!/(relative|absolute)/i.test(this.scrollerStyle)){
            this.scrollerStyle['position']="relative";
         }
      }
      this.x=0;
      this.y=0;
      this.directionX=0;
      this.directionY=0;
      this._events={};

      this._init();
      this.refresh();
      this.enable();

      this.scrollTo(this.options.startX,this.options.startY);
   }
   IScroll.prototype={
       _init:function(){
           this._initEvents();
       },
       _initEvents:function(remove){
           var eventType=remove ? utils.removeEvent : utils.addEvent,
               target=this.options.bindToWrapper ? this.wrapper : window;

            eventType(window,'orientationchange',this);
            eventType(window,'resize',this);

            if(utils.hasTouch && !this.options.disableTouch){
            	eventType(this.wrapper,'touchstart',this);
            	eventType(target,'touchmove',this);
            	eventType(target,'touchcancel',this);
            	eventType(target,'touchend',this);
            }
            eventType(this.scroller,'transitionend',this);
            eventType(this.scroller,'webkitTransitionEnd',this);
            eventType(this.scroller,'oTransitionEnd',this);
            eventType(this.scroller,'MSTransitionEnd',this);
       },
       getComputedPosition:function(){
           var matrix=window.getComputedStyle(this.scroller,null);
           var x,y;
           if(this.options.useTransform){
           	  matrix=matrix[utils.style.transform].split(')')[0].split(', ');
           	  x=+(matrix[12] || matrix[4]);
           	  y=+(matrix[13] || matrix[5]);
           }else{
           	  x=+matrix.left.replace(/[^-\d.]/g,'');
           	  y=+matrix.top.replace(/[^-\d.]/g,'');
           }
           return {x:x,y:y};
       },
       _animate:function(destX,destY,duration,easingFn){
            let that=this,
                startX=this.x,
                startY=this.y,
                startTime=utils.getTime(),
                destTime=startTime + duration;

                function step(){
                   let now=utils.getTime(),
                       newX,newY,
                       easing;

                        if ( now >= destTime ) {
                          that.isAnimating = false;
                          that._translate(destX, destY);

                          if ( !that.resetPosition(that.options.bounceTime) ) {
                            that._execEvent('scrollEnd');
                          }

                          return;
                        }

                        now = ( now - startTime ) / duration;
                        easing = easingFn(now);
                        newX = ( destX - startX ) * easing + startX;
                        newY = ( destY - startY ) * easing + startY;
                        that._translate(newX, newY);

                        if ( that.isAnimating ) {
                          rAF(step);
                        }
                }
                this.isAnimating=true;
                step();

       },
       destory:function(){

       },
       on:function(type,fn){
          if(!this._events[type]){
            this._events[type]=[];
          }
          this._events.push(fn);
       },
       off:function(type,fn){
          if(!this._events[type]){
            return;
          }
          const index=this._events[type].indexOf(fn);
          if(index>-1){
            this._events[type].splice(index,1);
          }
       },
       _execEvent:function(type){
          if(!this._events[type]){
            return;
          }
          const l=this._events[type].length;
          if(!l){
            return;
          }
          for(let i=0;i<l;i++){
            this._events[type][i].apply(this,[].slice.call(arguments,1));
          }
       },
       scrollTo:function(x,y,time,easing){
           easing=easing || utils.ease.circular;

           this.isInTransition=this.options.useTransition && time > 0;
           const transitionType=this.options.useTransition && easing.style;
           if(!time || transitionType){
               if(transitionType){
                   this._transitionTimingFunction(easing.type);
                   this._transitionTime(time);
               }
               this._translate(x,y);
           }else{
               this._animate(x,y,time,easing.fn);
           }

       },
       scrollBy:function(x,y,time,easing){
          x+=this.x;
          y+=this.y;
          time=time || 0;
          this.scrollTo(x,y,time,easing);
       },
       _transitionEnd:function(e){
          if(e.target!=this.scroller || !this.isInTransition){
            return;
          }
          this._transitionTime();
          if()
       },
       _start:function(e){
          const pointer=e.touches ? e.touches[0] : e;
          let pos=0;
          this.initiated=utils.eventType[e.type];
          this.moved=false;
          this.distX=0;
          this.distY=0;
          this.directionX=0;
          this.directionY=0;
          this.directionLocked=0;

          this.startTime=utils.getTime();
          if(this.options.useTransition && this.isInTransition){
              this._transitionTime();
              this.isInTransition=false;
              pos=this.getComputedPosition();
              this._translate(Math.round(pos.x),Math.round(pos.y));
              this._execEvent('scrollEnd');
          }else if(!this.options.useTransition && this.isAnimating){
             this.isAnimating=false;
             this._execEvent('scrollEnd');
          }

          this.startX=this.x;
          this.startY=this.y;
          this.absStartX=this.x;
          this.absStartY=this.y;
          this.pointX=pointer.pageX;
          this.pointY=pointer.pageY;

          this._execEvent('beforeScrollStart');
       },
       _move:function(e){
          if(!this.enable || this.eventType[e.type]!=this.initiated){
            return;
          }
          if(this.options.preventDefault){
            e.preventDefault();
          }
          let point=e.touches ? e.touches[0] : e,
              deltaX=point.pageX - this.pointX,
              deltaY=point.pageY - this.pointY,
              newX,newY,timestampe=utils.getTime(),
              absDeltaX,absDeltaY;
          this.pointX=point.pageX;
          this.pointY=point.pageY;

          this.distX+=deltaX;
          this.distY+=deltaY;

          absDeltaX=Math.abs(this.deltaX);
          absDeltaY=Math.abs(this.deltaY);

          if(timestampe - this.endTime > 300 && (this.absDeltaX < 10 && this.absDeltaY < 10)){
            return;
          }

          if(!this.directionLocked && !this.options.freeScroll){
              if(absDeltaX > absDeltaY + this.options.directionLockThreshold){
                  this.directionLocked='h';
              }else if(absDeltaY > absDeltaX + this.options.directionLockThreshold){
                  this.directionLocked='v';
              }else{
                  this.directionLocked='n';
              }
          }

          if(this.directionLocked=='h'){
              if ( this.options.eventPassthrough == 'vertical' ) {
                e.preventDefault();
              } else if ( this.options.eventPassthrough == 'horizontal' ) {
                this.initiated = false;
                return;
              }
              deltaY = 0;
          }else if(this.directionLocked=='v'){
                  if ( this.options.eventPassthrough == 'horizontal' ) {
                    e.preventDefault();
                  } else if ( this.options.eventPassthrough == 'vertical' ) {
                    this.initiated = false;
                    return;
                  }
                  deltaX = 0;
          }
          deltaX=this.hasHorizontalScroll ? deltaX : 0;
          deltaY=this.hasVerticalScroll ? deltaY : 0;

          newX=this.x + deltaX;
          newY=this.y + deltaY;

          if(newX > 0 || newX < this.maxScrollerX){
              newX=this.options.bounce ? this.x + deltaX / 3 : newX > 0 ? newX : this.maxScrollerX;
          }
          if(newY > 0 || newY < this.maxScrollerY){
              newY=this.options.bounce ? this.y + deltaY / 3 : newY > 0 ? newY : this.maxScrollerY;
          }
          this.directionX=deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
          this.directionY=deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;
          if(!this.moved){
             this._execEvent('scollStart');
          }
          


       },
       _end:function(e){

       },
       _transitionEnd(e){

       },
       _transitionTime:function(time){
          if(!utils.options.useTransition){
             return;
          }
          time=time || 0;
          const durationProp=utils.style.transitionDuration;
          if(!durationProp){
             return;
          }
          this.scrollerStyle[durationProp]=time+"ms";
          if(!time && utils.isBadAndroid){
              this.scrollerStyle[durationProp]='0.0001ms';

              const self=this;
              rAF(function(){
                if(self.scrollerStyle[durationProp]==='0.0001ms'){
                    self.scrollerStyle[durationProp]='0ms';
                }
              })
          }
       },
       _transitionTimingFunction:function(easing){
           this.scrollerStyle[utils.style.transitionTimingFunction]=easing;
       },
       _translate:function(x,y){
           if(utils.options.useTransform){
             this.scrollerStyle[utils.options.transform]="translate("+x+"px,"+y+"px)";
           }else{
              x=Math.round(x);
              y=Math.round(y);
              this.scrollerStyle.left=x+"px";
              this.scrollerStyle.top=y+"px";
           }
           this.x=x;
           this.y=y;
       },
       _resize:function(){
           const that=this;
           clearTimeout(this.resizeTimeout);
           this.resizeTimeout=this.setTimeout(function(){
               that.refresh();
           },this.options.resizePolling)
       },
       disable:function(){
         this.enabled=false;
       },
       enable:function(){
         this.enable=true;
       },
       //刷新
       refresh:function(){
           utils.getRect(this.wrapper);

           this.wrapperWidth=this.wrapper.clientWidth;
           this.wrapperHeight=this.wrapper.clientHeight;

           const rect=utils.getRect(this.scroller);
           this.scrollerWidth=rect.width;
           this.scrollerHeight=rect.height;

           this.maxScrollerX=this.wrapperWidth - this.scrollerWidth;
           this.maxScrollerY=this.wrapperHeight - this.scrollerHeight;

           this.hasHorizontalScroll=this.options.scrollX && this.maxScrollerX < 0;
           this.hasVerticalScroll=this.options.scrollY && this.maxScrollerY < 0;

           if(!this.hasHorizontalScroll){
              this.maxScrollerX=0;
              this.scrollerWidth=this.wrapperWidth;
           } 
           if(!this.hasVerticalScroll){
              this.maxScrollerY=0;
              this.scrollerHeight=this.wrapperHeight;
           }
           this.endTime=0;
           this.directionY=0;
           this.directionX=0;


       }
       resetPositin:function(time){

       },
       handleEvent:function(e){
          var type=e.type;
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
          	 case 'orientationchange':

          	 break;
          	 case 'resize':

          	 break;
          	 case 'transitionend':
          	 case 'webkitTransitionEnd':
          	 case 'oTransitionEnd':
          	 case 'MSTransitionEnd':


          	 break;

          }
       }
   }

   if(typeof module!='undefined' && module.exports){
       module.exports=IScroll;
   }else if(typeof define=='function' && define.amd){
   	   define(function(){return IScroll});
   }else{
   	   window.IScroll=IScroll;
   }
})(window,document,Math);
