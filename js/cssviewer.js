
var const_google_search = "https://www.google.com/search?q="

// #region RGB/Regex Helper Functions 
var CSS_Scanner_hexa = new Array('0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F');

function isRgbValue(value) {
	if (typeof value !== 'string') { return false; }
	return value.match("\s*rgb\\s*[(\]\\s*[0-9]{1,3}\\s*,\\s*[0-9]{1,3}\\s*,\\s*[0-9]{1,3}\\s*[)\]\\s*") !== null;
}
function isRegexValue(value) {
	if (typeof value !== 'string') { return false; }
	return value.match(new RegExp('/#[0-9A-Fa-f]{6}/g')) !== null;
}
function DecToHex(nb)
{
	var nbHexa = '';
	nbHexa += CSS_Scanner_hexa[Math.floor(nb / 16)];
	nb = nb % 16;
	nbHexa += CSS_Scanner_hexa[nb];
	return nbHexa;
}
function RGBToHex(str)
{
	var start = str.search(/\(/) + 1;
	var end = str.search(/\)/);
	str = str.slice(start, end);
	var hexValues = str.split(', ');
	var hexStr = '#';
	for (var i = 0; i < hexValues.length; i++) { hexStr += DecToHex(hexValues[i]); }
	if( hexStr == "#00000000" ){ hexStr = "#FFFFFF"; }
	return hexStr;
}
function containsNumbers(str) {
	return /\d/.test(str);
}  
// #endregion

// #region General Util Functoins
function GetCurrentDocument() { return window.document; }
function GetCSSProperty(element, property){ return element.getPropertyValue(property); }
function last(array) { return array[array.length - 1]; }
// #endregion

// #region Globals variables
var CSS_Scanner_current_element = null
var CSS_Scanner_on_custom_element = false
var CSS_Scanner_is_closed = true 
var elementMap = new Map([]); 
var CSS_Scanner_security_issue_occ = false
var CSS_Scanner_currently_outlined_item = null 
var CSS_Scanner_current_viewer_block_filled = false 
var CSS_Scanner_in_paused_state = false
// #endregion

// #region Update Functions 
function UpdateSubHeadings(element){
	var fontStyle = element.getPropertyValue('font-family').split(" ")[0].slice(0, -1); 
	var fontSize = element.getPropertyValue('font-size');

	var height = ((element.naturalHeight == undefined) ? element.getPropertyValue('height') : element.naturalHeight + "px");
	var width = ((element.naturalWidth == undefined) ? element.getPropertyValue('width') : element.naturalWidth + "px");

	var header = last(document.getElementsByClassName('css-scanner-viewer-block')).firstChild;
	try {
		header.childNodes[1].lastChild.innerHTML = '&nbsp;' + height + " " + width; 
		header.childNodes[2].childNodes[2].innerHTML = fontStyle;
		header.childNodes[2].childNodes[2].href = const_google_search + fontStyle + "+font"
		header.childNodes[2].lastChild.innerHTML = ", " + fontSize
	} catch(err) {}
}

function PropertyRowElement(propName, propValue){
	var li = document.createElement('li');
	li.className = "css-scanner-default-white-text"

	var span_property = document.createElement('span');
	span_property.classList.add("css-scanner-primary-text", "css-scanner-property-name");
	span_property.appendChild(document.createTextNode(propName));

	var span_value = document.createElement('span'); 

	if(containsNumbers(propValue)){
		span_value.classList.add("css-scanner-primary-text", "css-scanner-property-value-wnum");
	}else{
		span_value.classList.add("css-scanner-primary-text", "css-scanner-property-value");

	}
	span_value.appendChild(document.createTextNode(propValue));
	li.appendChild(span_property);
	li.appendChild(document.createTextNode(": "))
	li.appendChild(span_value)
	li.appendChild(document.createTextNode(";"))
	return li; 
}

function generateMediaParentContainer(mediaText){
	let li_parent = document.createElement("div");
	li_parent.className = "css-scanner-nested-container-style";
	let title_div = document.createElement("div");
	title_div.classList.add("css-scanner-primary-text", "css-scanner-media-sublock-title");
	title_div.innerHTML = "@media " + mediaText;
	li_parent.appendChild(title_div);
	return li_parent;
}

function generatePseudoParentContainer(selectorText){
	let li_parent = document.createElement("div");
	li_parent.className = "css-scanner-nested-container-style";
	let title_div = document.createElement("div");
	title_div.classList.add("css-scanner-primary-text", "css-scanner-pseudo-style-title");
	title_div.innerHTML = selectorText;
	li_parent.appendChild(title_div);
	return li_parent
}

function StyleBlockHelperMainPage(propertyMap, mediaStyle, trueParentElement){

	let isMediaElement = (mediaStyle != "");
	let parentElement = trueParentElement
	if(isMediaElement){ parentElement = generateMediaParentContainer(mediaStyle); }

	let propertyArr = new Array(new Array());
	propertyMap.forEach((value, key) => { propertyArr.push([key, value[0]]); });
	propertyArr = propertyArr.sort((a, b) =>  ('' + a[0]).localeCompare(b[0]));
	let propArrLen = propertyArr.length;

	for(let i = 0; i < propArrLen; i++){

		let propName = propertyArr[i][0];
		let propValue = propertyArr[i][1];
		if(propName == undefined || propValue == undefined || propName.length == 0 || propValue.length == 0){ continue; }
		parentElement.appendChild(PropertyRowElement(propName, propValue));
	}
	if(isMediaElement){ trueParentElement.appendChild(parentElement); }
}

function UpdateMainPage(styleMap){
	// Fetch parent ul and clear it out: 
	let ul = last(document.getElementsByClassName("css-scanner-ul"))
	while(ul.childNodes.length > 0){ ul.removeChild(ul.firstChild) }

	// All @Media styles and then all inline styles
	styleMap.forEach((propertyMap, mediaStyle) => { 
		if(mediaStyle != ""){ StyleBlockHelperMainPage(propertyMap, mediaStyle, ul); }
	});
	if(styleMap.has("")){ StyleBlockHelperMainPage(styleMap.get(""), "", ul)}

}

