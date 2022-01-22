
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
     //作者
     var _owner = $('#new_nav_avatar_div > a').attr('title')
     var _copyCont = _eventType + '\t' + _bugId + '\t' + _bugTitle + '\t'+_owner+'\t\t\t\t\t' + _bugUrl

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
     //作者
     var _owner = $('#new_nav_avatar_div > a').attr('title')
     //需求   ID1020338   【搜索结果页】筛选排序规则优化 李攀  贾三丰 feature/ID1020332_sort_youhua   无   李菁菁 https://www.tapd.cn/52668357/prong/stories/view/1152668357001020338&from=worktable_title
     var _copyCont = _eventType + '\t' + _storyId + '\t' + _storyTitle + '\t'+_owner+'\t\t\t\t' + _bugCreaters + '\t' + _storyUrl
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
     $("a[workflow-status-change=entityViewStatusChange]").click(function() {
         $("#tdialog-simple-iframe").on("load", function() {
             console.log("弹窗加载完成")
             $("#tdialog-simple-iframe").contents().find("#do-status").on("click", function() {
                 localStorage.setItem('preUrl', window.location.href);
                 console.log("弹窗确认按钮点击")
             })
         })
     })
     // $("#update-status").submint(function(){
     //    alert("表单提交")
     // })

     //列表状态变更
     $('a[workflow-status-change=storieslistResponse]').each(function() {
         undefined
         $(this).click(function() {
             undefined
             var _storyStatus = $(this).attr('title');
             var _storyTitle = $(this).parent().parent().find('.j-story-title-link-proxy').attr('title')
             var _storyUrl = $(this).parent().parent().find('.j-story-title-link-proxy').attr('href')
             //localStorage.setItem('preUrl', window.location.href);
             $("#tdialog-simple-iframe").on("load", function() {
                 console.log($("#tdialog-simple-iframe").length)
                 console.log($("#tdialog-simple-iframe").contents().find("#do-status").length)
                 $("#tdialog-simple-iframe").contents().find("#do-status").on("click", function() {
                     localStorage.setItem('preUrl', window.location.href);
                     console.log("弹窗确认按钮点击")
                 });
             });

             console.log(_storyStatus, _storyTitle, _storyUrl)
             //isSend();
         });
     });
     //从缓存拿上个页面地址进行对比，并进行发送
     async function isSend() {
         var _preUrl = localStorage.getItem('preUrl');
         var _referrer = document.referrer;
         console.log('_preUrl:' + _preUrl + '\n_referrer:' + _referrer)
         if (_preUrl == _referrer) {
             //类型bug或story
             if (_eventType == 'Bug') {

                 if (_projectName == '线上问题记录库') {
                     if (_bugStatus == "问题已解决" || _bugStatus == "问题待确认" || _bugStatus == "问题待观察" || _bugStatus == "待反馈方回复" || _bugStatus == "问题解决中" || _bugStatus == "转 需求/bug") {
                         console.log("bug状态："+_bugStatus)
                         sendingMsg(await setBugParams())
                     };
                 };
             } else if (_eventType == '需求') {

                 if (_storyStatus == '已测试待验收' || _storyStatus == '已发布') {
                     if (_acceptance != '不需要验收') {
                         console.log("需求状态："+_storyStatus)
                         sendingMsg(await setStoryParams())
                     };
                 };
             };
             localStorage.removeItem('preUrl');
         }
     }

     async function setBugParams() {

         if (_bugStatus == '问题已解决') {
             var _mobileList = _bugReporter;
         } else {
             var _mobileList = _bugOwners;
         }
         console.log(_storyUrl, _storyTitle, _storyStatus, _mobileList)
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
                 //支持钉钉号通知
                 // "atDingtalkIds": _mobileList,
                 "isAtAll": false
             }

         };
         return params;
     }

     async function setStoryParams() {

        var _mobileList = _bugCreaters;
        console.log(_storyUrl, _storyTitle, _storyStatus, _mobileList)

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
                 //支持钉钉号通知
                 // "atDingtalkIds": _mobileList,
                 "isAtAll": false
             }

         };
         return params;
     }

     //发送消息XMLHTTP
     function sendingMsg(params) {
         if (params == 0) {
             return;
         }
         chrome.runtime.sendMessage({
             type: 'xml',
             name: "推送钉钉消息",
             msg: {
                 // params: JSON.stringify(params)
                 params: params
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

 });