(function(){

    "use strict";

    window.ContentTrigger = ContentTrigger;



    ContentTrigger.align =
    {
        TOP:"top",
        MIDDLE:"middle",
        BOTTOM:"bottom"
    };

    ContentTrigger.mode =
    {
        ON_SWITCH:"onSwitch",
        ALWAYS:"always"
    };

    function ContentTrigger(_cbOnScroll)
    {
        var _p = ContentTrigger.prototype = this;


        var _isiOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );

        _p.defaultCondition = "below";

        var _oldScrollTop = -1;

        var _registedDic = {};

        var _obj = {y:0, targetY:0};


        $(window).on("scroll", onScroll);

        _p.refresh = function()
        {
            onScroll();
        };

        function onScroll()
        {
            //var scrollTop = $(document).scrollTop();
            //var scrollTop = $(this).scrollTop();
            //var scrollTop = _isiOS? -_obj.targetY: window.pageYOffset;
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

            //console.log("event");

            //trace("scrollTop = " + scrollTop);

            //trace("pageoffset = " + window.pageYOffset);

            var scrollOffset = scrollTop - _oldScrollTop;
            _oldScrollTop = scrollTop;
            if(scrollOffset == 0) return;

            var windowHeight =$(window).height();

            //console.log("scrollTop = " + scrollTop + ", windowHeight = " + windowHeight);

            var name;

            for(name in _registedDic)
            {
                var obj = _registedDic[name];
                var dom = obj.dom;

                var linePosition = windowHeight * .5;
                if(obj.align == ContentTrigger.align.TOP) linePosition = 0;
                if(obj.align == ContentTrigger.align.BOTTOM) linePosition = windowHeight;

                var triggerIt = false;
                var oldCondition = obj.condition;


                var rawTop = _isiOS? $(dom).position().top: $(dom).offset().top;

                if(obj.isAreaMode)
                {
                    //var top = linePosition
                    var objPosition = rawTop + (linePosition - scrollTop);


                    

                    if(objPosition <= obj.top && objPosition >= (obj.top - obj.height))
                    {
                        obj.condition = "in";
                    }
                    else
                    {
                        obj.condition = "out";
                    }
                    //console.log("objPosition = " + objPosition);
                }
                else
                {
                    linePosition += obj.offset;
                    var objTop = rawTop - scrollTop;

                    //console.log("objTop = " + oldCondition);


                    if(objTop < linePosition) obj.condition = "above";
                    else if(objTop > linePosition) obj.condition = "below";
                    else obj.condition = "equal";

                }

                if(obj.mode == ContentTrigger.mode.ALWAYS) triggerIt = true;
                if(obj.mode == ContentTrigger.mode.ON_SWITCH && (obj.condition != oldCondition)) triggerIt = true;



                if(triggerIt)
                {
                    obj.func.call(null, obj.condition, oldCondition, scrollOffset);
                    if(obj.repeat >= 0)
                    {
                        obj.repeat --;
                        if(obj.repeat <= 0) _p.remove(name);
                    }
                }
            }
        }

        _p.remove = function(name)
        {
            delete  _registedDic[name];
        };

        _p.addArea = function(name, dom, top, height, func, setting)
        {
            setting.isAreaMode = true;
            setting.top = top;
            setting.height = height;
            _p.add(name, dom, func, setting);
        };

        _p.add = function(name, dom, func, setting)
        {
            if(_registedDic[name])
            {
                console.error("ContentTrigger: " + name + " already registed");
                return;
            }

            if(!setting) setting = {};

            _registedDic[name] =
            {
                name: name,
                dom: dom,
                func:func,
                align: setting.align? setting.align: ContentTrigger.align.MIDDLE,
                offset: setting.offset? setting.offset: 0,
                offsetIsPercent: setting.offsetIsPercent? setting.offsetIsPercent: false,
                condition: setting.condition? setting.condition: _p.defaultCondition,
                mode: setting.mode? setting.mode: ContentTrigger.mode.ON_SWITCH,
                repeat: setting.repeat? setting.repeat: 0,
                isAreaMode: setting.isAreaMode? setting.isAreaMode: false,
                top: setting.top? setting.top: null,
                height: setting.height? setting.height: null
            };

        };
    }

}());
