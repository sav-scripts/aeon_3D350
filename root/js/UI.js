(function ()
{

    var _p = window.RightMenu = {};

    var $doms = {};

    _p.init = function ()
    {
        $doms.container = $("#right_menu");

        var $buttons = $doms.container.find(".menu_button");

        $doms.btnIndex = $($buttons[0]);
        $doms.btnBrand = $($buttons[1]);
        $doms.btnATW = $($buttons[2]);
        $doms.btnFeature = $($buttons[3]);
        $doms.btnSpec = $($buttons[4]);
        $doms.btnColor = $($buttons[5]);
        $doms.btnWatch = $($buttons[6]);
        $doms.btnInfo = $($buttons[7]);
        $doms.btnCF = $($buttons[8]);
        $doms.btnDownload = $($buttons[9]);
        $doms.btnSign = $($buttons[10]);

        TweenMax.set($doms.container,{opacity:.5});

        $doms.container.bind("mouseover", function()
        {
            TweenMax.to($doms.container,.5,{opacity:1});
        });

        $doms.container.bind("mouseout", function()
        {
            TweenMax.to($doms.container,.5,{opacity:.5});
        });

        $doms.btnIndex.bind("click", function()
        {
            Main.toBlock("/Index");
        });

        $doms.btnBrand.bind("click", function()
        {
            Main.toBlock("/Brand");
        });

        $doms.btnATW.bind("click", function()
        {
            Main.toBlock("/ATW");
        });

        $doms.btnFeature.bind("click", function()
        {
            Main.toBlock("/Feature");
        });

        $doms.btnSpec.bind("click", function()
        {
            Main.toBlock("/Spec");
        });

        $doms.btnColor.bind("click", function()
        {
            Main.toBlock("/Color");
        });

        $doms.btnWatch.bind("click", function()
        {
            Main.toBlock("/Watch");
        });

        $doms.btnInfo.bind("click", function()
        {
            Main.toBlock("/Info");
        });

        $doms.btnDownload.bind("click", function()
        {
            ga("send", "pageview", "/Download");
            window.open("misc/download.pdf", "_blank");
            //ATWPop.playVideo();
        });

        $doms.btnCF.bind("click", function()
        {
            Main.toBlock("/CF");
        });

        $doms.btnSign.bind("click", function()
        {
            Main.toBlock("/Sign");
        });

    };

}());