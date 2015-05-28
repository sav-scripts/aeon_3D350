(function ()
{

    var _p = window.RightMenu = {};

    var $doms = {};

    _p.init = function ()
    {
        var $buttons = $("#right_menu").find(".menu_button");

        $doms.btnIndex = $($buttons[0]);
        $doms.btnBrand = $($buttons[1]);
        $doms.btnATW = $($buttons[2]);
        $doms.btnFeature = $($buttons[3]);
        $doms.btnSpec = $($buttons[4]);
        $doms.btnColor = $($buttons[5]);
        $doms.btnWatch = $($buttons[6]);
        $doms.btnInfo = $($buttons[7]);
        $doms.btnDownload = $($buttons[8]);
        $doms.btnSign = $($buttons[9]);

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
        });

        $doms.btnSign.bind("click", function()
        {
            Main.toBlock("/Sign");
        });

    };

}());