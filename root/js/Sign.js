(function ()
{

    var _p = window.Sign = {};

    var $doms = {};

    _p.init = function ()
    {
        $doms.container = $("#sign_block");
        $doms.formContainer = $doms.container.find("> .form_container");
        Helper.getInitValue($doms.formContainer[0]);

    };

    _p.onResize = function (width, height)
    {
        var $dom = $doms.formContainer;
        var dom = $dom[0];

        if(height < dom.init.h)
        {
            $doms.container.height(dom.init.h);
            $dom.css("top", 0).css("margin-top", 0);
        }
        else
        {
            $doms.container.height(height);
            $dom.css("top", "50%").css("margin-top", dom.init.mt);
        }
    };

}());