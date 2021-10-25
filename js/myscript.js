 var test_dingdingUrl = "https://oapi.dingtalk.com/robot/send?access_token=f8858b0b1acd8df3a3a1de8b08bfc467714c289c77c53026e0832ed86dbdd0ae";
 var delivery_dingdingUrl = "https://oapi.dingtalk.com/robot/send?access_token=4253c460fb22d30f0d34b4d34efb80d2761b5518f2c9ff2730e7ed6513492bb0";
 var hp_dingdingUrl = "https://oapi.dingtalk.com/robot/send?access_token=1a3d8bfb6fd2e0725c31b548e1f0a0cc893d549b2f14d20677f1b535b8e53b09"
 var m = new Map([['刘新红',13958170200],['陆丹',17767106422],['江彪',13777842105],['林鑫炳',17326081068],['刘汝锋',15901238647],['苏美玲',15955179728],['彭义娟',18055169128],['胡杭杰',15657168150],['屈志艳',18042317735],['鲁伟',15868413307],['胡韦韦',18655156383],['陶俊',18814829567],['史欣月',17826817151],['傅月倩',18758032500],['储祎飞',15205813799],['胡杨',19157826865],['雷元',13805759436],['余薇',13754329360],['张培',18968046019],['静静',15765594933],['陈瑞娜',13989874672],['李攀',15010079202],['沈杨',13181880805],['赵明',15336531709],['彭路路',18100180212],['朱天鹏',18869983989],['顾庆文',19829865725],['彭青畅',17788575521],['伍斌溢',19906795899],['张成',13456859397],['章帆',17376563165],['郭书运',17606412723],['于日晖',15372066645],['石成明',17681888587]]);

