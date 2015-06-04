(function ()
{

    var _p = window.RightMenu = {};

    var $doms = {};

    var _isOpen = false;

    _p.init = function ()
    {
        $doms.container = $("#right_menu");
        $doms.group = $doms.container.find(".group");

        $doms.menuTrigger = $(".mobile_menu_trigger");

        //TweenMax.set($doms.group, {scale:.5, transformOrigin:"right top"});

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
        $doms.btnShare = $($buttons[10]);
        $doms.btnSign = $($buttons[11]);


        TweenMax.set($doms.container,{opacity:.5});

        $doms.container.bind("mouseover", function()
        {
            if(Main.currentMode != "large") return;
            TweenMax.to($doms.container,.5,{opacity:1});
        });

        $doms.container.bind("mouseout", function()
        {
            if(Main.currentMode != "large") return;
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

        $doms.btnShare.bind("click", function()
        {
            Main.toBlock("/Share");
        });

        $doms.menuTrigger.bind("click", function()
        {
            switchMenu(true);
        });
    };

    function switchMenu(openIt, duration, forceExecute)
    {
        if(_isOpen == openIt && !forceExecute) return;
        _isOpen = openIt;

        if(duration == null) duration = .6;

        if(_isOpen)
        {
            TweenMax.to($doms.container,duration,{right:0, onComplete:function()
            {
                $(window).bind("click", closeIt);

            }});
        }
        else
        {
            TweenMax.to($doms.container,duration,{right:-$doms.container.width()});
        }
    }

    function closeIt()
    {
        $(window).unbind("click", closeIt);

        switchMenu(false);

    }



    _p.onResize = function(width, height, changed, mode)
    {
        if(changed)
        {
            if(mode != "large")
            {
                TweenMax.set($doms.container,{opacity:1});
                $(window).unbind("click", closeIt);
                switchMenu(false, 0, true);
            }
            else
            {
                _isOpen = false;
                $(window).unbind("click", closeIt);
                $doms.container.css("right", "");
            }
        }
    };

}());