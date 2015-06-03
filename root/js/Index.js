(function(){

    var _p = window.Index = {};

    var SWITCH_DELAY = 5;
    var $doms = {};

    var _displayingIndex = 1;

    var _timer;

    var _isMobileMode = false;

    var _blockList;

    var _isInit = false;

    _p.init = function()
    {
        _isMobileMode = $(window).width() <= Main.settings.mWidth;

        $doms.container = $("#index_fix_block");
        $doms.leftBlock_0 = $doms.container.find("> .left_block_0");
        $doms.leftBlock_1 = $doms.container.find("> .left_block_1");
        $doms.rightBlock_0 = $doms.container.find("> .right_block_0");
        $doms.rightBlock_1 = $doms.container.find("> .right_block_1");

        $doms.btnShare = $("#index_block").find("> .index_share_btn");

        //$doms.leftImages = $([$doms.leftBlock_0.find("img")[0], $doms.leftBlock_1.find("img")[0]]);
        //$doms.rightImages = $([$doms.rightBlock_0.find("img")[0], $doms.rightBlock_1.find("img")[0]]);

        $doms.leftImages = $([$doms.leftBlock_0.find(".index_image")[0], $doms.leftBlock_1.find(".index_image")[0]]);
        $doms.rightImages = $([$doms.rightBlock_0.find(".index_image")[0], $doms.rightBlock_1.find(".index_image")[0]]);


        _blockList = [$doms.leftBlock_0, $doms.leftBlock_1, $doms.rightBlock_0, $doms.rightBlock_1];

        //console.log("start");

        _timer = new TimelineMax({repeat:-1, paused:false});
        _timer.add(triggerSwitch, SWITCH_DELAY);

        $doms.btnShare.bind("click", function()
        {
           Share.tryShare(function()
           {
               Main.toBlock("/Share", Share.openForm);
           });
        });

        _isInit = true;
    };

    function triggerSwitch()
    {
        //console.log("run");

        var $leftTopBlock, $leftBottomBlock, $rightTopBlock, $rightBottomBlock;
        if(_displayingIndex == 0)
        {
            $leftTopBlock = $doms.leftBlock_0;
            $leftBottomBlock = $doms.leftBlock_1;
            $rightTopBlock = $doms.rightBlock_0;
            $rightBottomBlock = $doms.rightBlock_1;
        }
        else
        {
            $leftTopBlock = $doms.leftBlock_1;
            $leftBottomBlock = $doms.leftBlock_0;
            $rightTopBlock = $doms.rightBlock_1;
            $rightBottomBlock = $doms.rightBlock_0;
        }

        if(_isMobileMode)
        {
            $leftBottomBlock.css("z-index", 0).css("width", "100%");
            $leftTopBlock.css("z-index", 1).css("width", "100%");
            $rightBottomBlock.css("z-index", 0).css("width", "100%");
            $rightTopBlock.css("z-index", 1).css("width", "100%");

            TweenMax.to($leftTopBlock,1,{width:"0%", ease:Power1.easeIn});
            TweenMax.to($rightTopBlock,1,{width:"0%", ease:Power1.easeIn});
        }
        else
        {
            $leftBottomBlock.css("z-index", 0).css("height", "100%");
            $leftTopBlock.css("z-index", 1).css("height", "100%");
            $rightBottomBlock.css("z-index", 0).css("height", "100%");
            $rightTopBlock.css("z-index", 1).css("height", "100%");

            TweenMax.to($leftTopBlock,1,{height:"0%", ease:Power1.easeIn});
            TweenMax.to($rightTopBlock,1,{height:"0%", ease:Power1.easeIn});
        }

        _displayingIndex ++;
        if(_displayingIndex > 1) _displayingIndex = 0;

    }

    _p.onResize = function(width, height)
    {
        if(!_isInit) return;

        var oldMode = _isMobileMode;

        _isMobileMode = (width <= Main.settings.mWidth);

        if(oldMode != _isMobileMode)
        {
            TweenMax.killTweensOf(_blockList);

            //TweenMax.killTweensOf($doms.leftBlock_0);
            //TweenMax.killTweensOf($doms.leftBlock_1);
            //TweenMax.killTweensOf($doms.rightBlock_0);
            //TweenMax.killTweensOf($doms.rightBlock_1);

            _timer.restart();

            if(_isMobileMode)
            {
                TweenMax.set(_blockList, {width:"100%", height:"50%"});
            }
            else
            {
                TweenMax.set(_blockList, {width:"50%", height:"100%"});
            }
        }

        var halfWidth = width * .5,
            halfHeight = height * .5,
            imageWidth = 1024,
            imageHeight = 1000,
            size;

        if(_isMobileMode)
        {
            imageWidth = 750;
            imageHeight = 561;

            size = MathHelper.getSize_cover(width, halfHeight, imageWidth, imageHeight);
            size.width = Math.ceil(size.width);
            size.height = Math.ceil(size.height);

            //$doms.leftImages.attr("width", size.width + "px").attr("height", size.height + "px").css("left", (width - size.width) *.5).css("bottom", (halfHeight - size.height) *.5);
            //$doms.rightImages.attr("width", size.width + "px").attr("height", size.height + "px").css("right", (width - size.width) *.5).css("top", (halfHeight - size.height) *.5);


            $doms.leftImages.css("width", size.width + "px").css("height", size.height + "px").css("left", (width - size.width) *.5).css("bottom", (halfHeight - size.height) *.5);
            $doms.rightImages.css("width", size.width + "px").css("height", size.height + "px").css("right", (width - size.width) *.5).css("top", (halfHeight - size.height) *.5);

        }
        else
        {
            size = MathHelper.getSize_cover(halfWidth, height, imageWidth, imageHeight);
            size.width = Math.ceil(size.width);
            size.height = Math.ceil(size.height);

            //$doms.leftImages.attr("width", size.width + "px").attr("height", size.height + "px").css("left", (halfWidth - size.width) *.5).css("bottom", (height - size.height) *.5);
            //$doms.rightImages.attr("width", size.width + "px").attr("height", size.height + "px").css("right", (halfWidth - size.width) *.5).css("top", (height - size.height) *.5);

            $doms.leftImages.css("width", size.width + "px").css("height", size.height + "px").css("left", (halfWidth - size.width) *.5).css("bottom", (height - size.height) *.5);
            $doms.rightImages.css("width", size.width + "px").css("height", size.height + "px").css("right", (halfWidth - size.width) *.5).css("top", (height - size.height) *.5);
        }

        if(oldMode != _isMobileMode)
        {
            triggerSwitch();
        }

    };

}());