$(function () {
    isSend();

    //提交缺陷
    $('#_view').click(function () {
        localStorage.setItem('preUrl', window.location.href);
    });

    //bug状态流转
    $('#update_status_btn').click(function (){
        localStorage.setItem('preUrl', window.location.href);
    });

    //通过状态变更
    $('a[workflow-status-change=entityViewStatusChange]').click(function (){
        localStorage.setItem('preUrl', window.location.href);
    })

    //从缓存拿上个页面地址进行对比，并进行发送
    async function isSend() { 
        var _preUrl = localStorage.getItem('preUrl');
        var _referrer = document.referrer;
        console.log(_preUrl,_referrer)
        if (_preUrl == _referrer) {
            //项目名称
            var _projectName = $('#hd > div.current-project-area > span').attr('title');
            //软件平台
            var _bugModule = $('#ContentPlatform').attr('data-editable-value');
            //优先级
            var _bugPriority = $('#ContentPriority').attr('data-editable-value');
            //严重程度
            var _bugSeverity = $('#ContentSeverity').attr('data-editable-value');
            //bug状态
            var _bugStatus = $('a[workflow-status-change=entityViewStatusChange]').attr('title');
            //创建者
            var _bugReporter = $('#ContentReporter').attr('title');

            var _storyCategory = $('#ContentCategory').attr('data-editable-value');
            var _storyStatus = $('a[workflow-status-change=entityViewStatusChange]').attr('title');

            //是否需要验收
            var _acceptance = $('#Content是否需要验收 > span').text();
            console.log(acceptance)

            //类型bug或story
            if (location.href.indexOf('bugs')>=0) {
                _type = 'bug'
            }
            else if (location.href.indexOf('stories')>=0)
            {
                _type = 'story'

            }
            //console.log(_type,location.href)

            if(_projectName == '线上问题记录库' ){
                dingdingUrl = hp_dingdingUrl
                if(_bugStatus == "问题已解决" || _bugStatus == "问题待确认" || _bugStatus == "问题待观察" || _bugStatus == "待反馈方回复" || _bugStatus == "问题解决中" || _bugStatus == "转 需求/bug"){
                    //console.log(_bugStatus)
                    sendingMsg(await setBugParams(),dingdingUrl)
                }
            }

            if(_storyStatus == '已测试待验收' || _storyStatus == '已发布' || _type == 'story' || _acceptance != '不需要验收' ){
                dingdingUrl = hp_dingdingUrl
                sendingMsg(await setStoryParams(),dingdingUrl)

            }
        
            /*
            if(_bugModule == '外卖-调度系统'){
                dingdingUrl = delivery_dingdingUrl
            }

            if(_storyCategory == "调度系统"){
                dingdingUrl = delivery_dingdingUrl
            }

            //根据bug等级、状态、优先级决定是否进行发送钉钉
            if(_bugSeverity == "致命" || _bugSeverity == "严重" || _bugPriority == "紧急" || _bugPriority == "高"){
                if(_bugStatus != "已关闭" && _bugStatus != "接受/处理" ){
                    sendingMsg(await setBugParams(),dingdingUrl)
                }
            }
            */
            localStorage.removeItem('preUrl');
        }
    }

    async function setBugParams(){
        var _projectName = $('#hd > div.current-project-area > span').attr('title');
        var _bugUrl = getBugUrl(location.href);
        var _bugTitle = $('#bug_title_view .editable-value').attr('title');
        var _bugPriority = $('#ContentPriority').attr('data-editable-value');
        var _bugSeverity = $('#ContentSeverity').attr('data-editable-value');
        var _bugModule = $('#ContentPlatform').attr('data-editable-value');
        var _bugStatus = $('a[workflow-status-change=entityViewStatusChange]').attr('title');
        var _bugOwners = $('#ContentCurrentOwner').text();
        _bugOwners = _bugOwners.replace(/\(.*?\)/g,'');
        var _bugReporter = $('#ContentReporter').text();
        _bugReporter = _bugReporter.replace(/\(.*?\)/g,'');
        var _bugPriority = $('#ContentPriority').attr('data-editable-value');
        var _bugSeverity = $('#ContentSeverity').attr('data-editable-value');
        if(_bugStatus == '问题已解决'){
            var _mobileList =await getMobiles(_bugReporter);
        }else{
            var _mobileList =await getMobiles(_bugOwners);
        }

        var params = {
            "msgtype": "text",
            "text": {
            "content": "BUG:" + _bugTitle + 
            //"\n项目名称:" + _projectName + 
            //"\n软件平台:" + _bugModule + 
            "\n状态:" + _bugStatus + 
            "\n优先级:" + _bugPriority + 
            //"\n级别:" + _bugSeverity + 
            "\n链接:" + _bugUrl
            },
            "at":{
                "atMobiles": _mobileList,
                "isAtAll": false
            }

        };
        /*
        var params = {
            "msgtype":"markdown",
            "markdown":{
                "title":"TAPD BUG",
                "text":"BUG:" {_bugTitle}
                 "\n状态:" +<font color=#FF0000 size=6 face="黑体">{_bugStatus} </font>+
                 "\n链接:" + _bugUrl
                },
                "at":{
                    "atMobiles": _mobileList,"isAtAll": false
                }
            }
        }
        */
        return params;
    }

    async function setStoryParams(){
        //var _storyUrl = getBugUrl(location.href);
        //需求连接
        var _storyUrl = getStoryUrl(location.href);
        //需求标题
        var _storyTitle = $('#story_name_view .editable-value').attr('title');
        //需求连接
        // var _storyUrl = $('#title-copy-btn-new').attr('data-clipboard-text')
        // //需求标题
        // var _storyTitle = $('#story_name_view .editable-value').attr('title');
        //需求状态
        var _storyStatus = $('a[workflow-status-change=entityViewStatusChange]').attr('title');
        var _bugOwners = $('#ContentCreatedBy').text();
        _bugOwners = _bugOwners.replace(/\(.*?\)/g,'');
        var _mobileList =await getMobiles(_bugOwners);
        console.log(_storyUrl,_storyTitle,_storyStatus,_bugOwners,_mobileList)
        if (_storyStatus == '已测试待验收'){
            var _storyRemind = "该需求已变更为【"+_storyStatus+"】,请预留时间及时验收。"
        }
        else if (_storyStatus == '已发布')
        {
            var _storyRemind = "该需求已变更为【"+_storyStatus+"】,请悉知。"
        }

        var params = {
            "msgtype": "text",
            "text": {
            "content": "需求:" + _storyTitle + 
            "\n链接:" + _storyUrl+
            "\n状态:" +_storyStatus+
            "\n"+_storyRemind
            },
            "at":{
                "atMobiles": _mobileList,
                "isAtAll": false
            }

        };
        return params;
    }

    //发送消息XMLHTTP
    function sendingMsg(params,dingdingUrl) {
        if (params == 0){
            return;
        }
         chrome.runtime.sendMessage({ type: 1, name: "推送钉钉消息", msg:{url:dingdingUrl, params:JSON.stringify(params)} }, function (response) {
            console.log(response)
        });
    }
    //拼接bug URL
    function getBugUrl(url){
        var tmpList1 = splitStr(url,"?");
        var tmpList2 = splitStr(tmpList1[1],"&");
        var bugUrl = tmpList1[0] + "?";
        for(var i=0;i<tmpList2.length;i++){
            console.log(tmpList2[i]);
            if(tmpList2[i].match("bug_id=")){
                bugUrl = bugUrl + tmpList2[i];
                break;
            }
        }
        return bugUrl;
    }
    //拼接story URL
    function getStoryUrl(url){
        console.log(url)
        if (url.indexOf("?") >= 0){
            var tmpList1 = splitStr(url,"?");
            var tmpList2 = splitStr(tmpList1[1],"&");
            var storyUrl = tmpList1[0];
        }
        else
        {
             var storyUrl = url
        }
        
        //var storyUrl = tmpList1[0] + "?";
        // for(var i=0;i<tmpList2.length;i++){
        //     console.log(tmpList2[i]);
        //     if(tmpList2[i].match("bug_id=")){
        //         bugUrl = bugUrl + tmpList2[i];
        //         break;
        //     }
        // }
        return storyUrl;
    }
    //获取处理人联系电话
    async function getMobiles(bugOwners){
        var mobileList = splitStr(bugOwners,";").filter((v) => v)
        for(let i=0;i<mobileList.length;i++){
            //后端封装了个简单的接口，用于获取通知人的电话
            //url='http://easytest.yzw.cn/user/getPhone?tapdUserAccount='+mobileList[i];
            //mobileList[i] = await getMobile(url);
            mobileList[i] = await m.get(mobileList[i]);
        }
        return mobileList;
    }
    //单个获取电话号码
    async function getMobile(url){
        return await fetch(url).then(response=>response.text())
    }

    //字符串解析分割
    function splitStr(str,regx){
        var result = str.split(regx);
        return result;
    }

});
