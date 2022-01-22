//本地用户映射
var userDict = {
	'刘新红1': "13958170200",
	'章帆': "17376563165",
};
var test_dingdingUrl = "https://oapi.dingtalk.com/robot/send?access_token=f8858b0b1acd8df3a3a1de8b08bfc467714c289c77c53026e0832ed86dbdd0ae";
var delivery_dingdingUrl = "https://oapi.dingtalk.com/robot/send?access_token=4253c460fb22d30f0d34b4d34efb80d2761b5518f2c9ff2730e7ed6513492bb0";
var hp_dingdingUrl = "https://oapi.dingtalk.com/robot/send?access_token=1a3d8bfb6fd2e0725c31b548e1f0a0cc893d549b2f14d20677f1b535b8e53b09"



var dingdingUrl = hp_dingdingUrl
var mobileList = new Array();

window.onload = function() {


	chrome.runtime.onMessage.addListener(
		async function(request, sender, sendResponse) {
			var owner = request.msg.params.at['atMobiles'];
			// var _mobileList = getMobiles(owner)
			request.msg.params.at['atMobiles'] = await getMobiles(owner);
			console.log(request.msg.params)
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
				new Notification('推送钉钉消息', {
					icon: '48.png',
					body: '接收消息的用户：' + request.name
				});
			}
			xhr.open("POST", dingdingUrl, true);
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.send(JSON.stringify(request.msg.params));
			sendResponse(JSON.stringify(request))
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
		console.log("bugOwners:"+bugOwners)
		var userList = splitStr(bugOwners, ";").filter((v) => v)
		console.log("userList:" + userList)
		for (let i = 0; i < userList.length; i++) {
			if (userList[i] in userDict) {
				//获取本地mobile
				mobileList[i] = await userDict[userList[i]];
				console.log('获取本地mobile：' + userList[i] + '-' + mobileList[i])
			} else {
				//后端封装了个简单的接口，用于获取通知人的电话
				url = 'http://47.114.109.149:6869/user/getPhone?tapdUserAccount=' + userList[i]
				console.log(url)
				mobileList[i] = await getMobile(url)
				console.log('获取网络mobile：' + userList[i] + '-' + mobileList[i])
			}
			console.log("获取通知人电话list："+mobileList)
			return mobileList;
		}
	}
	//单个获取电话号码
	async function getMobile(url) {
		//return await fetch(url).then(response=>response.text()).catch(e => console.log("Oops,error",e))
		return await fetch(url).then(response => response.json()).catch(e => console.log("Oops,error", e));
	}
	//字符串解析分割
	function splitStr(str, regx) {
		// var result = str.split(regx);
		return str.split(regx);
	}
}