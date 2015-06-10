(function ()
{

    var _p = window.Sign = {};

    var $doms = {};

    var _dateCombo;

    var _checkState =
    {
        licence: 0,
        friend: 0
    };

    _p.init = function ()
    {
        $doms.container = $("#sign_block");
        $doms.formContainer = $doms.container.find("> .form_container");

        $doms.year = $doms.container.find("#sign_field_year");
        $doms.month = $doms.container.find("#sign_field_month");
        $doms.day = $doms.container.find("#sign_field_day");

        $doms.licenceYes = $doms.container.find("#sign_licence_yes");
        $doms.licenceNo = $doms.container.find("#sign_licence_no");
        $doms.friendYes = $doms.container.find("#sign_friend_yes");
        $doms.friendNo = $doms.container.find("#sign_friend_no");

        $doms.name = $doms.container.find("#sign_field_name");
        $doms.pid = $doms.container.find("#sign_field_pid");
        $doms.phone = $doms.container.find("#sign_field_phone");
        $doms.email = $doms.container.find("#sign_field_email");

        $doms.event = $doms.container.find("#sign_field_event");
        $doms.time = $doms.container.find("#sign_field_time");
        $doms.type = $doms.container.find("#sign_field_type");

        $doms.moreText = $doms.container.find(".sign_more_text");

        $doms.btnSend = $doms.container.find(".sign_btn_send");

        completeCheckbox($doms.licenceYes, $doms.licenceNo, "licence");
        completeCheckbox($doms.friendYes, $doms.friendNo, "friend", switchTypeField);

        _dateCombo = new DateCombo($doms.year[0], $doms.month[0], $doms.day[0]);

        $doms.btnSend.bind("click", function()
        {
            trySend();
        });

        clearForm();

        disableField($doms.name);
        disableField($doms.pid);
        disableField($doms.phone);
        disableField($doms.email);

    };

    function disableField($dom)
    {
        $dom.on("focus", function()
        {
            $dom.blur();
            alert("所有場次均額滿, 感謝您的參予.");
        });

    }

    function switchTypeField(isShow)
    {
        if(isShow)
        {
            $doms.moreText.css("display", "block");
            $doms.type.css("display", "block");
        }
        else
        {
            $doms.moreText.css("display", "none");
            $doms.type.css("display", "none");
        }
    }

    function completeCheckbox($yesDom, $noDom, key, cbOnChange)
    {
        $yesDom.find("input").bind("change", function()
        {
            $noDom.find("input")[0].checked = !this.checked;
            _checkState[key] = this.checked? "是": "否";

            if(cbOnChange) cbOnChange.apply(null, [this.checked]);
        });

        $noDom.find("input").bind("change", function()
        {
            $yesDom.find("input")[0].checked = !this.checked;
            _checkState[key] = this.checked? "否": "是";

            if(cbOnChange) cbOnChange.apply(null, [!this.checked]);
        });
    }

    function trySend()
    {
        //SimplePreloading.show();


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
                var url = "/api/send_sign.ashx";
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
                    }
                    else if(response.res == "full")
                    {
                        alert("很抱歉，你選擇的場次已經額滿，煩請請重新選擇其他 場次/時段，感謝你的配合！");
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

    }


    function checkForm()
    {
        var formObj={};
        var dom;

        dom = $doms.name[0];
        if(PatternSamples.onlySpace.test(dom.value))
        {
            alert('請輸入您的名稱'); dom.focus(); return;
        }else formObj.name = dom.value;

        /*
        dom = $doms.pid[0];
        if(!Utility.checkPID(dom.value))
        {
            alert('請輸入正確的身分證字號'); dom.focus(); return;
        }else formObj.sid = dom.value;
        */

        dom = $doms.pid[0];
        if(PatternSamples.onlySpace.test(dom.value))
        {
            alert('請輸入您的身分證字號'); dom.focus(); return;
        }else formObj.sid = dom.value;

        formObj.birth = _dateCombo.getDateString("/");
        if(formObj.birth == null)
        {
            alert("請輸入您的生日");
            return;
        }


        dom = $doms.phone[0];
        if(!PatternSamples.phone.test(dom.value))
        {
            alert('請輸入正確的手機號碼'); dom.focus(); return;
        }
        else formObj.phone = dom.value;

        dom = $doms.email[0];
        if(!PatternSamples.email.test(dom.value))
        {
            alert('請輸入正確的電子信箱'); dom.focus(); return;
        }
        else formObj.email = dom.value;

        formObj.q_event = $doms.event.val();
        if(formObj.q_event == "--")
        {
            alert("請選擇場次");
            return;
        }

        console.log(formObj.q_event);

        formObj.q_time = $doms.time.val();
        if(formObj.q_time == "--")
        {
            alert("請選擇時段");
            return;
        }

        console.log(formObj.q_time);

        if(_checkState.licence == 0)
        {
            alert("請勾選您是否有大型重機車駕照");
            return;
        }
        else
        {
            formObj.q_have_licence = _checkState.licence;
        }


        if(_checkState.friend == 0)
        {
            alert("請勾選您是否為AEON車友");
            return;
        }
        else
        {
            formObj.q_aeon_friend = _checkState.friend;
            if(_checkState.friend == "是")
            {

                formObj.q_aeon_type = $doms.type.val();
                if(formObj.q_aeon_type == "--")
                {
                    alert("請選擇您目前騎乘機型");
                    return;
                }
            }
        }

        return formObj;
    }

    function clearForm()
    {
        _dateCombo.reset();

        $doms.licenceYes.find("input").attr("checked", false);
        $doms.licenceNo.find("input").attr("checked", false);
        $doms.friendYes.find("input").attr("checked", false);
        $doms.friendNo.find("input").attr("checked", false);

        $doms.name.val("");
        $doms.pid.val("");
        $doms.phone.val("");
        $doms.email.val("");

        $doms.event.prop('selectedIndex', 0);
        $doms.time.prop('selectedIndex', 0);
        $doms.type.prop('selectedIndex', 0);

        switchTypeField(false);

        _checkState.licence = 0;
        _checkState.friend = 0;
    }



    _p.onResize = function (width, height)
    {
        var $dom = $doms.formContainer;
        var dom = $dom[0];

        if(Main.currentMode == "small")
        {
            $doms.container.css("height", "");
            $dom.css("top", "").css("margin-top", "");
        }
        else
        {
            if(!dom.init) Helper.getInitValue(dom);

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
        }

    };

}());