function UpdateSpecialSectionsMainPage(styleMap){
	
	// Ul in document currently 
	let ul = last(document.getElementsByClassName("css-scanner-ul"))

	let outerArr = new Array(new Array());
	styleMap.forEach((value, key) => { outerArr.push([key, value])})
	outerArr = outerArr.sort((a, b) =>  ('' + a[0]).localeCompare(b[0]));

	for(let k = 0; k < outerArr.length-1; k++){
		let li_parent = generatePseudoParentContainer(outerArr[k][0]);

		let currMap = outerArr[k][1];

		if(currMap){
			// All @Media styles and then all inline styles
			currMap.forEach((propertyMap, mediaStyle) => { 
				if(mediaStyle != ""){ StyleBlockHelperMainPage(propertyMap, mediaStyle, li_parent); }
			});
			if(currMap.has("")){ StyleBlockHelperMainPage(currMap.get(""), "", li_parent)}
			ul.appendChild(li_parent);
		}
	}
}

function UpdateSecurityNotification(){
	let ul = last(document.getElementsByClassName("css-scanner-ul"));
	if(CSS_Scanner_security_issue_occ){
		ul.appendChild(security_issue_nested_note());
	}
}
// #endregion 

// #region Event Handlers

function isOurCustomElement(currelem){
	return currelem != undefined && (
		currelem.classList.contains("css-scanner-viewer-block") || 
		currelem.id == "css-scanner-floating-options" ||
		currelem.id == "css-scanner-license-modal-content"
	)
}

function CSS_ScannerMouseOver(e)
{
	// State
	if(CSS_Scanner_in_paused_state) return; 

	// Block
	var document = GetCurrentDocument();
	var block = last(document.getElementsByClassName('css-scanner-viewer-block'));

	if(!block){ return; }
	elementMap.set(block, this)

	// Initial Logic to decide whether to show the popup:
	if(isOurCustomElement(this) || CSS_Scanner_on_custom_element){
		CSS_Scanner_on_custom_element = true 
		block.style.display = "none"
		return;
	}else{ 
		block.style.display = "flex" 
	}

	var title = block.firstChild.firstChild.firstChild
	title.firstChild.innerHTML =  '&lt;' + this.tagName.toLowerCase() + '&gt;'
	title.lastChild.innerHTML = (this.className == '' ? '' : ' .' + this.className.toString().split(' ')[0]);

	// Outline element
	if (this.tagName != 'body') {
		CSS_Scanner_currently_outlined_item = this
		this.style.outline = '2px dashed #f00';
		if(CSS_Scanner_current_element) CSS_Scanner_current_element = this;
	}

	// Updating CSS properties
	var element = document.defaultView.getComputedStyle(this, null);
	var elem = elementMap.get(block)

	var rules = MEJSX.getCustomCssRulesOnElement(elem);
	let defaultRules = rules.filter(rule => !rule.isPseudoRule);
	let pseudoRules = rules.filter(rule => rule.isPseudoRule);

	let propertyMap = getAllStylesOnSingleElement(defaultRules, element);
	let pseudoRuleMap = getAllSpecialStylesOnSingleElement(pseudoRules);

	UpdateSubHeadings(element)
	UpdateMainPage(propertyMap)
	UpdateSpecialSectionsMainPage(pseudoRuleMap)
	UpdateSecurityNotification()
	CSS_Scanner_current_viewer_block_filled = true 

	cssScannerRemoveElement("css-scanner-insert-message");

	e.stopPropagation();
}

function CSS_ScannerMouseOut(e)
{
	// State
	if(CSS_Scanner_in_paused_state) return; 

	if(isOurCustomElement(this)){
		CSS_Scanner_on_custom_element = false 
		return;
	}
	this.style.outline = '';

	e.stopPropagation();
}

function CSS_ScannerMouseMove(e)
{
	// State
	if(CSS_Scanner_in_paused_state) return; 

	if(this == undefined || CSS_Scanner_on_custom_element){ return; }
	
	var document = GetCurrentDocument();
	var block = last(document.getElementsByClassName('css-scanner-viewer-block'));

	if( ! block ){ return; }

	block.style.display = 'flex';
	
	var pageWidth = window.innerWidth;
	var blockWidth = 332;
	var blockHeight = document.defaultView.getComputedStyle(block, null).getPropertyValue('height');

	blockHeight = blockHeight.substr(0, blockHeight.length - 2) * 1;

	if ((e.pageX + blockWidth) > pageWidth) {
		if ((e.pageX - blockWidth - 10) > 0) block.style.left = e.pageX - blockWidth - 40 + 'px';
		else block.style.left = 0 + 'px';
	}
	else block.style.left = (e.pageX + 20) + 'px';
	block.style.top = e.pageY + 'px';
	e.stopPropagation();
}

function setElementToBeDraggable(elmnt) {
	var document = GetCurrentDocument();

	if( ! elmnt ){ return; }

	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	elmnt.onmousedown = dragMouseDown;
	
	function dragMouseDown(e) {
	  e = e || window.event;
	  e.preventDefault();
	  // get the mouse cursor position at startup:
	  pos3 = e.clientX;
	  pos4 = e.clientY;
	  document.onmouseup = closeDragElement;
	  // call a function whenever the cursor moves:
	  document.onmousemove = elementDrag;
	}
  
	function elementDrag(e) {
	  e = e || window.event;
	  e.preventDefault();
	  // calculate the new cursor position:
	  pos1 = pos3 - e.clientX;
	  pos2 = pos4 - e.clientY;
	  pos3 = e.clientX;
	  pos4 = e.clientY;
	  // set the element's new position:
	  elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
	  elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
	}
  
	function closeDragElement() {
	  // stop moving when mouse button is released:
	  document.onmouseup = null;
	  document.onmousemove = null;
	}
}
// #endregion

// #region Helper Divs for CSS Scanner 

function security_issue_nested_note(){
	let li_parent = document.createElement("li");
	li_parent.className = "css-scanner-nested-container-style";
	let security_err_span = document.createElement("span");
	security_err_span.classList.add("css-scanner-default-white-text", "css-scanner-security-disclaimer");
	security_err_span.innerHTML = "<b>Note:</b> Chrome Security is blocking access to external CSS Stylesheets, properties may be missing"
	li_parent.appendChild(security_err_span);
	return li_parent;
}

