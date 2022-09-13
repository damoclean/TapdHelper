//本地用户映射
var userDict = {
	'测试': "123456789"
};
var INIT_SUPPORT_URL = "https://oapi.dingtalk.com/robot/send?access_token=1a3d8bfb6fd2e0725c31b548e1f0a0cc893d549b2f14d20677f1b535b8e53b09";
var INIT_STORE_URL = "";
var INIT_BUG_URL = "";
var mobileList = new Array();

chrome.runtime.onInstalled.addListener(function() {
	chrome.storage.local.set({
		support_url: INIT_SUPPORT_URL,
		store_url: INIT_STORE_URL,
		bug_url: INIT_BUG_URL
	})
});

function initPara(support_url, store_url, bug_url) {
	chrome.storage.local.set({
		'support_url': INIT_SUPPORT_URL
	}, function() {
		console.log('support_url:' + support_url)
	});
	chrome.storage.local.set({
		'store_url': INIT_STORE_URL
	}, function() {
		console.log('store_url:' + store_url)
	});
	chrome.storage.local.set({
		'bug_url': INIT_BUG_URL
	}, function() {
		console.log('bug_url:' + bug_url)
	});
}

function setPara(support_url, store_url, bug_url) {
	chrome.storage.local.set({
		'support_url': support_url
	}, function() {
		console.log('support_url:' + support_url)
	});
	chrome.storage.local.set({
		'store_url': store_url
	}, function() {
		console.log('store_url:' + store_url)
	});
	chrome.storage.local.set({
		'bug_url': bug_url
	}, function() {
		console.log('bug_url:' + bug_url)
	});
};
chrome.storage.onChanged.addListener(function(changes, namespace) {
	for (key in changes) {
		var storageChange = changes[key];
		console.log('存储键“%s”（位于“%s”命名空间中）已更改。' +
			'原来的值为“%s”，新的值为“%s”。',
			key,
			namespace,
			storageChange.oldValue,
			storageChange.newValue);
	}
	if (key == 'support_url') {
		support_dingdingUrl = storageChange.newValue
	};
	if (key == 'store_dingdingUrl') {
		store_dingdingUrl = storageChange.newValue
	};
	if (key == 'store_dingdingUrl') {
		bug_dingdingUrl = storageChange.newValue
	};
});


window.onload = function() {


	chrome.runtime.onMessage.addListener(
		async function(request, sender, sendResponse) {
			var owner = request.msg.params.at['atMobiles'];
			// var _mobileList = getMobiles(owner)
			var content = request.msg.params.text.content

			chrome.storage.local.get(['support_url', 'store_url', 'bug_url'], function(result) {
				if (result) {
					support_dingdingUrl = result.support_url
					store_dingdingUrl = result.store_url
					bug_dingdingUrl = result.bug_url
					if (content.search("项目:线上问题记录库") != -1) {
						dingdingUrl = support_dingdingUrl;

					} else if (content.search("需求:") != -1) {
						dingdingUrl = store_dingdingUrl;

					} else if (content.search("BUG:") != -1) {
						dingdingUrl = bug_dingdingUrl;
					} else {
						dingdingUrl = support_dingdingUrl;
					}

				}
			});

			request.msg.params.at['atMobiles'] = await getMobiles(owner);
			request.msg.params.at['atDingtalkIds'] = request.msg.params.at['atMobiles'];
			console.log(request.msg.params.text.content)
			console.log('dingdingUrl:' + dingdingUrl)
			if (dingdingUrl != '') {
				var xhr = new XMLHttpRequest();
				xhr.onreadystatechange = function() {
					new Notification('推送钉钉消息', {
						icon: 'icon/48.png',
						body: '接收消息的用户：' + owner
					});
				}
				xhr.open("POST", dingdingUrl, true);
				xhr.setRequestHeader("Content-Type", "application/json");
				xhr.send(JSON.stringify(request.msg.params));
				sendResponse(JSON.stringify(request))

			}
			return true;
		});


	chrome.commands.onCommand.addListener(function(command) {
		if ('release-copy' === command) {
			// chrome.tabs.getSelected(null, function(tab) {
			// 	alert("[" + tab.title + "](" + tab.url + ")")
			// })
			//alert(location.href)
			chrome.tabs.query({
				active: true
			}, function(tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {
					command: "release-copy"
				}, function(response) {
					alert(response.result)
					console.log(response);
				});
			});

		}
	});
	//获取处理人联系电话
	async function getMobiles(bugOwners) {
		console.log("bugOwners:" + bugOwners)
		var userList = splitStr(bugOwners, ";").filter((v) => v)
		console.log("userList:" + userList)
		var mobileList = []
		for (let i = 0; i < userList.length; i++) {
			if (userList[i] in userDict) {
				//获取本地mobile
				mobileList[i] = await userDict[userList[i]];
				console.log('获取本地mobile：' + userList[i] + '-' + mobileList[i])
			} else {
				//后端封装了个简单的接口，用于获取通知人的电话
				url = 'http://47.242.73.37:6869/user/getPhone?tapdUserAccount=' + userList[i]
				console.log(url)
				mobileList[i] = await getMobile(url)
				console.log('获取网络mobile：' + userList[i] + '-' + mobileList[i])
			}
			console.log("获取通知人电话list：" + mobileList)
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
		// var result = str.split(regx);
		return str.split(regx);
	}
}