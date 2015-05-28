(function(){

    var _p = window.Index = {};

    var SWITCH_DELAY = 5;
    var $doms = {};

    var _displayingIndex = 1;

    _p.init = function()
    {
        $doms.container = $("#index_fix_block");
        $doms.leftBlock_0 = $doms.container.find("> .left_block_0");
        $doms.leftBlock_1 = $doms.container.find("> .left_block_1");
        $doms.rightBlock_0 = $doms.container.find("> .right_block_0");
        $doms.rightBlock_1 = $doms.container.find("> .right_block_1");

        $doms.leftImages = $([$doms.leftBlock_0.find("img")[0], $doms.leftBlock_1.find("img")[0]]);
        $doms.rightImages = $([$doms.rightBlock_0.find("img")[0], $doms.rightBlock_1.find("img")[0]]);


        //console.log("start");

        var tl = new TimelineMax({repeat:-1, paused:false});
        tl.add(function()
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

            $leftBottomBlock.css("z-index", 0).css("height", "100%");
            $leftTopBlock.css("z-index", 1).css("height", "100%");
            $rightBottomBlock.css("z-index", 0).css("height", "100%");
            $rightTopBlock.css("z-index", 1).css("height", "100%");

            TweenMax.to($leftTopBlock,1,{height:"0%", ease:Power1.easeIn});
            TweenMax.to($rightTopBlock,1,{height:"0%", ease:Power1.easeIn});

            _displayingIndex ++;
            if(_displayingIndex > 1) _displayingIndex = 0;

        }, SWITCH_DELAY);
    };

    _p.onResize = function(width, height)
    {
        var halfWidth = width * .5;
        var imageWidth = 1024;
        var imageHeight = 1000;

        var size = MathHelper.getSize_cover(halfWidth, height, imageWidth, imageHeight);
        size.width = Math.ceil(size.width);
        size.height = Math.ceil(size.height);

        $doms.leftImages.attr("width", size.width + "px").attr("height", size.height + "px").css("left", (halfWidth - size.width) *.5).css("bottom", (height - size.height) *.5);
        $doms.rightImages.attr("width", size.width + "px").attr("height", size.height + "px").css("left", (halfWidth - size.width) *.5).css("top", (height - size.height) *.5);
    };

}());