function header_button(image_path){
	var btn = document.createElement('button')
	btn.classList.add("css-scanner-viewer-btn")		
	var img = document.createElement("img");
	img.src = chrome.runtime.getURL(image_path)
	btn.appendChild(img)
	return btn 
}

function sub_headings_text(image_path){
	var div = document.createElement('div');
	div.classList.add("css-scanner-primary-text", "css-scanner-subheading-text");
	var img = document.createElement("img")
	img.src = chrome.runtime.getURL(image_path)
	div.appendChild(img)
	return div;
}
//#endregion

// #region Main CSS_Scanner 
function CSS_Scanner()
{
	// Create a block to display informations
	this.CreateBlock = function() {
		var document = GetCurrentDocument();
		var block;
		
		if (document) {
			// Create a div block
			block = document.createElement('div');
			block.classList.add("css-scanner-viewer-block")
			block.style.display = "none"
			
			// Insert a title for CSS selector

			var header = document.createElement('div');
			var subheader = document.createElement('div');

			header.classList.add("css-scanner-header");
			subheader.classList.add("css-scanner-subheader");

			var title = document.createElement('div');
			let tagName = document.createElement('span');
			let className = document.createElement('span')
			tagName.classList.add("css-scanner-primary-text", "css-scanner-title");
			className.classList.add("css-scanner-primary-text", "css-scanner-pseudo-style-title");
			title.append(tagName, className);

			var btnContainer = document.createElement("div");
			btnContainer.className = "css-scanner-header-button-row"
			var code_btn = header_button("../img/code.svg")
			var copy_btn = header_button("../img/copy.svg")
			var trash_btn = header_button("../img/trash.svg")

			var form = document.createElement('form');
			form.setAttribute('method', 'post');
			form.setAttribute('action', 'https://codepen.io/pen/define')
			form.setAttribute('target', '_blank');

			var input = document.createElement('input');
			input.setAttribute('type', 'hidden')
			input.setAttribute('name', 'data')
			input.setAttribute('value', '')
			form.appendChild(input)

			btnContainer.append(code_btn, copy_btn, trash_btn, form);
			
			code_btn.addEventListener("click", function(){
				input.value = JSON.stringify({
					html: parseHTML(block),
					css: parseStyleSheets(block).toString(),
					editors: '110',
					tags: ['CSS Scanner']
				});
				form.submit(); 
			}); 
			trash_btn.addEventListener("click", function () {
				RemoveEventListners(block)
				block.remove();
			});
			copy_btn.addEventListener("click", function(){
				navigator.clipboard.writeText(parseStyleSheets(block));
				cssScannerInsertMessage('Copied CSS to your Clipboard!');
                setTimeout(function () { cssScannerRemoveElement("css-scanner-insert-message");}, 2500);
			}); 

			subheader.append(title, btnContainer);
			header.appendChild(subheader); 

 			var size_sub_heading = sub_headings_text("../img/size.svg")
			size_sub_heading.appendChild(document.createElement("span"))

			var font_sub_heading = sub_headings_text("../img/font.svg");

			var fontlink = document.createElement('a')
			fontlink.className = "css-scanner-font-link-style"

			var spacediv = document.createElement("div")
			spacediv.innerHTML = "&nbsp;"

			font_sub_heading.appendChild(spacediv);
			font_sub_heading.appendChild(fontlink);
			font_sub_heading.appendChild(document.createElement('span'));


			header.appendChild(size_sub_heading);
			header.appendChild(font_sub_heading);

			block.appendChild(header);
			
			// Insert all properties
			var center = document.createElement('div');
			var ul = document.createElement('ul');
			ul.classList.add("css-scanner-ul")
			center.appendChild(ul)
			block.appendChild(center);
		}  
		return block;
	}
}

//Check if CSS_Scanner is enabled
CSS_Scanner.prototype.IsEnabled = function()
{
	var document = GetCurrentDocument();

	if (last(document.getElementsByClassName('css-scanner-viewer-block'))) {
		return true;
	}

	return false;
}

// Enable CSS_Scanner
CSS_Scanner.prototype.Enable = function(addEventListners)
{
	var document = GetCurrentDocument();
	let new_block = this.CreateBlock();
	document.body.appendChild(new_block);
	setElementToBeDraggable(new_block);
	AddEventListners(new_block);	
	if(addEventListners){ AddDocumentEventListeners(); }

	return true;
}

// Disable CSS_Scanner
CSS_Scanner.prototype.Disable = function(removeEventListeners)
{
	var document = GetCurrentDocument();
	var block = last(document.getElementsByClassName('css-scanner-viewer-block'));
    var insertMessage = document.getElementById("css-scanner-insert-message");
        
	if (block || insertMessage) {
		if(block) document.body.removeChild(block);
        if(insertMessage) document.body.removeChild(insertMessage);
		if(removeEventListeners) RemoveDocumentEventListeners();
		return true;
	}

	return false;
}

// #endregion 

// #region Notification Code - replace with cleaner version 

function cssScannerInsertMessage( msg )
{
	if(document.getElementById('css-scanner-insert-message') == null){

		// Display the notification message
		var oNewP = document.createElement("p");
		var oText = document.createTextNode(msg);

		oNewP.appendChild(oText);
		oNewP.id = 'css-scanner-insert-message';
		oNewP.className = "css-scanner-insert-message-font"
		document.body.appendChild(oNewP);
	}
}

function cssScannerRemoveElement(divid)
{   
	//Removes and element from the dom, used to remove the notification message
	var n = document.getElementById(divid);
	if(n){ document.body.removeChild(n);  }
}
// #endregion

//#region Main State Functions (Pause/Continue/Open/Close/Freeze/Grid)

function PauseCSS_Scanner(){
	var state_btn = document.getElementById("css-scanner-pause-continue")
	state_btn.firstChild.innerHTML = "Continue&nbsp;"
	state_btn.lastChild.src = chrome.runtime.getURL("../img/play.svg")
	if(CSS_Scanner_currently_outlined_item) CSS_Scanner_currently_outlined_item.style.outline = '';
	CSS_Scanner_in_paused_state = true
	cssScanner.Disable(false);
}

