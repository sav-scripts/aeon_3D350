/**
 * Created by sav on 2015/5/28.
 */
(function(){

    var _p = window.Main = {};

    var _hashDic, _contentList;
    var _defaultHash = "/Index";

    var _isScrollButtonHidding = true;
    var _contentTrigger;

    var SCROLL_SPEED = 2000;

    var $doms = {};

    _p.isLocal = false;

    _p.init = function()
    {
        //TweenPlugin.activate([ScrollToPlugin]);
        SimplePreloading.init();

        if(window.location.host == "local.savorks.com" || window.location.host == "socket.savorks.com")
        {
            _p.isLocal = true;
        }


        RightMenu.init();
        Index.init();
        Feature.init();
        MotoColor.init();
        Watch.init();
        Sign.init();


        setupScrollButton($(".scroll_btn"));

        _hashDic = {};
        _contentList = [];

        var obj, hash, i, $dom, $scrollBlocks = $(".scroll_block");
        for(i=0;i<$scrollBlocks.length;i++)
        {
            $dom = $($scrollBlocks[i]);
            hash = $dom.attr("hash");
            obj = {block:$dom, hash:hash};
            _hashDic[hash] = obj;
            _contentList.push(obj);
        }

        Utility.onHashChange(function(hashName)
        {
            _p.scrollToBlock(hashName);
        });

        _p.scrollToBlock(Utility.getHash(), 0);

        _contentTrigger = new ContentTrigger();

        //setupScrollTrigger();

        $(window).bind("resize", onResize);

        _contentTrigger.refresh();

        onResize();


        ATWPop.init(function()
        {
            ATWPop.playVideo();
        });
    };

    function setupScrollTrigger()
    {
        $doms.mainScrollBtn = $("body").find("> .scroll_btn");
        TweenMax.set($doms.mainScrollBtn, {autoAlpha:0, marginBottom:-30});

        var mark = _hashDic["/Brand"].block[0];
        _contentTrigger.add("2ndContent", mark, function(condition)
        {
            var oldBool = _isScrollButtonHidding;
            _isScrollButtonHidding = condition == "below";

            if(oldBool != _isScrollButtonHidding)
            {
                update();
            }

        }, {align:ContentTrigger.align.TOP, condition:"not triggered", repeat:-1});


        mark = _contentList[_contentList.length-1].block[0];
        _contentTrigger.add("finalContent", mark, function(condition)
        {
            var oldBool = _isScrollButtonHidding;
            _isScrollButtonHidding = condition != "below";

            if(oldBool != _isScrollButtonHidding)
            {
                update();
            }

        }, {align:ContentTrigger.align.TOP, condition:"not triggered", repeat:-1});

        function update()
        {
            if(_isScrollButtonHidding)
            {
                TweenMax.to($doms.mainScrollBtn,.5, {autoAlpha:0, marginBottom:-30});
            }
            else
            {
                TweenMax.to($doms.mainScrollBtn,.5, {autoAlpha:1, marginBottom:0});
            }
        }
    }

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

    function switchScrollButton()
    {

    }

    function setupScrollButton($btn)
    {
        $btn.bind("click", toNextContent);

        var $arrow = $btn.find(".scroll_arrow");
        var tl = new TimelineMax({repeat:-1});
        tl.to($arrow,.5,{marginTop:10, ease:Linear.easeNone});
        tl.to($arrow,.5,{marginTop:0, ease:Linear.easeNone});
    }

    function toNextContent()
    {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        var i, $dom, obj, contentTop;
        for(i=0;i<_contentList.length;i++)
        {
            obj = _contentList[i];
            $dom = obj.block;
            contentTop = $dom.position().top - scrollTop;
            if(contentTop > 0)
            {
                //console.log("next = " + obj.hash);
                _p.toBlock(obj.hash);
                break;
            }
        }
    }

    function onResize()
    {
        var width = $(window).width(),
            height = $(window).height();

        Index.onResize(width, height);
        Feature.onResize(width, height);
        MotoColor.onResize(width, height);
        Watch.onResize(width, height);
        Sign.onResize(width, height);

        ATWPop.onResize();

    }



}());