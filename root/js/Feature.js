(function ()
{

    var _p = window.Feature = {};

    var $doms = {};

    var _currentIndex = 0;
    var NUM_FEATURES = 10;
    var _isLocking = false;
    var _nextIndex = null;

    var _isMobileMode = false;

    _p.init = function ()
    {
        var i;

        $doms.container = $("#feature_block");
        $doms.btnContainer = $doms.container.find("> .feature_menu");

        //$doms.btn_0 =
        for(i=0;i<NUM_FEATURES;i++){ setBlock(i); }

        function setBlock(index)
        {
            var $btnDom = $doms["btn_" + index] = $doms.btnContainer.find(".feature_btn:nth-of-type("+(index+1)+")");

            var $blockDom = $doms["block_" + index] = $doms.container.find(".feature_block:nth-of-type("+(index+1)+")");



            if(index == _currentIndex)
            {
                $btnDom.toggleClass("focused", true);
                $blockDom.css("display", "block").css("visibility", "visible");
            }
            else
            {
                $blockDom.css("display", "none").css("visibility", "visible");
            }

            $btnDom.bind("click", function()
            {
               Main.toBlock("/Feature");
               toBlock(index);
            });
        }
    };

    function toBlock(index)
    {
        if(_isLocking)
        {
            _nextIndex = index;
            return;
        }

        if(index >=0 && index < NUM_FEATURES)
        {
            if(index == _currentIndex) return;

            _isLocking = true;

            var $current = $doms["block_" + _currentIndex];
            var $next = $doms["block_" + index];

            var $currentBtn = $doms["btn_" + _currentIndex];
            var $nextBtn = $doms["btn_" + index];

            $currentBtn.toggleClass("focused", false);
            $nextBtn.toggleClass("focused", true);

            $next.css("display", "block");

            var tl = new TimelineMax;

            if(_currentIndex < index)
            {
                $next.css("left", "100%");

                tl.to($current,1,{left:"-100%", ease:Power1.easeInOut}, 0);
                tl.to($next,1,{left:"0%", ease:Power1.easeInOut}, 0);
            }
            else
            {
                $next.css("left", "-100%");

                tl.to($current,1,{left:"100%", ease:Power1.easeInOut}, 0);
                tl.to($next,1,{left:"0%", ease:Power1.easeInOut}, 0);
            }

            tl.add(function()
            {
                $current.css("display", "none");
                _isLocking = false;

                if(_nextIndex != null)
                {
                    toBlock(_nextIndex);
                    _nextIndex = null;
                }
            });

            _currentIndex = index;


        }
        else
        {
            alert("feature index: " + index + " not exist");
        }
    }

    _p.onResize = function(width, height)
    {

        var oldB = _isMobileMode;
        _isMobileMode = (width <= Main.settings.cWidth);

        if(oldB != _isMobileMode)
        {
            if(_isMobileMode)
            {
                $(".feature_block").css("display", "block").css("left", 0);
            }
            else
            {
                $(".feature_block").css("display", "none").css("left", 0);

                var $current = $doms["block_" + _currentIndex];
                $current.css("display", "block");
            }
        }

    };

}());