function ContinueCSS_Scanner(){
	var state_btn = document.getElementById("css-scanner-pause-continue")
	state_btn.firstChild.innerHTML = "Pause&nbsp;"
	state_btn.lastChild.src = chrome.runtime.getURL("../img/pause.svg")
	cssScanner = new CSS_Scanner();
	CSS_Scanner_in_paused_state = false
	cssScanner.Enable(false); 
}

function CloseCSS_Scanner(){
	cssScanner.Disable(true);
	// Remove all the Blocks 
	var blocks = document.getElementsByClassName("css-scanner-viewer-block")
    while(blocks.length > 0){ blocks[0].parentNode.removeChild(blocks[0]); }
	// Remove option menu 
	var option_menu = document.getElementById("css-scanner-floating-options")
	option_menu.parentNode.removeChild(option_menu)
	// Clean up loose ends - grid and notification message
	if(CSS_Scanner_currently_outlined_item) CSS_Scanner_currently_outlined_item.style.outline = ''
	ToggleGrid(false)
	cssScannerRemoveElement("css-scanner-insert-message");
	cssScannerRemoveElement("css-scanner-license-modal");
	CSS_Scanner_is_closed = true
	CSS_Scanner_in_paused_state = false
}

function OpenCSS_Scanner(){
	if(CSS_Scanner_is_closed){
		floatingHeaderOptions()
		cssScanner = new CSS_Scanner();
		cssScanner.Enable(true);
		CSS_Scanner_is_closed = false
	} 
}

function FreezeCurrentBlock(){
	if(CSS_Scanner_current_viewer_block_filled){
		cssScanner = new CSS_Scanner();
		cssScanner.Enable(false); 
	}
	CSS_Scanner_current_viewer_block_filled = false;
}

function ToggleGrid(enable){
	let elements = GetAllSubElements(document.body)
	if(enable){ for (var i = 0; i < elements.length; i++){ elements[i].classList.add("css-scanner-red-outline") }}
	else { for (var i = 0; i < elements.length; i++){ elements[i].classList.remove("css-scanner-red-outline") }}
}
// #endregion 

// #region Click Event and Key Mapping 

function ClickEvent(e){
	if(CSS_Scanner_is_closed || CSS_Scanner_in_paused_state) return 
	var isPinEnabled= (document.getElementById('css-scanner-onclick-pin').firstChild.checked == true);
	if(isPinEnabled){ FreezeCurrentBlock()}
	
	// var isCopyEnabled= (document.getElementById('css-scanner-onclick-copy').firstChild.checked == true);
	// if(isCopyEnabled){ /* TODO - Add Code to copy css to clipboard */ }
}

function CssScannerKeyMap(e) {

	if(CSS_Scanner_is_closed){ 
		// Open Extension: (Ctrl+Shift+S) - Run Content Script 
		if(e.keyCode === 83 && (e.key === "S" || e.key === "s") && e.shiftKey && e.ctrlKey){ OpenCSS_Scanner() }
		return
	}
	// Close Extension(Escape) - delete custom added elements + event listeners 
	if(e.keyCode === 27 && e.key == "Escape"){ CloseCSS_Scanner() }

	// Pause/Continue: (Alt+Shift+S) - Note in macOS s+alt+shift causes a weird symbol to be created - need edgecase of "Í"
	if( e.keyCode === 83 && (e.key === "S" || e.key === "s" || e.key == "Í") && e.shiftKey && e.altKey){
		if(CSS_Scanner_in_paused_state){ ContinueCSS_Scanner() }
		else{ PauseCSS_Scanner() }	
	}
	// Freeze Current Block(Space) - create a new one and forget the old one
	if (e.keyCode === 32 && e.key == " " && !CSS_Scanner_in_paused_state){
		FreezeCurrentBlock()
		return false; // Prevent default behaviour of scrolling down
	}

	if( e.keyCode === 88 && (e.key === "X" || e.key === "x") && e.shiftKey && e.ctrlKey){
		var perf= document.getElementById('css-scanner-display-grid').firstChild;
		perf.checked = !perf.checked
		ToggleGrid(perf.checked)
	}
}
//#endregion

//#region Document Functions 

function AddEventListners(element){
	element.addEventListener("mouseover", CSS_ScannerMouseOver, false);
	element.addEventListener("mouseout", CSS_ScannerMouseOut, false);
	element.addEventListener("mousemove", CSS_ScannerMouseMove, false);
	element.addEventListener("click", ClickEvent, false);
}
function RemoveEventListners(element){
	element.removeEventListener("mouseover", CSS_ScannerMouseOver, false);
	element.removeEventListener("mouseout", CSS_ScannerMouseOut, false);
	element.removeEventListener("mousemove", CSS_ScannerMouseMove, false);
	element.addEventListener("click", ClickEvent, false);
}

function AddDocumentEventListeners()
{
	var document = GetCurrentDocument();
	var elements = GetAllSubElements(document.body);
	for (var i = 0; i < elements.length; i++){ AddEventListners(elements[i]) }	
}

function RemoveDocumentEventListeners()
{
	var document = GetCurrentDocument();
	var elements = GetAllSubElements(document.body);
	for (var i = 0; i < elements.length; i++){ RemoveEventListners(elements[i]) }
}

function GetAllSubElements (element)
{
	var elemArr = new Array();
		
	// Ignore all of our added CSS
	if (element && element.hasChildNodes()) {

		elemArr.push(element);
		if(element.classList.contains("css-scanner-viewer-block") || element.id == "css-scanner-floating-options" || element.id == "css-scanner-license-modal-content") return elemArr;
		var childs = element.childNodes;

		for (var i = 0; i < childs.length; i++) {
			if (childs[i].hasChildNodes()) { elemArr = elemArr.concat(GetAllSubElements(childs[i])); }
			else if (childs[i].nodeType == 1) { elemArr.push(childs[i]); }
		}
	}

	return elemArr;
}
// #endregion 

// #region Floating Menu Header 

