(function ()
{

    var _p = window.Watch = {};

    var $doms = {};

    _p.init = function ()
    {
        $doms.container = $("#watch_block");
        $doms.content = $doms.container.find("> .watch_content");

        $doms.title = $doms.container.find("> .watch_title");
        Helper.getInitValue($doms.title[0]);

        $doms.container.bind("mousemove", function(event)
        {
            var ratio = event.clientX / $(window).width();
            var index = parseInt(ratio * 6) + 1;

            //console.log("index = " + index);

            $doms.content.css("background", "url(images/360_0"+index+".jpg) center center").css("background-size", "cover");

        });

    };

    _p.onResize = function (width, height)
    {

        var sizeObj = MathHelper.getSize_cover(width, height, 2400, 1300);
        var dom = $doms.title[0];

        $doms.title.width(dom.init.w*sizeObj.ratio).height(dom.init.h*sizeObj.ratio).css("margin-top", dom.init.mt*sizeObj.ratio);
    };


}());