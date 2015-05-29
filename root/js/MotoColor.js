(function ()
{

    var _p = window.MotoColor = {};

    var $doms = {};

    _p.init = function ()
    {
        $doms.container = $("#color_block");
        $doms.white = $doms.container.find("> .moto_white");
        $doms.black = $doms.container.find("> .moto_black");

        $doms.whiteImage = $doms.white.find("img");
        $doms.blackImage = $doms.black.find("img");

        $(window).bind("mousemove", function(event)
        {
            //console.log("mousemove: " + event.clientX);

            var windowWidth = $(window).width();
            $doms.white.width(event.clientX);
            $doms.black.width(windowWidth - event.clientX);

        });

    };

    _p.onResize = function (width, height)
    {
        resizeImage($doms.whiteImage, "left");
        resizeImage($doms.blackImage, "right");

        function resizeImage($img, hString)
        {

            var imageWidth = $img.width();
            var imageHeight = $img.height();

            var size = MathHelper.getSize_cover(width, height, imageWidth, imageHeight);

            $img.attr("width", size.width + "px").attr("height", size.height + "px").css(hString, (width - size.width) *.5).css("top", (height - size.height) *.5);
        }
    };


}());