function floatingHeaderButton(type, inner_text, image_path){

	var btn = document.createElement("button")
	btn.id = "css-scanner-" + type
	btn.className = "css-scanner-menu-button"

	var inner_div = document.createElement("span")
	inner_div.className = "css-scanner-primary-text";
	inner_div.id = "css-scanner-span-" + type
	inner_div.innerHTML = inner_text +  "&nbsp;"

	var inner_img = document.createElement("img");
	inner_img.id = "css-scanner-image-" + type;
	inner_img.src = chrome.runtime.getURL(image_path);

	btn.appendChild(inner_div);
	btn.appendChild(inner_img);
	return btn
}

function floatingUpgradeHeaderButton(){

	var btn = document.createElement("button")
	btn.id = "css-scanner-upgrade"
	btn.className = "css-scanner-menu-button-upgrade"
	
	var inner_img = document.createElement("img")
	inner_img.id = "css-scanner-image-upgrade"
	inner_img.src = chrome.runtime.getURL("../img/lightning.svg")

	var inner_div = document.createElement("div")
	inner_div.className = "css-scanner-primary-text";
	inner_div.id = "css-scanner-span-upgrade";
	inner_div.innerHTML = "&nbsp; Upgrade"

	btn.appendChild(inner_img);
	btn.appendChild(inner_div);
	return btn
}
function dropdownContainer(){
	var cntr = document.createElement("div")
	cntr.classList = ["css-scanner-spacing-7"]
	return cntr
}
function dropdownHeader(inner_text){
	var header = document.createElement("div")
	header.className = "css-scanner-header-text"
	header.innerHTML = inner_text
	return header
}
function dropdownSwitch(type, inner_text){
	var divSwitch = document.createElement("div")
	divSwitch.id = "css-scanner-" + type
	divSwitch.className = "css-scanner-row-container"

	var inputSwitch = document.createElement("input");
	inputSwitch.className = "css-scanner-switch"
	inputSwitch.type = "checkbox"

	var spanSwitch = document.createElement("switch")
	spanSwitch.className = "css-scanner-simple-text"
	spanSwitch.innerHTML = inner_text

	divSwitch.append(inputSwitch, spanSwitch)
	return divSwitch
}
function dropdownShortcuts(command, inner_text){
	var divShortcut = document.createElement("div")
	divShortcut.className = "css-scanner-simple-text css-scanner-spacing-2"
	divShortcut.innerHTML = "<b>" + command + "</b> " + inner_text
	return divShortcut
}

function setStateOfSwitches(){ addEventListener
	// chrome.storage.sync.get('onclick_copy', function(result) {
    //     var perf= document.getElementById('css-scanner-onclick-copy').firstChild;
	//     var tmp = result.onclick_copy; 
    //     perf.checked = tmp;
        
    //     perf.addEventListener("change", function() {
    //         if(tmp) { perf.checked = false; tmp = false; chrome.storage.sync.set({'onclick_copy': false}); }
    //         else { perf.checked = true; tmp = true; chrome.storage.sync.set({'onclick_copy': true}); }
    //     });
    // })
	chrome.storage.sync.get('onclick_pin', function(result) {
        var perf= document.getElementById('css-scanner-onclick-pin').firstChild;
	    var tmp = result.onclick_pin; 
        perf.checked = tmp;
        
        perf.addEventListener("change", function() {
            if(tmp) { perf.checked = false; tmp = false; chrome.storage.sync.set({'onclick_pin': false}); }
            else { perf.checked = true; tmp = true; chrome.storage.sync.set({'onclick_pin': true}); }
        });
    })
	// chrome.storage.sync.get('other_child_css', function(result) {
    //     var perf= document.getElementById('css-scanner-other-child-css').firstChild;
	//     var tmp = result.other_child_css; 
    //     perf.checked = tmp;
        
    //     perf.addEventListener("change", function() {
    //         if(tmp) { perf.checked = false; tmp = false; chrome.storage.sync.set({'other_child_css': false}); }
    //         else { perf.checked = true; tmp = true; chrome.storage.sync.set({'other_child_css': true}); }
    //     });
    // })
	// chrome.storage.sync.get('other_html_copy', function(result) {
    //     var perf= document.getElementById('css-scanner-other-html-copy').firstChild;
	//     var tmp = result.other_html_copy; 
    //     perf.checked = tmp;
        
    //     perf.addEventListener("change", function() {
    //         if(tmp) { perf.checked = false; tmp = false; chrome.storage.sync.set({'other_html_copy': false}); }
    //         else { perf.checked = true; tmp = true; chrome.storage.sync.set({'other_html_copy': true}); }
    //     });
    // })
	chrome.storage.sync.get('display_grid', function(result) {
        var perf= document.getElementById('css-scanner-display-grid').firstChild;
	    var tmp = result.display_grid; 
        perf.checked = tmp;
		if(tmp) { ToggleGrid(true) } 

        perf.addEventListener("change", function() {
            if(tmp) { perf.checked = false; tmp = false; chrome.storage.sync.set({'display_grid': false}); }
            else { perf.checked = true; tmp = true; chrome.storage.sync.set({'display_grid': true}); }
			ToggleGrid(perf.checked)
        });
    })
	// chrome.storage.sync.get('display_guidelines', function(result) {
    //     var perf= document.getElementById('css-scanner-display-guidelines').firstChild;
	//     var tmp = result.display_guidelines; 
    //     perf.checked = tmp;
        
    //     perf.addEventListener("change", function() {
    //         if(tmp) { perf.checked = false; tmp = false; chrome.storage.sync.set({'display_guidelines': false}); }
    //         else { perf.checked = true; tmp = true; chrome.storage.sync.set({'display_guidelines': true}); }
    //     });
    // })
}

