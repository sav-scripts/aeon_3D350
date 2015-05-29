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
        Helper.getInitValue($doms.formContainer[0]);

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

    };

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
                var url = "api/send_sign.php";
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

        dom = $doms.pid[0];
        if(!checkID(dom.value))
        {
            alert('請輸入正確的身分證字號'); dom.focus(); return;
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

        formObj.q_time = $doms.time.val();
        if(formObj.q_time == "--")
        {
            alert("請選擇時段");
            return;
        }

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

    function checkID(idStr){
        // 依照字母的編號排列，存入陣列備用。
        var letters = ['A', 'B', 'C', 'D',
            'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M',
            'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
            'X', 'Y', 'W', 'Z', 'I', 'O'];
        // 儲存各個乘數
        var multiply = [1, 9, 8, 7, 6, 5,
            4, 3, 2, 1];
        var nums = new Array(2);
        var firstChar;
        var firstNum;
        var lastNum;
        var total = 0;
        // 撰寫「正規表達式」。第一個字為英文字母，
        // 第二個字為1或2，後面跟著8個數字，不分大小寫。
        var regExpID=/^[a-z](1|2)\d{8}$/i;
        // 使用「正規表達式」檢驗格式
        if (idStr.search(regExpID)==-1) {
            // 基本格式錯誤
            //alert("請仔細填寫身份證號碼");
            return false;
        } else {
            // 取出第一個字元和最後一個數字。
            firstChar = idStr.charAt(0).toUpperCase();
            lastNum = idStr.charAt(9);
        }
        // 找出第一個字母對應的數字，並轉換成兩位數數字。
        for (var i=0; i<26; i++) {
            if (firstChar == letters[i]) {
                firstNum = i + 10;
                nums[0] = Math.floor(firstNum / 10);
                nums[1] = firstNum - (nums[0] * 10);
                break;
            }
        }
        // 執行加總計算
        for(var i=0; i<multiply.length; i++){
            if (i<2) {
                total += nums[i] * multiply[i];
            } else {
                total += parseInt(idStr.charAt(i-1)) *
                multiply[i];
            }
        }
        // 和最後一個數字比對
        return (10 - (total % 10)) == lastNum;

    }

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