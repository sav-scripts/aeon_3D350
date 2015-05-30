"use strict";

(function(){

    window.ContentHandler = ContentHandler;

    function ContentHandler(_dom)
    {
        var _p = ContentHandler.prototype = this;

        var _registedTrigger = {};



        $(_dom).scroll(onScroll);

        function onScroll()
        {
            for(var selector in _registedTrigger)
            {
                for(var i=0;i<_registedTrigger[selector].length;i++)
                {
                    var obj = _registedTrigger[selector][i];
                    var top = $(obj.container).position().top;

                    var minusY = obj.minusY, plusY = obj.plusY;

                    if(minusY == "contentHeight")
                    {
                        minusY = (obj.isFullSize)? -_domHeight: -obj.contentHeight;
                    }

                    var a = (minusY == null || top >= minusY);
                    var b = (plusY == null || top <= plusY);

                    if(a && b)
                    {
                        if(!obj.insideTriggered)
                        {
                            obj.insideTriggered = true;
                            if(!obj.isOneTime) obj.outsideTriggered = false;
                            if(obj.insideFunc) obj.insideFunc.apply();
                        }
                    }
                    else
                    {
                        if(!obj.outsideTriggered)
                        {
                            obj.outsideTriggered = true;
                            if(!obj.isOneTime) obj.insideTriggered = false;
                            if(obj.outsideFunc) obj.outsideFunc.apply();
                        }

                    }
                }

            }
        }

        _p.toContainer = function(containerId, cb)
        {
            for(var i=0;i<_containers.length;i++)
            {
                var container = _containers[i];
                if(container.id == containerId)
                {

                    var offsetY = 0;

                    if(container.getAttribute("offset-y"))
                    {
                        offsetY = parseInt(container.getAttribute("offset-y"));
                    }

                    var targetY = $(container).position().top + _dom.scrollTop + offsetY;
                    var d = Math.abs(targetY - _dom.scrollTop);
                    var duration = d/3000;
                    //console.log("duration = " + duration);

                    TweenMax.to(_dom,duration, {scrollTop:targetY, onComplete:cb});

                    break;
                }
            }

            //cb.apply();
        };

        _p.resetTriggers = function()
        {
            for(var key in _registedTrigger)
            {
                for(var i=0;i<_registedTrigger[key].length;i++)
                {
                    var obj = _registedTrigger[key][i];
                    obj.insideTriggered = false;
                    obj.outsideTriggered = true;
                }
            }
        };

        _p.registTrigger = function(selector, container, insideFunc, ousideFunc, isOneTime, minusY, plusY)
        {
            //var container = $(_dom).find(selector)[0];

            //if(minusY == "contentHeight") minusY = -$(container).height();

            //console.log("minusY = " + minusY);

            if(_registedTrigger[selector] == null) _registedTrigger[selector] = [];


            _registedTrigger[selector].push(
                {
                    container:container,
                    insideFunc:insideFunc,
                    outsideFunc:ousideFunc,
                    isOneTime:isOneTime,
                    insideTriggered:false,
                    outsideTriggered:true,
                    minusY:minusY,
                    plusY:plusY,
                    isFullSize:($(container).attr("full-size") == 1),
                    contentHeight:$(container).height()
                });
        };
    }
}());