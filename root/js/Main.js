/**
 * Created by sav on 2015/5/28.
 */
(function(){

    var _p = window.Main = {};

    var _hashDic;
    var _defaultHash = "/Index";

    var SCROLL_SPEED = 2000;

    _p.init = function()
    {
        //TweenPlugin.activate([ScrollToPlugin]);

        RightMenu.init();
        Index.init();
        Feature.init();
        MotoColor.init();
        Sign.init();

        _hashDic =
        {
            "/Index": { block: $("#index_block"), ga:"" },
            "/Brand": { block: $("#brand_block"), ga:"" },
            "/ATW": { block: $("#atw_block"), ga:"" },
            "/Feature": { block: $("#feature_block"), ga:"" },
            "/Spec": { block: $("#spec_block"), ga:"" },
            "/Color": { block: $("#color_block"), ga:"" },
            "/Watch": { block: $("#watch_block"), ga:"" },
            "/Info": { block: $("#info_block"), ga:"" },
            "/CF": { block: $("#cf_block"), ga:"" },
            "/Sign": { block: $("#sign_block"), ga:"" }
        };

        Utility.onHashChange(function(hashName)
        {
           //console.log("new hash = " + newHash);
            //console.log(_hashDic[newHash]);
            _p.scrollToBlock(hashName);
        });

        $(window).scroll(function(e)
        {
        });

        _p.scrollToBlock(Utility.getHash(), 0);


        $(window).bind("resize", onResize);
        onResize();
    };

    _p.toBlock = function(hashName)
    {
        if(Utility.getHash() != hashName)
        {
            Utility.setHash(hashName);
        }
        else
        {
            _p.scrollToBlock(hashName);
        }
    };

    _p.scrollToBlock = function(hashName, fixDuration)
    {
        //console.log(hashName);
        if(hashName == "") hashName = _defaultHash;
        var $block = _hashDic[hashName].block;
        var targetTop = $block.position().top;

        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

        var dScroll = Math.abs(scrollTop - targetTop);
        var duration = dScroll / SCROLL_SPEED;
        if(duration > 1.5) duration = 1.5;
        if(duration < .9) duration = .9;
        if(fixDuration != null) duration = fixDuration;
        //var duration = 1;

        //TweenMax.to(window, duration, {scrollTop:$block.position().top});


        TweenMax.to(window, duration, {scrollTo:{y:targetTop}, ease:Power1.easeInOut});

        //console.log(dScroll);

        //console.log($block.position().top);
        //console.log($("body")[0].scrollTop);
    };

    function onResize(event)
    {
        var width = $(window).width(),
            height = $(window).height();

        Index.onResize(width, height);
        Feature.onResize(width, height);
        MotoColor.onResize(width, height);
        Sign.onResize(width, height);

    }



}());