 var test_dingdingUrl = "https://oapi.dingtalk.com/robot/send?access_token=f8858b0b1acd8df3a3a1de8b08bfc467714c289c77c53026e0832ed86dbdd0ae";
 var delivery_dingdingUrl = "https://oapi.dingtalk.com/robot/send?access_token=4253c460fb22d30f0d34b4d34efb80d2761b5518f2c9ff2730e7ed6513492bb0";
 var hp_dingdingUrl = "https://oapi.dingtalk.com/robot/send?access_token=1a3d8bfb6fd2e0725c31b548e1f0a0cc893d549b2f14d20677f1b535b8e53b09"
 var userDict = {
     '刘新': 13958170200,
     '陆丹': 17767106422,
     '江彪': 13958170200,
     '林鑫炳': 17326081068,
     '刘汝锋': 15901238647,
     '苏美玲': 15955179728,
     '彭义娟': 18055169128,
     '胡杭杰': 15657168150,
     '屈志艳': 18042317735,
     '鲁伟': 15868413307,
     '胡韦韦': 18655156383,
     '陶俊': 18814829567,
     '史欣月': 17826817151,
     '傅月倩': 18758032500,
     '储祎飞': 15205813799,
     '胡杨': 19157826865,
     '雷元': 13805759436,
     '余薇': 13754329360,
     '张培': 18968046019,
     '静静': 15765594933,
     '陈瑞娜': 13989874672,
     '李攀': 15010079202,
     '沈杨': 13181880805,
     '赵明': 15336531709,
     '彭路路': 18100180212,
     '朱天鹏': 18869983989,
     '顾庆文': 19829865725,
     '彭青畅': 17788575521,
     '伍斌溢': 19906795899,
     '张成': 13456859397,
     '章帆': 17376563165,
     '郭书运': 17606412723,
     '于日晖': 15372066645,
     '石成明': 17681888587,
     '金杨': 18611175191,
     '李菁菁': 18721123304,
     '王良丹': 18767167565,
     '刘佳佳': 18611175191,
     '徐可及': 18626860380,
     '汪琼雅': 17705812286,
     '陈芳Sunrise': 15669066676,
     '刘静雅': 17620472116,
     '葛东杰': 18758019277,
     '顾桃丽': 15168379715,
     '潘俊杰': 18657192015,
     '曾嘉晨': 17816069791,
     '吴波': 13185069198,
     '李一方': 18070509496,
     '王昌': 18057114192,
     '石金远': 18368028353,
     '石昊天': 15067898097,
     '李静盈': 15382312330,
     '余新官': 15906697764
 };
 var mobileList = new Array()


 if (location.href.indexOf('bugs/view') >= 0) {
     //类型
     var _eventType = 'Bug'
     //项目名称
     var _projectName = $('#hd > div.current-project-area > span').attr('title');
     //bug状态
     var _bugStatus = $('a[workflow-status-change=entityViewStatusChange]').attr('title');
     //bug标题
     //var _bugTitle = $('#bug_title_view .editable-value').attr('title');
     var _titleUrl = $('#title-copy-btn-new').attr('data-clipboard-text');
     var _bugTitle = _titleUrl.match(/【(.*)】/)[1];
     //bugURL
     var _bugUrl = _titleUrl.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/)[1];
     //bugID
     var _bugId = 'ID' + _bugUrl.substring(_bugUrl.length - 7)
     //优先级
     var _bugPriority = $('#ContentPriority').attr('data-editable-value');
     //严重程度
     var _bugSeverity = $('#ContentSeverity').attr('data-editable-value');
     //bug处理人
     var _bugOwners = $('#ContentCurrentOwner').text();
     _bugOwners = _bugOwners.replace(/\(.*?\)/g, '');
     //bug创建人
     var _bugReporter = $('#ContentReporter').text();
     _bugReporter = _bugReporter.replace(/\(.*?\)/g, '');
     var _copyCont = _eventType + '\t' + _bugId + '\t' + _bugTitle + '\t\t\t\t\t\t' + _bugUrl

 } else if (location.href.indexOf('stories/view') >= 0) {
     //类型
     var _eventType = '需求'
     //项目名称
     var _projectName = $('#hd > div.current-project-area > span').attr('title');
     //需求状态
     var _storyStatus = $('a[workflow-status-change=entityViewStatusChange]').attr('title');
     //是否需要验收
     var _acceptance = $('#Content是否需要验收 > span').text();
     //需求标题
     //var _storyTitle = $('#story_name_view .editable-value').attr('title');
     var _titleUrl = $('#title-copy-btn-new').attr('data-clipboard-text');
     var _storyTitle = _titleUrl.match(/【(.*)】/)[1];
     //需求URL
     var _storyUrl = _titleUrl.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/)[1];
     //需求ID
     var _storyId = 'ID' + _storyUrl.substring(_storyUrl.length - 7)
     //需求创建人
     var _bugCreaters = $('#ContentCreatedBy').text();
     _bugCreaters = _bugCreaters.replace(/\(.*?\)/g, '');
     //需求   ID1020338   【搜索结果页】筛选排序规则优化 李攀  贾三丰 feature/ID1020332_sort_youhua   无   李菁菁 https://www.tapd.cn/52668357/prong/stories/view/1152668357001020338&from=worktable_title
     var _copyCont = _eventType + '\t' + _storyId + '\t' + _storyTitle + '\t\t\t\t' +_bugCreaters + '\t' + _storyUrl
 };
 chrome.runtime.onMessage.addListener(
     function(request, sender, sendResponse) {
         if (request.command == "release-copy") {
            copyTextToClipboard(_copyCont)
             sendResponse({
                 result: _copyCont
             });
         };
         return true;
     });
