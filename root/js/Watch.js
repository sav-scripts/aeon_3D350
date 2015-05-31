(function ()
{

    var _p = window.Watch = {};

    var $doms = {};

    var _currentIndex = 0;

    _p.init = function ()
    {
        $doms.container = $("#watch_block");
        $doms.contents = $doms.container.find("> .watch_content");

        $doms.title = $doms.container.find("> .watch_title");
        Helper.getInitValue($doms.title[0]);

        $doms.contents.css("display", "none").css("z-index", 0);
        $($doms.contents[_currentIndex]).css("display", "block").css("z-index", 1);

        $doms.container.bind("mousemove", function(event)
        {
            var ratio = event.clientX / $(window).width();
            var index = parseInt(ratio * 6);

            if(index != _currentIndex)
            {
                var oldIndex = _currentIndex;
                _currentIndex = index;
                var $old = $($doms.contents[oldIndex]);
                var $current = $($doms.contents[_currentIndex]);

                $old.css("display", "none").css("z-index", 0);
                $current.css("display", "block").css("z-index", 1);

                //TweenMax.set($current, {alpha:0});
                //TweenMax.to($current,.1, {alpha:1});

            }

        });

    };

    _p.onResize = function (width, height)
    {

        var sizeObj = MathHelper.getSize_cover(width, height, 2400, 1300);
        var dom = $doms.title[0];

        $doms.title.width(dom.init.w*sizeObj.ratio).height(dom.init.h*sizeObj.ratio).css("margin-top", dom.init.mt*sizeObj.ratio);
    };


}());