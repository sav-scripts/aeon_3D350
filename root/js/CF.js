(function ()
{

    var _p = window.CF = {};

    var $doms = {};

    var _player;

    _p.init = function ()
    {
        $doms.container = $("#cf_block");

        $doms.base = $(document.createElement("div"));
        $doms.base[0].className = "video_base";

        $doms.container.append($doms.base);



        var dom = document.createElement("div");
        dom.id = "cf_video";

        $doms.container.append(dom);

        _p.onResize();

        var width = $(dom).width();
        var height = $(dom).height();

        _player = new YT.Player('cf_video', {
            height: height,
            width: width,
            videoId: Main.videoID.cf,
            playerVars: { controls: 1, showinfo: 0, start:0, autoplay:0, autoHide:1 },
            events: {
                //'onStateChange': onPlayerStateChange,
                'onReady': onPlayerReady
            }
        });

        function onPlayerReady()
        {
            $("#cf_video")[0].className = "video_player";
        }
    };

    _p.onResize = function (width, height)
    {
        var bleedW = 100;
        var bleedH = 150;

        var menuWidth = $("#right_menu").width();

        //var sizeObj = MathHelper.getSize_contain(width-bleed, height-bleed, 1280, 720);
        var sizeObj = MathHelper.getSize_contain(width-bleedW - menuWidth, height-bleedH, 960, 720);

        $("#cf_video").width(sizeObj.width).height(sizeObj.height).css("margin-left", -sizeObj.width *.5 - menuWidth *.5 + "px").css("margin-top", -sizeObj.height *.5 + "px");

        sizeObj.width += 10;
        sizeObj.height += 10;
        $doms.base.width(sizeObj.width-2).height(sizeObj.height-2).css("margin-left", -sizeObj.width *.5 - menuWidth *.5 + "px").css("margin-top", -sizeObj.height *.5 + "px");
    };

}());