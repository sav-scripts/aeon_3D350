(function ()
{

    var _p = window.Spec = {};

    var $doms = {};

    _p.init = function ()
    {
        $doms.container = $("#spec_block");
        $doms.content = $(".spec_content");

        $doms.content[0].init =
        {
            w:1200,
            h:1973,
            ratio:1200/1973
        };
    };

    _p.onResize = function (width, height)
    {
        if(width <= Main.settings.cWidth)
        {
            var v = $doms.content[0].init;
            var w = width,
                h = width/ v.ratio,
                ml = -w*.5,
                mt = -h*.5;
            $doms.content.css("width", w).css("height", h).css("margin-left", ml).css("margin-top", mt);

            if(h > height)
            {
                $doms.container.css("height", h);
            }
            else
            {
                $doms.container.css("height", "100%");
            }
        }
        else
        {
            $doms.content.css("width", "").css("height", "").css("margin-left", "").css("margin-top", "");
            $doms.container.css("height", "");
        }
    };

}());