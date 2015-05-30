// JavaScript Document
(function ()
{
    "use strict"

    var _p = window.ATWPop = {};

    // SPpBHNWsad0
    // Jy0GxwfFdRY

    var _videoId = "SPpBHNWsad0";
    //var _videoId = "mXxt8hJbelo";

    var _isOn = false;

    var _cb_after_close;

    var _coverDom = document.createElement("div");
    _coverDom.className = "cover";
    $(_coverDom).bind("click", closeVideo);

    var _player;

    _p.init = function(cb)
    {
        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = function() {
            if(cb) cb.apply();
        };

    };

    _p.playVideo = function(cb_after_close)
    {
        _cb_after_close = cb_after_close;

        _isOn = true;

        var dom = document.createElement("div");
        dom.id = "video_player";

        var baseDom = document.createElement("div");
        baseDom.className = "video_base";

        $("body").append(_coverDom).append(baseDom).append(dom);

        _p.onResize();

        var width = $(dom).width();
        var height = $(dom).height();

        TweenMax.set(_coverDom, {alpha:0});
        TweenMax.to(_coverDom,.5, {alpha:1});
        TweenMax.set("#video_player", {alpha:0});
        TweenMax.set(".video_base", {alpha:0});

        _player = new YT.Player('video_player', {
            height: height,
            width: width,
            videoId: _videoId,
            playerVars: { controls: 1, showinfo: 0, start:0, autoplay:1, autoHide:1 },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });




        function onPlayerReady(event)
        {
            TweenMax.to(".video_base",.7, {alpha:1});
            TweenMax.to("#video_player",.7, {alpha:1, onComplete:function()
            {
                event.target.playVideo();
            }});
        }


        //var done = false;
        function onPlayerStateChange(event)
        {
            /*
             if (event.data == YT.PlayerState.PLAYING && !done)
             {
             //setTimeout(stopVideo, 6000);
             //done = true;
             }
             */
            if(event.data == YT.PlayerState.ENDED)
            {
                closeVideo();
            }
        }

        /*

         function stopVideo() {
         player.stopVideo();
         }
         */
    }

    function closeVideo(event)
    {
        TweenMax.to(_coverDom,.5, {alpha:0});
        TweenMax.to(".video_base",.5, {alpha:0});
        TweenMax.to("#video_player",.5, {alpha:0, onComplete:function()
        {
            _player.stopVideo();
            _player.destroy();
            $(_coverDom).detach();
            $("#video_player").detach();
            $(".video_base").detach();
            //SceneAnime.instance.backToMap(_cb_after_close);
            _isOn = false;

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
        var sizeObj = MathHelper.getSize_contain(width-bleed, height-bleed, 990, 742);

        $("#video_player").width(sizeObj.width).height(sizeObj.height).css("margin-left", -sizeObj.width *.5 + "px").css("margin-top", -sizeObj.height *.5 + "px");


        sizeObj.width += 10;
        sizeObj.height += 10;
        $(".video_base").width(sizeObj.width-2).height(sizeObj.height-2).css("margin-left", -sizeObj.width *.5 + "px").css("margin-top", -sizeObj.height *.5 + "px");

    };


}());