function setOnClicksOfDropDown(){
	// Pause/Continue Button: 
	document.getElementById("css-scanner-pause-continue").addEventListener("click", function(){
		if(CSS_Scanner_in_paused_state){  ContinueCSS_Scanner() }
		else{  PauseCSS_Scanner() }
	})
	// Move Button: 
	document.getElementById("css-scanner-move").addEventListener("click", function(){

		var option_menu = document.getElementById("css-scanner-floating-options")
		var dropdown = document.getElementById("css-scanner-btn-dropdown-container")
		var dropdown_menu = document.getElementById("css-scanner-options-dropdown")

		if(option_menu.style.top == 'auto'){
			option_menu.style.top = '10px'
			option_menu.style.bottom = 'auto'
			this.lastChild.style.transform = 'rotate(0deg)';
			dropdown.style.flexDirection = "column"
			dropdown_menu.style.margin = "40px 0px 0px 0px"
		}else{
			option_menu.style.top = 'auto'
			option_menu.style.bottom = '10px'
			this.lastChild.style.transform = 'rotate(180deg)';
			dropdown.style.flexDirection = "column-reverse"
			dropdown_menu.style.margin = "0px 0px 40px 0px"
		}
	})	
	// Option Button 
	var dropdown = document.getElementById("css-scanner-options-dropdown")
	document.getElementById("css-scanner-options").addEventListener("click", function(){
		if(dropdown.style.display == 'none'){ dropdown.style.display = 'flex'; } else { dropdown.style.display = 'none'}
	})
	// Close Button
	document.getElementById("css-scanner-upgrade").addEventListener("click", function(){
		//Upgrade Dialog
		PauseCSS_Scanner();
		createUpgradeDialog();
	})	
	// Close Button
	document.getElementById("css-scanner-close").addEventListener("click", function(){
		CloseCSS_Scanner();
	})	
}

function createUpgradeDialog(){
	let parentId =  "css-scanner-license-modal"

	if(document.getElementById(parentId) == null){

		let parent = document.createElement("div");
		parent.id = "css-scanner-license-modal";

		let container = document.createElement("div");
		container.id = "css-scanner-license-modal-content";

		let closeSpan = document.createElement("span");
		closeSpan.innerHTML = "×"
		closeSpan.id = "css-scanner-license-modal-close"

		let logo = document.createElement("img");
		logo.src = chrome.runtime.getURL("../img/logo128.png");
		logo.id = "css-scanner-license-modal-img"

		let titletext = document.createElement("h1");
		titletext.id = "css-scanner-license-modal-h1"
		titletext.innerHTML = "CSS Scanner - Tell us what you'd like to see"
		let inner_container = document.createElement("div");
		
		let message = document.createElement("p");
		message.innerHTML = "Please shoot us a message on what upgrades you'd like to see!"
		
		// let input = document.createElement("input");
		// input.id = "css-scanner-license-input"

		let parentButtons = document.createElement("div");
		parentButtons.className = "css-scanner-custom-upgrade-row"

		let principal_btn = document.createElement("a");
		principal_btn.id = "css-scanner-check-license-btn"
		principal_btn.innerHTML = "Send A Message"
		principal_btn.href= "https://airtable.com/shrlRsJyEB4px29Gp" 

		let buy_me_coffee = document.createElement("a");
		let coffee_img = document.createElement("img")
		coffee_img.src = chrome.runtime.getURL("../img/bmc-button.svg")
		buy_me_coffee.appendChild(coffee_img);
		buy_me_coffee.href = "https://www.buymeacoffee.com/tldralgos"
		buy_me_coffee.id = "css-scanner-buy-me-a-coffee"

		parentButtons.append(principal_btn, buy_me_coffee)
		inner_container.append(message, parentButtons);
		container.append(closeSpan, logo, titletext, inner_container)
		parent.append(container);
		document.body.appendChild(parent);

		// Add in onclicks
		closeSpan.addEventListener("click", function(){
			if(document.getElementById(parentId) != null){ 
				document.getElementById(parentId).remove()
				ContinueCSS_Scanner();
			}
			CSS_Scanner_in_paused_state = false
		}); 
		CSS_Scanner_in_paused_state = true 
	}
}

function floatingHeaderOptions(){
	var parent_container = document.createElement("div")
	parent_container.id = "css-scanner-floating-options"
	parent_container.classList.add("css-scanner-parent-container");

	parent_container.appendChild(floatingHeaderButton("pause-continue", "Pause", "../img/pause.svg"))
	parent_container.appendChild(floatingHeaderButton("move", "Move", "../img/arrow_down.svg"))

	var dropdownDiv = document.createElement("div")
	dropdownDiv.id = "css-scanner-btn-dropdown-container"

	dropdownDiv.appendChild(floatingHeaderButton("options", "Options", "../img/options.svg"))

	var innerSubDiv = document.createElement("div")
	innerSubDiv.id = "css-scanner-options-dropdown"
	innerSubDiv.style.display = 'none'

	var onclick_sub = dropdownContainer()
	onclick_sub.appendChild(dropdownHeader("On-Click Behaviour:"))
	// onclick_sub.appendChild(dropdownSwitch("onclick-copy", "&nbsp;Copy Code"))
	onclick_sub.appendChild(dropdownSwitch("onclick-pin", "&nbsp;Pin the CSS Window"))

	// var other_sub = dropdownContainer()
	// other_sub.appendChild(dropdownHeader("Other Behaviour:"))
	// other_sub.appendChild(dropdownSwitch("other-child-css", " Copy Child Element CSS"))
	// other_sub.appendChild(dropdownSwitch("other-html-copy", " Copy HTML Code (Seperately)"))

	var display_sub = dropdownContainer()
	display_sub.appendChild(dropdownHeader("Display Behaviour:"))
	display_sub.appendChild(dropdownSwitch("display-grid", "&nbsp;Grid"))
	// display_sub.appendChild(dropdownSwitch("display-guidelines", " Guidelines"))

	var shortcuts_sub = dropdownContainer()
	shortcuts_sub.appendChild(dropdownHeader("Shortcuts:"))
	shortcuts_sub.appendChild(dropdownShortcuts("Ctrl+Shift+S:", "Activate Extension"))
	shortcuts_sub.appendChild(dropdownShortcuts("Alt+Shift+S:", "Pause/Continue"))
	shortcuts_sub.appendChild(dropdownShortcuts("Ctrl+Shift+X:", "Toggle Grid"))
	// shortcuts_sub.appendChild(dropdownShortcuts("Arrow Keys:", "Navigate through DOM"))
	shortcuts_sub.appendChild(dropdownShortcuts("Spacebar:", "Pin the current block"))
	shortcuts_sub.appendChild(dropdownShortcuts("ESC Key:", "Close the Extension"))

	innerSubDiv.append(onclick_sub, display_sub, shortcuts_sub)
	dropdownDiv.appendChild(innerSubDiv)
	parent_container.appendChild(dropdownDiv)

	parent_container.appendChild(floatingUpgradeHeaderButton())
	parent_container.appendChild(floatingHeaderButton("close", "Close the Extension", "../img/close.svg"))

	document.body.appendChild(parent_container)
	setStateOfSwitches()
	setOnClicksOfDropDown()
}

