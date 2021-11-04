window.onload = function() {


	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
				new Notification('推送钉钉消息', {
					icon: '48.png',
					body: '接收消息的用户：' + request.name
				});
			}
			xhr.open("POST", request.msg.url, true);
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.send(request.msg.params);
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
}