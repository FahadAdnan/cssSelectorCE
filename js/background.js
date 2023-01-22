/*
* Inject cssviewer.js/cssviewer.css into the current page
*/
function openCE(tab){
	try{
		if( tab.url.indexOf("https://chrome.google.com") == 0 || tab.url.indexOf("chrome://") == 0 ){
			alert( "CSS Scanner doesn't work on this page!" );
			return;
		}
		chrome.tabs.sendMessage(tab.id, {text: "are_you_there_content_script_css_scanner?"}, function(msg) {
			msg = msg || {};
			if (msg.status != 'yes') { alert("Error Running CSS Scanner - try refreshing your page")}
		});
	}catch(e){ /* Error occured */ }
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
