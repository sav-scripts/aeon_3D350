/**
 * Created by sav on 2015/5/28.
 */
(function(){

    var _p = window.Main = {};

    var _hashDic, _contentList;
    var _defaultHash = "/Index";

    var _isIndexFixHidden = false;
    var _contentTrigger;

    var _windowWidth;

    var _cbAfterToBlock;

    _p.currentMode = null;

    _p.settings =
    {
        mWidth: 720,
        cWidth: 1200,
        maxSparkCount: 6,
        maxSparkCount2: 50
    };

    _p.videoID =
    {
        atw:"SPpBHNWsad0",
        cf:"Jy0GxwfFdRY"
    };

    var SCROLL_SPEED = 2000;

    var $doms = {};

    _p.isLocal = false;

    _p.init = function()
    {
        SimplePreloading.init();

        var appId = "1384405598556258";
        if(window.location.host == 'local.savorks.com') appId = '1384627715200713';

        //SavFB.init(appId);
        FBHelper.init(appId, function()
        {
            initYouTube(build);
        });

        setupDebug();

    };

    function setupDebug()
    {
        window.trace = function(string)
        {
            $(".debug_block").text(string);
            console.log(string);
        }
    }

    function build()
    {
        if(window.location.host == "local.savorks.com" || window.location.host == "socket.savorks.com")
        {
            _p.isLocal = true;
        }


        RightMenu.init();
        Spec.init();
        Index.init();
        Feature.init();
        MotoColor.init();
        Watch.init();
        Sign.init();
        CF.init();
        ATW.init();
        Share.init();

        $("#logo").bind("click", function()
        {
           window.open("http://www.aeonmotor.com.tw/home.php", "_blank");
        });


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
            if(_hashDic[hashName])
            {
                ga("send", "pageview", hashName);
                _p.scrollToBlock(hashName);
            }
        });


        _contentTrigger = new ContentTrigger();


        if(!BrowserDetect.isMobile) setupParticle();
        setupScrollTrigger();

        $(window).bind("resize", onResize);

        _contentTrigger.refresh();

        onResize();

        TweenMax.to(".on_loading",.5, {alpha:0, onComplete:function()
        {
            $(".on_loading").detach();
        }});

        if(Utility.urlParams.skip_intro != "1") ATWPop.playVideo();


        var firstHash = Utility.getHash();
        if(!_hashDic[firstHash]) firstHash = _defaultHash;
        ga("send", "pageview", firstHash);
        _p.scrollToBlock(firstHash, 0);

        if(BrowserDetect.isMobile)
        {
            $("html, body, #wrapper").css({
                height: $(window).height()
            });
        }
    }

    function setupParticle()
    {
        var oldScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

        //var topFlash =
        //var bottomFlash =

        $doms.topFlash = $(".top_flash");
        $doms.bottomFlash = $(".bottom_flash");

        $(window).on("scroll", function()
        {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            var dy = scrollTop - oldScrollTop;
            oldScrollTop = scrollTop;
            if(dy == 0) return;


            createSpark(dy, _windowWidth);



        });


    }

    function createSpark(dy, windowWidth, maxCount)
    {
        if(BrowserDetect.isMobile) return;
        if(dy > 0 && _isIndexFixHidden == false) return;

        var h;
        var maxHeight = 20;
        if(maxCount == null) maxCount = _p.settings.maxSparkCount;

        var count = Math.abs(parseInt(dy / 10));
        if(count > maxCount) count = maxCount;

        var flip = dy > 0? -1:1;

        for(var i=0;i<count;i++)
        {
            createOne(flip);
        }


        if(dy > 0)
        {
            h = $doms.topFlash.height() + 3;
            if(h > maxHeight) h = maxHeight;
            TweenMax.set($doms.topFlash[0], {height:h});
            TweenMax.to($doms.topFlash[0],.5, {height:0, ease:Power1.easeIn});
        }
        else
        {
            h = $doms.bottomFlash.height() + 3;
            if(h > maxHeight) h = maxHeight;
            TweenMax.set($doms.bottomFlash[0], {height:h});
            TweenMax.to($doms.bottomFlash[0],.5, {height:0, ease:Power1.easeIn});
        }


        function createOne(flip)
        {
            var dom = document.createElement("div");
            dom.className = Math.random() > .2? "particle_0": "particle_1";
            $(dom).css(flip==1?"bottom":"top", flip==1?-25:-18).css("left", parseInt(Math.random()* windowWidth));

            $("body").append(dom);

            var x1 = -100 + Math.random()*200;
            var y1 = -Math.random()*200 * flip;
            var x2 = -100 + Math.random()*200;
            var y2 = y2-Math.random()*200 * flip;
            var duration = .5 + Math.random()*.5;
            var delay = Math.random()*.2;
            var scale = Math.random() +.5;

            var tl = new TimelineMax();
            tl.set(dom, {scale:scale});
            tl.to(dom, duration, {bezier:{type:"thru", values:[{x:x1, y:y1}, {x:x2, y:y2}], autoRotate:["x","y","rotation",90,false]}, ease:Power1.easeInOut}, delay);
            tl.to(dom, duration *.7, {alpha:0}, delay);
            tl.add(function()
            {
                $(dom).detach();
            });
        }

    }


    function setupScrollTrigger()
    {
        $doms.mainScrollBtn = $("body").find("> .scroll_btn");
        TweenMax.set($doms.mainScrollBtn, {autoAlpha:0, marginBottom:-30});

        var mark = _hashDic["/Brand"].block[0];

        var oldDisplay = $("#index_fix_block").css("display");

        _contentTrigger.add("2ndContent", mark, function(condition)
        {
            var newDisplay = condition == "below"? "block": "none";
            _isIndexFixHidden = condition != "below";
            if(newDisplay != oldDisplay)
            {
                $("#index_fix_block").css("display", newDisplay);
                oldDisplay = newDisplay;

                if(newDisplay == "none")
                {
                    createSpark(1000, _windowWidth, _p.settings.maxSparkCount2);
                }

                //console.log("changed");
            }

        }, {align:ContentTrigger.align.TOP, condition:"not triggered", repeat:-1});



        _contentTrigger.add("atw", _hashDic["/ATW"].block[0], function(condition)
        {
            //console.log("changed: " + condition);

            if(condition == "in")
            {
                _contentTrigger.remove("atw");

                ATW.initVideo();
            }

        }, {align:ContentTrigger.align.TOP, condition:"not triggered", repeat:-1, isAreaMode:true, top:"screenHeight", height:"contentAndScreen"});


        _contentTrigger.add("cf", _hashDic["/CF"].block[0], function(condition)
        {
            //console.log("changed: " + condition);

            if(condition == "in")
            {
                _contentTrigger.remove("cf");

                CF.initVideo();
            }

        }, {align:ContentTrigger.align.TOP, condition:"not triggered", repeat:-1, isAreaMode:true, top:"screenHeight", height:"contentAndScreen"});


        /*
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
        */
    }

    _p.toBlock = function(hashName, cb)
    {
        _cbAfterToBlock = cb;

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
        if(BrowserDetect.isMobile)
        {
            $("html, body, #wrapper").css({
                height: $(window).height()
            });
        }


        if(hashName == "") hashName = _defaultHash;
        var $block = _hashDic[hashName].block;
        var targetTop = $block.position().top;

        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

        var dScroll = Math.abs(scrollTop - targetTop);
        var duration = dScroll / SCROLL_SPEED;
        if(duration > 1.5) duration = 1.5;
        if(duration < .9) duration = .9;
        if(fixDuration != null) duration = fixDuration;

        TweenMax.to(window, duration, {scrollTo:{y:targetTop}, ease:Power1.easeInOut, onComplete:function()
        {
            if(_cbAfterToBlock != null) _cbAfterToBlock.apply();
            _cbAfterToBlock = null;
        }});
    };

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



    function initYouTube(cb)
    {
        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = function() {
            if(cb) cb.apply();
        };
    }

    function onResize()
    {
        var width = _windowWidth = $(window).width(),
            height = $(window).height();

        var oldMode = Main.currentMode;
        if(width > _p.settings.cWidth) Main.currentMode = "large";
        else if(width > _p.settings.mWidth) Main.currentMode = "middle";
        else Main.currentMode = "small";

        var changed = oldMode != Main.currentMode;

        _p.settings.maxSparkCount = width/1900*6;
        _p.settings.maxSparkCount2 = width/1900*50;

        Index.onResize(width, height, changed, Main.currentMode);
        Spec.onResize(width, height, changed, Main.currentMode);
        Feature.onResize(width, height, changed, Main.currentMode);
        MotoColor.onResize(width, height, changed, Main.currentMode);
        Watch.onResize(width, height, changed, Main.currentMode);
        CF.onResize(width, height, changed, Main.currentMode);
        Sign.onResize(width, height, changed, Main.currentMode);
        ATW.onResize(width, height, changed, Main.currentMode);
        Share.onResize(width, height, changed, Main.currentMode);

        ATWPop.onResize();

        RightMenu.onResize(width, height, changed, Main.currentMode);

        _contentTrigger.refresh();
    }



}());