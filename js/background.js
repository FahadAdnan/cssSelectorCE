
var cssScannerLoaded              = false; 
var cssScannerContextMenusParent  = null;

/*
* Inject cssviewer.js/cssviewer.css into the current page
*/

function openCE(tab){
	console.log("Click occured")
	try{
		if( tab.url.indexOf("https://chrome.google.com") == 0 || tab.url.indexOf("chrome://") == 0 ){
			alert( "CSS Scanner doesn't work on Google Chrome webstore!" );
			return;
		}
		chrome.tabs.sendMessage(tab.id, {text: "are_you_there_content_script?"}, function(msg) {
			msg = msg || {};
			if (msg.status != 'yes') { alert("Error Running CSS Scanner - try refreshing your page")}
		});
	}catch(e){
		console.log("CSS Scanner " + e)
	}
}

// #region PORTION OF CODE BREAKING BACKGROUND.JS SERVICE WORKER
chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({ 
		"id": "css-scanner-inspect-page-context-menu",
		"title" : "Inspect with CSS Scanner", 
		"contexts":["all"],
	});
});

chrome.contextMenus.onClicked.addListener((info, tab) => openCE(tab))
chrome.action.onClicked.addListener((tab) => { openCE(tab) });
