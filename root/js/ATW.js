(function ()
{

    var _p = window.ATW = {};

    var $doms = {};

    var _player;

    _p.init = function ()
    {
        $doms.container = $("#atw_block");

        $doms.base = $(document.createElement("div"));
        $doms.base[0].className = "video_base";

        $doms.container.append($doms.base);



        var dom = document.createElement("div");
        dom.id = "atw_video_small";

        $doms.container.append(dom);

        _p.onResize();

        var width = $(dom).width();
        var height = $(dom).height();

        _player = new YT.Player('atw_video_small', {
            height: height,
            width: width,
            videoId: Main.videoID.atw,
            playerVars: { controls: 1, showinfo: 0, start:0, autoplay:0, autoHide:1 },
            events: {
                //'onStateChange': onPlayerStateChange,
                'onReady': onPlayerReady
            }
        });

        $("#atw_video_small")[0].className = "video_player";

        function onPlayerReady()
        {
            $("#atw_video_small")[0].className = "video_player";

            _p.onResize();
        }
    };

    _p.onResize = function (width, height)
    {
        $doms.base.css("top", "60px").css("margin-top", 0).css("height", "324px").css("width", "429px").css("margin-left", "-216px");
        $("#atw_video_small").css("top", "66px").css("margin-top", 0).css("height", "314px").css("width", "419px").css("margin-left", "-210px");
    };

}());



// JavaScript Document
(function ()
{
    "use strict";

    var _p = window.ATWPop = {};

    var _isOn = false;

    var _cb_after_close;


    var doms = {};
    doms.container = document.createElement("div");
    doms.container.className = "atw_video_container";

    doms.cover = document.createElement("div");
    doms.cover.className = "cover";
    $(doms.cover).bind("click", closeVideo);

    doms.base = document.createElement("div");
    doms.base.className = "video_base";

    $(doms.container).append(doms.cover).append(doms.base);

    var _player;

    _p.playVideo = function(cb_after_close)
    {
        _cb_after_close = cb_after_close;

        _isOn = true;

        var dom = document.createElement("div");
        dom.id = "atw_video";


        $("body").append(doms.container);
        $(doms.container).append(dom);

        _p.onResize();

        var width = $(dom).width();
        var height = $(dom).height();

        TweenMax.set(doms.cover, {alpha:0});
        TweenMax.to(doms.cover,1, {alpha:1});
        TweenMax.set("#atw_video", {alpha:0});
        TweenMax.set("#atw_video", {alpha:0});

        _player = new YT.Player('atw_video', {
            height: height,
            width: width,
            videoId: Main.videoID.cf,
            playerVars: { controls: 1, showinfo: 0, start:0, autoplay:1, autoHide:1 },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });

        $("#atw_video")[0].className = "video_player";


        function onPlayerReady(event)
        {
            console.log("player ready");

            if(_isOn == false) return;

            $("#atw_video")[0].className = "video_player";

            TweenMax.to(doms.base,.7, {alpha:1});
            TweenMax.to("#atw_video",.7, {alpha:1, onComplete:function()
            {
                event.target.playVideo();
            }});
        }


        //var done = false;
        function onPlayerStateChange(event)
        {
            if(event.data == YT.PlayerState.ENDED)
            {
                closeVideo();
            }
        }
    };

    function closeVideo()
    {
        _isOn = false;

        TweenMax.to(doms.cover,.5, {alpha:0});
        TweenMax.to(doms.base,.5, {alpha:0});
        TweenMax.to("#atw_video",.5, {alpha:0, onComplete:function()
        {
            if(_player && _player.stopVideo)
            {
                _player.stopVideo();
                _player.destroy();
            }

            $(doms.container).detach();
            $("#atw_video").detach();


            if(_cb_after_close)
            {
                _cb_after_close.apply();
                _cb_after_close = null;
            }
        }});
    }

    _p.onResize = function()
    {
        if(!_isOn) return;


        var width = $(window).width(),
            height = $(window).height();

        var bleed = 100;

        //var sizeObj = MathHelper.getSize_contain(width-bleed, height-bleed, 1280, 720);
        var sizeObj = MathHelper.getSize_contain(width-bleed, height-bleed, 960, 720);

        $("#atw_video").width(sizeObj.width).height(sizeObj.height).css("margin-left", -sizeObj.width *.5 + "px").css("margin-top", -sizeObj.height *.5 + "px");

        sizeObj.width += 10;
        sizeObj.height += 10;
        $(doms.base).width(sizeObj.width-2).height(sizeObj.height-2).css("margin-left", -sizeObj.width *.5 + "px").css("margin-top", -sizeObj.height *.5 + "px");

    };


}());
