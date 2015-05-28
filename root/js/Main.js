/**
 * Created by sav on 2015/5/28.
 */
(function(){

    var _p = window.Main = {};

    var _hashDic;

    var SCROLL_SPEED = 2000;

    _p.init = function()
    {
        //TweenPlugin.activate([ScrollToPlugin]);

        Index.init();
        RightMenu.init();

        _hashDic =
        {
            "/Index": $("#index_block"),
            "/Brand": $("#brand_block"),
            "/ATW": $("#atw_block"),
            "/Feature": $("#feature_block"),
            "/Spec": $("#spec_block"),
            "/Color": $("#color_block"),
            "/Watch": $("#watch_block"),
            "/Info": $("#info_block"),
            "/Sign": $("#sign_block")
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

    _p.scrollToBlock = function(hashName)
    {
        var $block = _hashDic[hashName];
        var targetTop = $block.position().top;

        var dScroll = Math.abs(document.documentElement.scrollTop - targetTop);
        //var duration = dScroll / SCROLL_SPEED;
        var duration = 1;

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
    }



}());