// #endregion

//#region StyleSheet Functions 

function filterNotImportantSectionOut(str){ return str.split(" !important")[0]; }
function isOurCustomRedOutline(parentMedia, propertyName, propertyValue){ return (parentMedia == "" && propertyName == "outline" && propertyValue == "rgb(255, 0, 0) dashed 2px"); }

function getAllStylesOnSingleElement(rules, computedStyles){

	// Map: {MediaType -> Map of {Property  -> [Value, Priority]}}
	let stylesMap = new Map(String.prototype, new Map(String.prototype, [String.prototype]));
	stylesMap.set("", new Map(String.prototype, [String.prototype]));

	// Assured list of properties 
	['font-family','font-size', 'color'].forEach(propName => {
		let prop_value = computedStyles.getPropertyValue(propName)
		stylesMap.get("").set(propName,  [filterNotImportantSectionOut(prop_value), 0])
	})

	for (var i = 0; i < rules.length; i++) {
		let parentMedia = ((rules[i].media.includes('screen')) ? rules[i].media : "");
		if(!stylesMap.has(parentMedia)){ stylesMap.set(parentMedia, new Map(String.prototype, [String.prototype]))}
		let properties = rules[i].content.replace(/.*\{|\}/gi,''); // REGEX: all items within curly braces
		propArr = properties.split(";");

		for(let i = 0; i < propArr.length; i++){
			let prop = propArr[i].split(":")
			if(prop.length < 2) continue;
			let propertyName = prop[0].toString().trim();
			let propertyValue = prop[1].toString().trim();
			if(isOurCustomRedOutline(parentMedia, propertyName, propertyValue)){ continue; }
			stylesMap.get(parentMedia).set(propertyName, [filterNotImportantSectionOut(propertyValue), 0]);
		}
	}	
	return stylesMap;
}

// #region Premium Function
function getAllSpecialStylesOnSingleElement(rules){

	let stylesMap = new Map(String.prototype, new Map(String.prototype, new Map(String.prototype, [String.prototype])));

	for (var i = 0; i < rules.length; i++) {
		let ruleSelectorText = rules[i].selectorText; 
		let parentMedia = ((rules[i].media.includes('screen')) ? rules[i].media : "");

		// Populating the Map
		if(!stylesMap.has(ruleSelectorText)){ stylesMap.set(ruleSelectorText, new Map(String.prototype, new Map(String.prototype, [String.prototype]))); }
		if(!stylesMap.get(ruleSelectorText).has(parentMedia)){ stylesMap.get(ruleSelectorText).set(parentMedia, new Map(String.prototype, [String.prototype]))}
	
		let innerMap = stylesMap.get(ruleSelectorText).get(parentMedia);
		let properties = rules[i].content.replace(/.*\{|\}/gi,''); 
		propArr = properties.split(";");

		for(let i = 0; i < propArr.length; i++){
			let prop = propArr[i].split(":")
			if(prop.length < 2) continue;
			let propertyName = prop[0].toString().trim();
			let propertyValue = prop[1].toString().trim();
			innerMap.set(propertyName, [filterNotImportantSectionOut(propertyValue), 0]);
		}
	}	
	return stylesMap;
}
// #endregion 

function parseStyleSheets(block){
	var arr = GetAllSubElements(elementMap.get(block));
	var text = ""; 
    const seenItems = new Set();

	for(let j = 0; j < arr.length; j++){
		var elem = arr[j];
		var rules = MEJSX.getCustomCssRulesOnElement(elem);
		// Logic where you format CSS
		for (var i = 0; i < rules.length; i++) {
			var default_tab = "";
			var one_tab_more = "    "		
			var closingBrace = false; 
            if (!seenItems.has(rules[i].selectorText) || rules[i].media.includes('screen')) {
                seenItems.add(rules[i].selectorText);

			if(rules[i].media.includes('screen')){
				text += '\n@media ' +  rules[i].media  + '{';
				default_tab = "    "
				one_tab_more = "        "
				closingBrace = true; 
			}

			text += "\n" + default_tab + rules[i].selectorText + " {"

			var properties = rules[i].content.replace(/.*\{|\}/gi,''); // REGEX: all items within curly braces
			propArr = properties.split(";");

			for(let i = 0; i < propArr.length; i++){
				if(i == propArr.length-1 && propArr[i].split(":").length < 2) continue;  // Handle edge case where last element is a newline 
				text += "\n" + one_tab_more + propArr[i] + ';'; 
			}
			text +=  "\n" + default_tab + "}" + "\n"
			if(closingBrace) text += '}';
		}	
	}
	}
	return text; 
}

function parseHTML(block){
	var blockval = (elementMap.get(block)); 
	var tmp = blockval.cloneNode(true)
	var classes = ["css-scanner-parent-container", "css-scanner-viewer-block"]; 

	classes.forEach(item => {
		const elements = tmp.getElementsByClassName(item);
		while(elements.length > 0){
			elements[0].parentNode.removeChild(elements[0]);
		}
		});
	return tmp.outerHTML.toString();
}

// If isElementMatchWithCssRule - filter the selector text to only include relevant values (used later for ordering css rules)
function filteredSelectorText(element, cssSelector) {
	// If there is only one selector (no list)
	var arrSelectors = cssSelector.split(",")
	if(arrSelectors.length <= 1) return cssSelector

	var proto = Element.prototype;
	var matches = Function.call.bind(proto.matchesSelector ||
		proto.mozMatchesSelector || proto.matches ||
		proto.msMatchesSelector || proto.oMatchesSelector);

	for(let i = 0; i < arrSelectors.length; i++){
		try{ if(matches(element, arrSelectors[i])){ return arrSelectors[i]; } }catch(e){}
	}
	return "";
};

