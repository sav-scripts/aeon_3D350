(function ()
{

    var _p = window.Share = {};

    var _isInit = false;
    var $doms = {};

    var _isFormOpen = false;

    var _formHeight = 150;
    var _isLocking = false;

    var _isRuleShowing = false;

    _p.init = function ()
    {
        $doms.container = $("#share_block");
        $doms.btnShare = $doms.container.find(".share_btn_start");
        $doms.group = $doms.container.find(".share_group");
        Helper.getInitValue($doms.group[0]);

        $doms.checkBox = $("#share_rule_check");

        $doms.ruleTrigger = $(".share_rulecheck_text").find("span");

        $doms.ruleTrigger.css("curser", "pointer").bind("click", function()
        {
           _p.switchRule(true);
        });


        $doms.formContainer = $doms.container.find(".share_form_container");

        $doms.name = $doms.container.find("#share_field_name");
        $doms.phone = $doms.container.find("#share_field_phone");
        $doms.address = $doms.container.find("#share_field_address");
        $doms.county = $doms.container.find("#share_field_county");
        $doms.zone = $doms.container.find("#share_field_zone");

        $doms.rule = $("#share_rule_block");
        $doms.ruleContent = $(".share_rule");
        $doms.ruleWrapper = $(".share_rule_wrapper");
        $doms.ruleClose = $(".share_btn_close");

        $doms.ruleClose.bind("click", function()
        {
           _p.switchRule(false);
        });


        $doms.formContainer.css("display", "block");
        FormHelper.completeCounty($doms.county, $doms.zone, "", "", false);
        $doms.formContainer.css("display", "none");

        $doms.btnShare.bind("click", function()
        {
            if(!_isFormOpen)
            {
                //_p.openForm();
                _p.tryShare(function()
                {
                    _p.openForm();
                });
            }
            else
            {
                _p.trySend(function()
                {
                    clearForm();
                    _p.closeForm();
                });
            }
        });

        _isInit = true;
    };

    _p.switchRule = function(showIt)
    {
        if(_isRuleShowing == showIt) return;
        _isRuleShowing = showIt;

        if(_isRuleShowing)
        {
            $doms.rule.css("display", "block");
            _p.onResize($(window).width(), $(window).height());
        }
        else
        {
            $doms.rule.css("display", "none");
        }
    };

    _p.trySend = function(cb)
    {
        var formObj = checkForm();

        if(formObj) execute(formObj);

        function execute(params)
        {
            SimplePreloading.show();

            if(Main.isLocal)
            {
                SimplePreloading.hide();
                alert("您的報名資料已送出成功, 感謝您的參予.");
                clearForm();
            }
            else
            {
                var url = "/api/send_share.php";
                var method = "POST";

                //SimplePreloading.setProgress("");
                //SimplePreloading.show();

                $.ajax
                ({
                    url: url,
                    type: method,
                    data: params,
                    dataType: "json"
                })
                .done(function (response)
                {
                    //if(closeLoading || (closeLoading == null && _defaultCloseLoading)) SimplePreloading.hide();

                    console.log("response = " + JSON.stringify(response));

                    if (response.res == "ok")
                    {
                        alert("您的報名資料已送出成功, 感謝您的參予.");
                        clearForm();
                        if(cb) cb.apply();
                    }
                    else
                    {
                        alert(response.res);
                    }
                    SimplePreloading.hide();

                })
                .fail(function ()
                {
                    alert("無法取得伺服器資料");
                    SimplePreloading.hide();
                });
            }
        }
    };

    function clearForm()
    {
        $doms.county.prop('selectedIndex', 0);
        FormHelper.completeZone($doms.county, $doms.zone);

        $doms.checkBox.attr("checked", false);

        $doms.name.val("");
        $doms.phone.val("");
        $doms.address.val("");
    }

    function checkForm()
    {
        if(!$doms.checkBox.is(":checked")){ alert('您必須先閱讀並同意活動辦法'); return; }

        var formObj={};
        var dom;

        dom = $doms.name[0];
        if(PatternSamples.onlySpace.test(dom.value))
        {
            alert('請輸入您的名稱'); dom.focus(); return;
        }else formObj.name = dom.value;

        dom = $doms.phone[0];
        if(!PatternSamples.phone.test(dom.value))
        {
            alert('請輸入正確的手機號碼'); dom.focus(); return;
        }
        else formObj.phone = dom.value;


        dom = $doms.address[0];
        if(PatternSamples.onlySpace.test(dom.value))
        {
            alert('請輸入您的地址'); dom.focus(); return;
        }
        else formObj.address_detail = dom.value;

        var addressObj = FormHelper.getAddressValue($("#share_field_county"), $("#share_field_zone"));

        if(addressObj.county && addressObj.zone)
        {
            formObj.address_county = addressObj.county;
            formObj.address_zone = addressObj.zone;
        }
        else
        {
            alert('請選擇您居住的區域'); return;
        }


        return formObj;
    }

    _p.tryShare = function(cb)
    {
        SimplePreloading.show();

        var urlPath = Utility.getPath();

        var url = urlPath + "misc/fb_share.jpg";

        var params =
        {
            method: 'feed',
            name: "Aeon 3D-350 匹配你的閱歷非凡",
            picture: url,
            caption: "AEON 3D350",
            description: "Aeon 3D-350新上市！欲搶先試乘體驗3D-350騎乘感受，速上新車官網登錄！",
            link: urlPath
        };

        FB.ui(params, function(response)
        {
            //console.log("response = " + JSON.stringify(response));
            if (response && response.post_id)
            {
                if(cb) cb.apply();
            }
            else
            {
                alert("您必須要分享才能參加活動喔.");
            }

            SimplePreloading.hide();
        });

        //if(cb) cb.apply();
    };

    _p.openForm = function()
    {
        if(_isFormOpen || _isLocking) return;

        $doms.btnShare.toggleClass("formMode", true);

        $doms.formContainer.css("height", 0).css("display", "block");

        var offset = Main.currentMode == "small"? 0: -50;

        var tl = new TimelineMax();
        tl.to($doms.group,.6, {height:$doms.group[0].init.h + _formHeight, marginTop:$doms.group[0].init.mt+offset}, 0);
        tl.to($doms.formContainer,.6, {height:_formHeight}, 0);
        tl.add(function()
        {
            _isFormOpen = true;
            _isLocking = false;
        });
    };

    _p.closeForm = function()
    {
        if(!_isFormOpen || _isLocking) return;

        $doms.btnShare.toggleClass("formMode", false);

        var tl = new TimelineMax();
        tl.to($doms.group,.6, {height:$doms.group[0].init.h, marginTop:$doms.group[0].init.mt}, 0);
        tl.to($doms.formContainer,.6, {height:0}, 0);
        tl.add(function()
        {
            _isFormOpen = false;
            _isLocking = false;

            $doms.formContainer.css("height", 0).css("display", "none");
        });
    };

    _p.onResize = function (width, height)
    {
        if(!_isInit) return;

        _formHeight = Main.currentMode == "small"? 300: 150;


        var bleed = 40;
        var padding = 20;
        var rawWidth = 800;

        var minWidth = bleed + padding*2 + rawWidth;

        if(width < minWidth)
        {
            var tw = width - 40 - padding*2;
            $doms.ruleContent.css("width", tw).css("margin-left", -tw *.5 - 20);

        }

        var minHeight = bleed + padding*2 + $doms.ruleWrapper.height();

        //console.log($doms.ruleWrapper.height());
        if(height < minHeight)
        {
            var th = height - 40 - padding*2;
            $doms.ruleContent.css("height", th).css("overflow-y", "auto");
        }
        else
        {
            $doms.ruleContent.css("height", "").css("overflow-y", "");
        }

        $doms.ruleContent.css("margin-top", -$doms.ruleContent.height() *.5 - 20 + "px");

        //_p.closeForm();


    };

}());