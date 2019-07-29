/**
 * 对adaptive card进行封装
 */

(function (global, doc) {

    function CardFactory(container, AdaptiveCards, options) {
        this.container = typeof container === 'string' ? doc.getElementById(container) : container;
        this.options = {};
        for (let key in options) {
            this.options[key] = options[key];
        }
        this.initCard(AdaptiveCards);
        this.initWrapper();
        this.setCardData();
        if (this.options.cardData.length > 1) {
            this.bindEvent();
        }
    }
    CardFactory.prototype = {
        constructor: CardFactory,
        prefixCls: 'ai-sl',
        adaptiveCard: null,
        li_wrapper: [],
        sourceTarget: null,
        distTarget: null,
        direction: 0,
        curPageIdx: 0,
        distTargetX: 0,
        isMove: true,
        events: {},
        initCard: function (AdaptiveCards) {
            var _this = this;
            if (!this.adaptiveCard) {
                this.adaptiveCard = new AdaptiveCards.AdaptiveCard();
                if (this.options.hostConfig) {
                    this.adaptiveCard.hostConfig = new AdaptiveCards.HostConfig(this.options.hostConfig)
                }
                if (this.options.onExecuteAction) {
                    this.adaptiveCard.onExecuteAction = function (action) {
                        _this.options.onExecuteAction(action);
                    }
                }
            }
        },
        initWrapper: function () {
            var cardData = this.options.cardData;
            var _this = this;
            if (!cardData) return null;
            var UI_WRAPPER = doc.createElement('UL');
            UI_WRAPPER.className = this.prefixCls + "-page";
            cardData.forEach(function (item, index) {

                _this.li_wrapper[index] = doc.createElement('LI');

                if (index != 0) {
                    _this.li_wrapper[index].style.cssText = ";transform:translate(" + (index * 100) + "%,0)";
                }
                UI_WRAPPER.appendChild(_this.li_wrapper[index]);
            })
            this.container.appendChild(UI_WRAPPER);
            if (this.options.cardData.length > 1) {
                this.createDecoration();
            }

        },
        createDecoration: function () {
            const decorateUL = doc.createElement('UL');
            decorateUL.className = this.prefixCls + "-decorate";
            for (let i = 0, len = this.options.cardData.length; i < len; i++) {
                this['decoration-' + i] = doc.createElement('LI');
                if (i == this.curPageIdx) {
                    this['decoration-' + i].className = this.prefixCls + "-selected";
                } else
                    this['decoration-' + i].className = this.prefixCls + "-dec";
                decorateUL.appendChild(this['decoration-' + i]);
            }
            this.container.appendChild(decorateUL);
        },
        changeDecoration: function () {

            for (let i = 0, len = this.options.cardData.length; i < len; i++) {
                if (i == this.curPageIdx) {
                    this['decoration-' + i].className = this.prefixCls + "-selected";
                } else {
                    this['decoration-' + i].className = this.prefixCls + "-dec";
                }
            }
        },
        setCardData: function () {
            var cardData = this.options.cardData;
            var _this = this;
            cardData.forEach((item, index) => {
                let itemData = null;
                try {
                    itemData = JSON.parse(item);
                } catch (e) {
                    itemData = item;
                }
                _this.adaptiveCard.parse(itemData);
                _this.adaptiveCard.render(_this.li_wrapper[index]);
            })
        },
        bindEvent: function () {
            this._bind(this.container, 'touchstart', this);
            this._bind(this.container, 'touchmove', this);
            this._bind(this.container, 'touchend', this);
            this._bind(this.container, 'transitionend', this);
        },
        handleEvent: function (e) {
            const type = e.type;
            switch (type) {
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
        },
        _bind: function (container, event, cb, bubble) {
            if (!container) return;
            container.addEventListener(event, cb, !!bubble);
        },
        _unbind: function (container, event, cb, bubble) {
            if (!container) return;
            container.removeEventListener(event, cb, !!bubble);
        },
        _start: function (e) {
            //e.preventDefault();
            const point = e.touches ? e.touches[0] : e;
            this.startX = point.pageX;
            this.startY = point.pageY;
        },
        _move: function (e) {
            e.preventDefault();
            const point = e.touches ? e.touches[0] : e;
            const pageX = point.pageX;
            const pageY = point.pageY;
            const distanceX = pageX - this.startX;
            const distanceY = pageY - this.startY;
            if (Math.abs(distanceX) > Math.abs(distanceY) + 40) {
                const direction = distanceX > 0 ? 1 : -1;
                if (this.direction == 0 || this.direction != direction) {
                    this.direction = direction;
                    this.getTarget();
                }
                this.transform(distanceX / 3);
                this.isMove = true;
            } else {
                //return;
            }

        },
        _end: function (e) {
            const point = e.changedTouches ? e.changedTouches[0] : e;
            const endPageX = point.pageX;
            const endPageY = point.pageY;
            const CHANGE_DISTANCE = Math.round(315 / 4);
            const distanceX = Math.abs(Math.round(endPageX - this.startX));
            const distanceY = Math.abs(Math.round(endPageY - this.startY));
            if ((this.curPageIdx == 0 && this.direction == 1) || (this.curPageIdx == this.options.cardData.length - 1 && this.direction == -1)) {
                this.setTransition('transform .5s');
                this.transform(0);
            } else if (distanceX > CHANGE_DISTANCE) {
                this.setTransition('transform .5s');
                this.transform(this.direction * 315);
                this.curPageIdx += this.direction * -1;
                if (this.options.cardData.length > 1) {
                    //只有一页不做滑动
                    this.changeDecoration();
                }
            } else {
                this.setTransition('transform .5s');
                this.transform(0);
            }
            if (!this.isMove || (Math.abs(distanceX) < 6 && Math.abs(distanceY) < 6)) {
                if ('click' in this.events && this.events.click) {
                    let pageIndex = 0;
                    const target = e.target;
                    let parent = target && target.parentNode;
                    if (parent && parent.nodeName != 'LI') {
                        parent = parent && parent.parentNode;
                    }
                    if (parent.nodeName == 'LI' && parent.getAttribute('id')) {
                        pageIndex = parent.getAttribute('id');
                    }
                    let id = target.getAttribute('id');
                    id = id && id.split('-')[1];
                    this.events.click.call(this, target.innerText, id);
                }
            }
            this.reset();
        },
        _transitionEnd: function () {

            for (let i = 0, len = this.options.cardData.length; i < len; i++) {
                //this['list-' + i].style['transition'] = '';
                this.li_wrapper[i].style['transition'] = '';
            }
            this.events['pageChange'] && this.events['pageChange'](this.curPageIdx);
        },
        transform: function (x) {
            if (this.sourceTarget) {
                this.sourceTarget.style['transform'] = `translate3d(${x}px,0,0)`;
            }
            if (this.distTarget) {
                const shouldTranslateX = this.distTargetX + x;
                this.distTarget.style['transform'] = `translate3d(${shouldTranslateX}px,0,0)`;
            }
        },
        reset: function () {
            this.distTargetX = 0;
            this.direction = 0;
            this.sourceTarget = null;
            this.distTarget = null;
        },
        setTransition: function (transitionStr) {
            if (this.sourceTarget) {
                this.sourceTarget.style['transition'] = transitionStr;
            }
            if (this.distTarget) {
                this.distTarget.style['transition'] = transitionStr;
            }
        },
        getTarget: function () {
            const curPageIdx = this.curPageIdx;
            if (this.distTargetX == 0) {
                this.distTargetX = -315 * this.direction;
            }
            if (this.direction == -1) {
                //左滑
                if (this.curPageIdx == this.options.cardData.length - 1) {
                    this.distTarget = null;
                } else {
                    //this.distTarget = this[`list-${curPageIdx + 1}`];
                    this.distTarget = this.li_wrapper[`${curPageIdx + 1}`];
                }
                //this.sourceTarget = this['list-' + curPageIdx];
                this.sourceTarget = this.li_wrapper[curPageIdx];
            } else {
                //右滑
                if (this.curPageIdx == 0) {
                    this.distTarget = null;
                } else {
                    //this.distTarget = this[`list-${curPageIdx - 1}`];
                    this.distTarget = this.li_wrapper[`${curPageIdx - 1}`];
                }
                // this.sourceTarget = this['list-' + curPageIdx];
                this.sourceTarget = this.li_wrapper[curPageIdx];
            }
        },
    }


    if (typeof module != undefined && module.exports) {
        module.exports = CardFactory;
    } else if (typeof define != undefined && define.amd) {
        define(function () { return CardFactory });
    } else {
        global.CardFactory = CardFactory;
    }
})(window, document)