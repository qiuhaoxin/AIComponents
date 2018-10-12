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
       me.getTime=Date.now() || function(){return new Date().getTime()};
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
                top=-e..offsetTop;
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

      }
      for(var i in options){
      	 this.options[i]=options[i];
      }

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
       destory:function(){

       },
       handleEvent:function(e){
          var type=e.type;
          switch(type){
          	 case 'touchstart':

          	 break;
          	 case 'touchmove':

          	 break;
          	 case 'touchend':

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
