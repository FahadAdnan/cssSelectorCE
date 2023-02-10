/* Inject content script into all pages when you install the extension */
chrome.runtime.onInstalled.addListener(async () => {
	for (const cs of chrome.runtime.getManifest().content_scripts) {
		for (const tab of await chrome.tabs.query({url: cs.matches})) {

			if( tab.url.indexOf("https://chrome.google.com") == 0 || tab.url.indexOf("chrome://") == 0 ){ continue ; }
			chrome.scripting.insertCSS({target : {tabId : tab.id }, files : cs.css })
			.then(
				() => chrome.scripting.executeScript({ target: {tabId: tab.id}, files: cs.js })
			);	
		}
	}
});

/* Inject cssviewer.js/cssviewer.css into the current page */
function openCE(tab){
	try{
		if( tab.url.indexOf("https://chrome.google.com") == 0 || tab.url.indexOf("chrome://") == 0 ){return; }

			chrome.tabs.sendMessage(tab.id, {text: "are_you_there_content_script_css_scanner?"}, function(msg) {
				msg = msg || {};
				if (msg.status != 'yes') { alert("Error Running CSS Scanner - try refreshing your page")}
				console.log("Message status is: " + msg + " " + msg.status)
			});
	}catch(e){ 
		console.log("Could not connect to content script!!")
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