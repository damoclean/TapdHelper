let support_url = '';
let bug_url = '';
let store_url = '';
chrome.storage.local.get(['support_url', 'store_url', 'bug_url'], function(result) {
    if (result) {
        support_url = result.support_url
        store_url = result.store_url
        bug_url = result.bug_url
        $('#support_url').val(support_url)
        $('#store_url').val(store_url)
        $('#bug_url').val(bug_url)

    }
    console.log('support_url:' + support_url, 'store_url:' + store_url, 'bug_url:' + store_url)
});

$('#save').click(function() {

    support_url = $('#support_url').val()
    store_url = $('#store_url').val()
    bug_url = $('#bug_url').val()
    var bg = chrome.extension.getBackgroundPage();
    bg.setPara(support_url, store_url, bug_url);

})
$('#reset').click(function() {
    var bg = chrome.extension.getBackgroundPage();
    bg.initPara(support_url, store_url, bug_url);
    location.reload();

})