function copyTextToClipboard(text) {
  var copyFrom = document.createElement("textarea");
  copyFrom.textContent = text;
  document.body.appendChild(copyFrom);
  copyFrom.select();
  document.execCommand('copy');
  copyFrom.blur();
  document.body.removeChild(copyFrom);
}
 $(function() {
     isSend();

     //底部提交缺陷
     $('#_view').click(function() {
         localStorage.setItem('preUrl', window.location.href);
     });

     //底部状态流转
     $('#update_status_btn').click(function() {
         localStorage.setItem('preUrl', window.location.href);
     });

     //左侧状态变更
     $('a[workflow-status-change=entityViewStatusChange]').click(function() {
         localStorage.setItem('preUrl', window.location.href);
     });
     //列表状态变更
     $('a[workflow-status-change=storieslistResponse]').each(function() {
         undefined
         $(this).click(function() {
             undefined
             localStorage.setItem('preUrl', window.location.href);
             var _storyStatus = $(this).attr('title');
             var _storyTitle = $(this).parent().parent().find('.j-story-title-link-proxy').attr('title')
             var _storyUrl = $(this).parent().parent().find('.j-story-title-link-proxy').attr('href')
             var_
             console.log(_storyStatus, _storyTitle, _storyUrl, _referrer)
         });
     });
     //从缓存拿上个页面地址进行对比，并进行发送
     async function isSend() {
         var _preUrl = localStorage.getItem('preUrl');
         var _referrer = document.referrer;
         if (_preUrl == _referrer) {

             //类型bug或story
             if (_eventType == 'Bug') {

                 if (_projectName == '线上问题记录库') {
                     dingdingUrl = hp_dingdingUrl
                     if (_bugStatus == "问题已解决" || _bugStatus == "问题待确认" || _bugStatus == "问题待观察" || _bugStatus == "待反馈方回复" || _bugStatus == "问题解决中" || _bugStatus == "转 需求/bug") {
                         console.log(_bugStatus)
                         sendingMsg(await setBugParams(), dingdingUrl)
                     };
                 };
             } else if (_eventType == '需求') {

                 if (_storyStatus == '已测试待验收' || _storyStatus == '已发布') {
                     if (_acceptance != '不需要验收') {
                         dingdingUrl = hp_dingdingUrl
                         console.log(_storyStatus)
                         sendingMsg(await setStoryParams(), dingdingUrl)
                     };
                 };
             };
             localStorage.removeItem('preUrl');
         }
     }

     async function setBugParams() {

         if (_bugStatus == '问题已解决') {
             var _mobileList = await getMobiles(_bugReporter);
         } else {
             var _mobileList = await getMobiles(_bugOwners);
         }

         var params = {
             "msgtype": "text",
             "text": {
                 "content": "BUG:" + _bugTitle +
                     "\n状态:" + _bugStatus +
                     "\n优先级:" + _bugPriority +
                     "\n链接:" + _bugUrl
             },
             "at": {
                 "atMobiles": _mobileList,
                 "isAtAll": false
             }

         };
         return params;
     }

     async function setStoryParams() {
         var _mobileList = await getMobiles(_bugCreaters);
         console.log(_storyUrl, _storyTitle, _storyStatus, _bugCreaters, _mobileList)
         if (_storyStatus == '已测试待验收') {
             var _storyRemind = "该需求已变更为【" + _storyStatus + "】,请预留时间及时验收。"
         } else if (_storyStatus == '已发布') {
             var _storyRemind = "该需求已变更为【" + _storyStatus + "】,请悉知。"
         }

         var params = {
             "msgtype": "text",
             "text": {
                 "content": "需求:" + _storyTitle +
                     "\n链接:" + _storyUrl +
                     "\n状态:" + _storyStatus +
                     "\n" + _storyRemind
             },
             "at": {
                 "atMobiles": _mobileList,
                 "isAtAll": false
             }

         };
         return params;
     }

     //发送消息XMLHTTP
     function sendingMsg(params, dingdingUrl) {
         if (params == 0) {
             return;
         }
         chrome.runtime.sendMessage({
             type: 1,
             name: "推送钉钉消息",
             msg: {
                 url: dingdingUrl,
                 params: JSON.stringify(params)
             }
         }, function(response) {
             console.log(response)
         });
     }
     //拼接bug URL
     function getBugUrl(url) {
         var tmpList1 = splitStr(url, "?");
         var tmpList2 = splitStr(tmpList1[1], "&");
         var bugUrl = tmpList1[0] + "?";
         for (var i = 0; i < tmpList2.length; i++) {
             console.log(tmpList2[i]);
             if (tmpList2[i].match("bug_id=")) {
                 bugUrl = bugUrl + tmpList2[i];
                 break;
             }
         }
         return bugUrl;
     }
     //拼接story URL
     function getStoryUrl(url) {
         console.log(url)
         if (url.indexOf("?") >= 0) {
             var tmpList1 = splitStr(url, "?");
             var tmpList2 = splitStr(tmpList1[1], "&");
             var storyUrl = tmpList1[0];
         } else {
             var storyUrl = url
         }

         return storyUrl;
     }
     //获取处理人联系电话
     async function getMobiles(bugOwners) {
         var userList = splitStr(bugOwners, ";").filter((v) => v)
         for (let i = 0; i < userList.length; i++) {

             if (userList[i] in userDict) {
                 //获取本地mobile
                 mobileList[i] = await userDict[userList[i]];
                 console.log('获取本地mobile：' + userList[i] + '-' + mobileList[i])
             } else {
                 //后端封装了个简单的接口，用于获取通知人的电话
                 url = 'https://47.114.109.149/user/getPhone?tapdUserAccount=' + userList[i];
                 mobileList[i] = await getMobile(url);
                 console.log('获取网络mobile：' + userList[i] + '-' + mobileList[i])
             }
         }

         return mobileList;
     }
     //单个获取电话号码
     async function getMobile(url) {
         //return await fetch(url).then(response=>response.text()).catch(e => console.log("Oops,error",e))
         return await fetch(url).then(response => response.text()).catch(e => console.log("Oops,error", e));
     }

     //字符串解析分割
     function splitStr(str, regx) {
         var result = str.split(regx);
         return result;
     }

 });