function filteredPseudoSelectorText(element, cssSelector){
	var proto = Element.prototype;
	var matches = Function.call.bind(proto.matchesSelector ||
		proto.mozMatchesSelector || proto.matches ||
		proto.msMatchesSelector || proto.oMatchesSelector);

	var arrSelectors = cssSelector.split(",")
	for(let i = 0; i < arrSelectors.length; i++){
		var doubleColon = arrSelectors[i].split('::');
		if(doubleColon.length == 2){ 
			try{ if(matches(element, doubleColon[0])){ return arrSelectors[i]; } }catch(e){}
		}else{
			var singleColon = arrSelectors[i].split(':')
			if(singleColon.length == 2){ 
				try{ if(matches(element, singleColon[0])){ return arrSelectors[i]; } }catch(e){}
			}
		}	
	}
	return "";
}
	
var MEJSX = function() {

	Object.prototype.getName = function() {
	  var funcNameRegex = /function (.{1,})\(/;
	  var results = (funcNameRegex).exec((this).constructor.toString());
	  return (results && results.length > 1) ? results[1] : "";
	};
  
	var getCustomCssRulesOnElement = function(elm) {
	  var slice = Function.call.bind(Array.prototype.slice);
  
	  var isCssMediaRule = function(cssRule) {
		return cssRule.getName() === 'CSSMediaRule';
	  }
  
	  // Matches all style rules including the :: ones
	  var isCssStyleRule = function(cssRule) {
		return cssRule.getName() === 'CSSStyleRule';
	  }

	  // Here we get the cssRules across all the stylesheets in one array
	  CSS_Scanner_security_issue_occ = false; 
	  var cssRules = slice(document.styleSheets).reduce(function(rules, styleSheet) {
		try{
			return rules.concat(slice(styleSheet.cssRules));
		}catch(err) {
			CSS_Scanner_security_issue_occ = true;
			return rules
		}
	  }, []);
  
	  var mediaRules = cssRules.filter(isCssMediaRule);
	  cssRules = cssRules.filter(isCssStyleRule);
  
	  cssRules = cssRules.concat(slice(mediaRules).reduce(function(rules, mediaRule) {
		return rules.concat(slice(mediaRule.cssRules));
	  }, []));
    
	  // get only the css rules that matches that element
	  var rulesOnElement = cssRules.filter(isElementMatchWithCssRule.bind(null, elm));
	  var pseudoRulesOnElement = cssRules.filter(isElementMatchWithPseudoCssRule.bind(null, elm)); // All ::, : rules

	  var elementRules = [];

	  var elementRule = function(order, content, media, selectorText, isPseudoRule) {
		if (media === undefined || media == null || media == '') { media = 'all'; }
		this.order = order;
		this.content = content;
		this.media = media;
		this.selectorText = selectorText;
		this.isPseudoRule = isPseudoRule;  
	}

	  if (rulesOnElement.length) {
		for (var i = 0; i < rulesOnElement.length; i++) {

		  var e = rulesOnElement[i];
		  var order = i;
		  var content = e.cssText;

		  var selectorText = filteredSelectorText(elm, e.selectorText)
		  if(selectorText == "") selectorText = e.selectorText
		  var media = e.parentRule == null ? e.parentStyleSheet == null ? 'all' : e.parentStyleSheet.media.mediaText : e.parentRule.media.mediaText;
		  
		  var _elementRule = new elementRule(order, content, media, selectorText, false);
		  elementRules.push(_elementRule);
		}
	  }
	  if(pseudoRulesOnElement.length) {
		for (var i = 0; i < pseudoRulesOnElement.length; i++) {

			var e = pseudoRulesOnElement[i];
			var order = i;
			var content = e.cssText;
  
			var selectorText = filteredPseudoSelectorText(elm, e.selectorText)
			if(selectorText == "") selectorText = e.selectorText
			var media = e.parentRule == null ? e.parentStyleSheet == null ? 'all' : e.parentStyleSheet.media.mediaText : e.parentRule.media.mediaText;
			
			var _elementRule = new elementRule(order, content, media, selectorText, true);
			elementRules.push(_elementRule);
		  }
	  }
	  if (elm.getAttribute('style')) {
		var _elementRule = new elementRule(rulesOnElement.length, 'style {' + elm.getAttribute('style') + '}', null, "inline-style")
		elementRules.push(_elementRule);
	  }
	  return elementRules;
	};
  
	var isElementMatchWithCssRule = function(element, cssRule) {
	  var proto = Element.prototype;
	  var matches = Function.call.bind(proto.matchesSelector ||
		proto.mozMatchesSelector || proto.matches ||
		proto.msMatchesSelector || proto.oMatchesSelector);
		try{ return matches(element, cssRule.selectorText); } catch(err){ return false; }
	};
	  
	var isElementMatchWithPseudoCssRule = function(element, cssRule) {
		var proto = Element.prototype;
		var matches = Function.call.bind(proto.matchesSelector ||
		  proto.mozMatchesSelector || proto.matches ||
		  proto.msMatchesSelector || proto.oMatchesSelector);

		if(cssRule == undefined || cssRule.selectorText == undefined){ return false; }
		var arrSelectors = cssRule.selectorText.split(",")
		for(let i = 0; i < arrSelectors.length; i++){
			var doubleColon = arrSelectors[i].split('::');
			if(doubleColon.length == 2){ 
				try{ if(matches(element, doubleColon[0])){ return true; }}catch(e){}
			}
			else{
				var singleColon = arrSelectors[i].split(':')
				if(singleColon.length == 2){ 
					try{ if(matches(element, singleColon[0])){ return true; }}catch(e){}
				}
			}
	  }
	  return false; 
	};	

	return {
	  getCustomCssRulesOnElement: function(element) {
		return getCustomCssRulesOnElement(element);
	  }
	}
  }()
// #endregion

// Handle Clicks
document.onkeydown = CssScannerKeyMap;

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.text === 'are_you_there_content_script_css_scanner?') {
      sendResponse({status: "yes"});
	  OpenCSS_Scanner() 
    }
});
