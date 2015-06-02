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

        /*
        var myLenticular = new Lenticular.Image($doms.contents[_currentIndex], {
            images: 'images/360_0##.jpg',
            frames: 6,
            axis:"x"
        });

        myLenticular.activate();
        myLenticular.showFrame(3);
        */

        //trace(Modernizr.deviceorientation);

        if(BrowserDetect.isMobile && ('DeviceOrientationEvent' in window))
        {
            window.addEventListener('deviceorientation', handleOrientation);
        }
        else
        {
            bindMouseTrigger();
        }

        var totalArc = 60,
            halfArc = totalArc*.5;

        function handleOrientation(event)
        {
            trace(event.gamma);

            if(event.gamma == null)
            {
                bindMouseTrigger();
                window.removeEventListener("deviceorientation", handleOrientation);
            }


            var arc = event.gamma;
            if(arc < -halfArc) arc = -halfArc;
            if(arc > halfArc) arc = halfArc;
            updateFrame((totalArc - (arc+halfArc))/totalArc);

        }

        function updateFrame(ratio)
        {
            //trace(ratio);
            if(ratio >= 1) ratio = .99;
            var index = parseInt(ratio * 7) + 3;
            index = index * -1 + 12;
            //console.log("index = " + index);
            index = index % 6;

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
        }

        function bindMouseTrigger()
        {


             $doms.container.bind("mousemove", function(event)
             {
                 var ratio = event.clientX / $(window).width();
                 updateFrame(ratio);

             });
        }

    };

    _p.onResize = function (width, height)
    {

        var sizeObj = MathHelper.getSize_cover(width, height, 2400, 1300);
        var dom = $doms.title[0];

        $doms.title.width(dom.init.w*sizeObj.ratio).height(dom.init.h*sizeObj.ratio).css("margin-top", dom.init.mt*sizeObj.ratio);
    };


}());