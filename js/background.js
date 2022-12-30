var cssScannerLoaded              = false; 
var cssScannerContextMenusParent  = null;

chrome.runtime.onInstalled.addListener(function(details){
	if(details.reason == "install" || details.reason == "update" ){
		//chrome.tabs.create( {url: "option.html"} );
	}
});

/*
* Inject cssviewer.js/cssviewer.css into the current page
*/
function openFromBackgroundScript(info, tab) {
    chrome.tabs.query({"active": true, "currentWindow": true }, function (tabs) {
		console.log("Got here")
	   chrome.tabs.executeScript(tabs[0].id, {code:'OpenCSS_Scanner()'});
    });
}

cssScannerContextMenusParent  = chrome.contextMenus.create( { 
	"title" : "Inspect with CSS Scanner", 
	"contexts":["all"],
	"onclick": openFromBackgroundScript
});

chrome.browserAction.onClicked.addListener(function(tab)
{
	if( tab.url.indexOf("https://chrome.google.com") == 0 || tab.url.indexOf("chrome://") == 0 ){
		alert( "CSS Scanner doesn't work on Google Chrome webstore!" );
		return;
	}
	chrome.tabs.executeScript(tab.id, {code:'OpenCSS_Scanner()'});
	chrome.tabs.insertCSS(tab.id, {file:'css/cssviewer.css'});
});
