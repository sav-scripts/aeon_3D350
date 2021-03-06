(function ()
{

    var _p = window.MotoColor = {};

    var $doms = {};

    var _oldX = null;
    var _isWhite = true;
    var _tweenObj = {clientX:0};

    _p.init = function ()
    {
        $doms.container = $("#color_block");
        $doms.white = $doms.container.find("> .moto_white");
        $doms.black = $doms.container.find("> .moto_black");

        $doms.whiteImage = $doms.white.find(".moto_image");
        $doms.blackImage = $doms.black.find(".moto_image");

        $doms.title = $doms.container.find("> .color_title");
        Helper.getInitValue($doms.title[0]);

        $doms.whiteShadow = $doms.container.find("> .color_white_shadow");
        $doms.blackShadow = $doms.container.find("> .color_black_shadow");

        $doms.whiteTitle = $doms.container.find(".color_title_white");
        $doms.blackTitle = $doms.container.find(".color_title_black");

        Helper.getInitValue($doms.blackTitle[0]);
        Helper.getInitValue($doms.whiteTitle[0]);

        if(BrowserDetect.isMobile)
        {
            $doms.whiteShadow.css("display", "none");
            $doms.blackShadow.css("display", "none");
        }

        //$(window).bind("mousemove", function(event)

        _tweenObj.clientX = $(window).width();
        update();

        if(BrowserDetect.isMobile && ('DeviceOrientationEvent' in window))
        {
            window.addEventListener('deviceorientation', handleOrientation);
        }
        else
        {
            bindMouseTrigger();
        }


        function handleOrientation(event)
        {
            //trace(event.gamma);
            var v;

            if(Main.settings.isVerticalMode)
            {
                v = event.gamma;
            }
            else
            {
                v =  -event.beta;
            }



            if(v == null)
            {
                bindMouseTrigger();
                window.removeEventListener("deviceorientation", handleOrientation);
            }
            else
            {
                var oldIsWhite = _isWhite;
                _isWhite = (v > 0);

                if(oldIsWhite != _isWhite)
                {

                    var targetX = _isWhite? $(window).width(): 0;

                    TweenMax.killTweensOf(_tweenObj);
                    TweenMax.to(_tweenObj,.8, {clientX:targetX, onUpdate:function()
                    {
                        update(_tweenObj);
                    }});


                }
            }



        }

        function bindMouseTrigger()
        {
            $doms.container.bind("mousemove", update);
        }

        function update(event)
        {
            var windowWidth = $(window).width();
            var x = !event? windowWidth: event.clientX;
            if(_oldX == null) _oldX = x;

            var dx = x - _oldX;
            _oldX = x;
            //console.log("mousemove: " + event.clientX);

            //console.log("dx = " + dx);

            $doms.white.width(x);
            $doms.black.width(windowWidth - x);


            var oldWidth;

            if(dx > 0)
            {
                TweenMax.killTweensOf($doms.whiteShadow[0]);
                oldWidth = parseFloat($doms.whiteShadow.css("width"));
                $doms.whiteShadow.css("width", oldWidth + dx);
                TweenMax.to($doms.whiteShadow[0],.5,{width:0});
            }
            else if(dx < 0)
            {
                dx *= -1;
                TweenMax.killTweensOf($doms.blackShadow[0]);
                oldWidth = parseFloat($doms.blackShadow.css("width"));
                $doms.blackShadow.css("width", oldWidth + dx);
                TweenMax.to($doms.blackShadow[0],.5,{width:0});

            }

            $doms.whiteShadow.css("right", windowWidth - x);
            $doms.blackShadow.css("left", x);
        }

    };

    _p.onResize = function (width, height)
    {
        var isMobile = width <= Main.settings.cWidth;

        var imageSize = isMobile? {w:1200, h:1420}: {w:2400, h:1300};

        resizeImage($doms.whiteImage, "left");
        resizeImage($doms.blackImage, "right");

        var left = width *.5 + 500;
        var right = left + $doms.whiteTitle[0].init.w;
        var dx = width - 110 - right;
        //console.log("dx = " + dx);
        if(dx < 0) left += dx;

        $doms.whiteTitle.css("left", left + "px");
        $doms.blackTitle.css("right", width - left - $doms.blackTitle[0].init.w + "px");

        var sizeObj = MathHelper.getSize_cover(width, height, imageSize.w, imageSize.h);
        var dom = $doms.title[0];

        $doms.title.width(dom.init.w*sizeObj.ratio).height(dom.init.h*sizeObj.ratio).css("margin-top", dom.init.mt*sizeObj.ratio);

        //TweenMax.set(dom, {scale:sizeObj.ratio});

        function resizeImage($img, hString)
        {

            var size = MathHelper.getSize_cover(width, height, imageSize.w, imageSize.h);

            $img.css("width", size.width + "px").css("height", size.height + "px").css(hString, (width - size.width) *.5).css("top", (height - size.height) *.5);
        }
    };


}());