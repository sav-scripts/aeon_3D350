(function ()
{

    var _p = window.MotoColor = {};

    var $doms = {};

    var _oldX = null;

    _p.init = function ()
    {
        $doms.container = $("#color_block");
        $doms.white = $doms.container.find("> .moto_white");
        $doms.black = $doms.container.find("> .moto_black");

        $doms.whiteImage = $doms.white.find("img");
        $doms.blackImage = $doms.black.find("img");

        $doms.title = $doms.container.find("> .color_title");
        Helper.getInitValue($doms.title[0]);

        $doms.whiteShadow = $doms.container.find("> .color_white_shadow");
        $doms.blackShadow = $doms.container.find("> .color_black_shadow");

        //$(window).bind("mousemove", function(event)
        $doms.container.bind("mousemove", function(event)
        {
            var windowWidth = $(window).width();
            var x = event.clientX;
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
        });

    };

    _p.onResize = function (width, height)
    {
        resizeImage($doms.whiteImage, "left");
        resizeImage($doms.blackImage, "right");

        var sizeObj = MathHelper.getSize_cover(width, height, 2400, 1300);
        var dom = $doms.title[0];

        $doms.title.width(dom.init.w*sizeObj.ratio).height(dom.init.h*sizeObj.ratio).css("margin-top", dom.init.mt*sizeObj.ratio);

        //TweenMax.set(dom, {scale:sizeObj.ratio});

        function resizeImage($img, hString)
        {

            var imageWidth = $img.width();
            var imageHeight = $img.height();

            var size = MathHelper.getSize_cover(width, height, imageWidth, imageHeight);

            $img.attr("width", size.width + "px").attr("height", size.height + "px").css(hString, (width - size.width) *.5).css("top", (height - size.height) *.5);
        }
    };


}());