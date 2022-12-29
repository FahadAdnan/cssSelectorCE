// function restorePrefs() { addEventListener

    chrome.storage.sync.get("cssviewer_onclick_copy", function(result) {
        var perf= document.getElementById("cssviewer_onclick_copy");
	    var tmp = result.onclick_copy; 
        perf.checked = result.onclick_copy
        
        perf.addEventListener("click", function() {
            if(tmp == false) { perf.checked = true; tmp = true; chrome.storage.sync.set({onclick_copy: true}); }
            else { perf.checked = false; tmp=false; chrome.storage.sync.set({onclick_copy: false}); }
        });
    });

// document.addEventListener('DOMContentLoaded', restorePrefs);
