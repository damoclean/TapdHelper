window.onload = function () {
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function () {
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
}