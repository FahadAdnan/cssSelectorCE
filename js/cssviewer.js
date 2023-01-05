
// #region Constants

var defaultPropertyValueMap = new Map([
    ['font-weight','400'],
    ['font-variant','normal'],
    ['font-style','normal'],
    ['letter-spacing','normal'],
    ['line-height','normal'],
    ['text-decoration','none'],
    ['text-align','start'],
    ['text-indent','0px'],
	['transform', 'none'], 
	['transition', 'all 0s ease 0s'],
    ['text-transform','none'],
    ['vertical-align','baseline'],
    ['white-space','normal'],
    ['word-spacing','normal'],
    //Color And Background Stuff
    ['background-color','transparent'],
    ['background-attachment','scroll'],
    ['background-image','none'],
    // Background stuff
    ['background-position',''],
    ['background-repeat','repeat'],
    ['border-top-style', 'none'],
    ['margin','0 0 0 0'],
    ['padding','0 0 0 0'],
    ['min-height','0px'],
    ['max-height','none'],
    ['min-width','0px'],
    ['max-width','none'],
    // Positioning 
    ['position','static'],
    ['top','auto'],
    ['bottom','auto'],
    ['right','auto'],
    ['left','auto'],
    ['float','none'],
    ['display'],
    ['clear','none'],
    ['z-index','auto'],
    // Table 
    ['border-collapse','separate'],
    ['border-spacing','0px 0px'],
    ['caption-side','top'],
    ['empty-cells','show'],
    ['table-layout','auto'],
    ['overflow','visible'],
    ['cursor','auto'],
    ['visibility','visible'], 
    ['outline-offset','0px'], 
    ['box-sizing','content-box'], 
    ['resize','none'], 
    ['text-shadow' ,'none'], 
    ['text-overflow' ,'clip'], 
    ['word-wrap' ,'normal'], 
    ['box-shadow','none'],
    ['border-top-left-radius','0px'], 
    ['border-top-right-radius' ,'0px'], 
    ['border-bottom-left-radius' ,'0px'], 
    ['border-bottom-right-radius','0px']
]);

var CSS_Scanner_newVals = new Array(
	'accent-color', //auto 
	'align-content', //stretch
	'align-items', //stretch
	'align-self', //auto 
	'all', //none
	'animation', //none 0 ease 0 1 normal none running
	'animation-delay', //0s 
	'animation-direction', //normal
	'animation-duration', //0
	'animation-fill-mode', //none
	'animation-iteration-count', //1
	'animation-name', //none
	'animation-play-state', //running
	'animation-timing-function', //ease
	'aspect-ratio', //auto
	'backdrop-filter', //none
	'backface-visibility', //visible
	'background', //auto
	'background-attachment', //scroll
	'background-blend-mode', //normal
	'background-clip', //border-box
	'background-color', //transparent
	'background-image', //none
	'background-origin', //padding-box
	'background-position', //0% 0%
	'background-position-x', //0%
	'background-position-y', //padding-box
	'background-repeat', //repeat
	'background-size', //auto
	'block-size', //auto
	//continue from here 
);
var CSS_Scanner_pFont = new Array(
	'font-family', 
	'font-size', 
	'font-style', 
	'font-variant', 
	'font-weight', 
	'letter-spacing', 
	'line-height', 
	'text-decoration', 
	'text-align', 
	'text-indent', 
	'text-transform', 
	'vertical-align', 
	'white-space', 
	'word-spacing'
);

var CSS_Scanner_pColorBg = new Array(
	'background-attachment', 
	'background-color', 
	'background-image',
	'background-position',
	'background-repeat',
	'color', 
);

var CSS_Scanner_pBox = new Array(
	'height',
	'width',
	'border',
	'border-top',
	'border-right',
	'border-bottom', 
	'border-left',
	'margin',
	'padding',
	'max-height',
	'min-height',
	'max-width',
	'min-width',
);

var CSS_Scanner_pPositioning = new Array(
	'position', 
	'top', 
	'bottom', 
	'right', 
	'left', 
	'float', 
	'display', 
	'clear', 
	'z-index', 
);

var CSS_Scanner_pList = new Array(
	'list-style-image', 
	'list-style-type', 
	'list-style-position'
);

var CSS_Scanner_pTable = new Array(
	'border-collapse',
	'border-spacing',
	'caption-side',
	'empty-cells',
	'table-layout'
);

var CSS_Scanner_pMisc = new Array(
	'overflow', 
	'cursor', 
	'visibility'
);

var CSS_Scanner_pEffect = new Array(
	'transform',
	'transition',
	'outline',
	'outline-offset',
	'box-sizing',
	'resize',
	'text-shadow',
	'text-overflow',
	'word-wrap',
	'box-shadow',
	'border-top-left-radius',
	'border-top-right-radius',
	'border-bottom-left-radius',
	'border-bottom-right-radius'
);

// CSS Property categories
var CSS_Scanner_categories = { 
	'pFontText'    : CSS_Scanner_pFont, 
	'pColorBg'     : CSS_Scanner_pColorBg, 
	'pBox'         : CSS_Scanner_pBox, 
	'pPositioning' : CSS_Scanner_pPositioning, 
	'pList'        : CSS_Scanner_pList, 
	'pTable'       : CSS_Scanner_pTable, 
	'pMisc'        : CSS_Scanner_pMisc, 
	'pEffect'      : CSS_Scanner_pEffect 
};

var CSS_Scanner_categoriesTitle = { 
	'pFontText'    : 'Font & Text', 
	'pColorBg'     : 'Color & Background', 
	'pBox'         : 'Box', 
	'pPositioning' : 'Positioning', 
	'pList'        : 'List', 
	'pTable'       : 'Table', 
	'pMisc'        : 'Miscellaneous', 
	'pEffect'      : 'Effects' 
};

// Table tagnames
var CSS_Scanner_tableTagNames = new Array(
	'table',
	'caption',
	'thread',
	'tbody',
	'tfoot',
	'colgroup',
	'col',
	'tr',
	'th',
	'td'
);

var CSS_Scanner_listTagNames = new Array(
	'ul',
	'li',
	'dd',
	'dt',
	'ol'
);

// Hexadecimal
var CSS_Scanner_hexa = new Array(
	'0',
	'1',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
	'A',
	'B',
	'C',
	'D',
	'E',
	'F'
);

// #endregion

// #region Util Functoins

function GetCurrentDocument() { return window.document; }
function GetCSSProperty(element, property){ return element.getPropertyValue(property); }


function isPropertyNotEqualToDefault(element, type)
{
	if(defaultPropertyValueMap.has(type)){ 
		return (GetCSSProperty(element, type) != null &&  GetCSSProperty(element, type) != defaultPropertyValueMap.get(type)); 
	}
	else{ return GetCSSProperty(element, type); }
}

function setBlockCursorStyle(cursorstyle){
	Array.from(document.getElementsByClassName("css-scanner-viewer-block")).forEach(
		function(element, index, array) {
			element.style.cursor = cursorstyle
		}
	)
}

function last(array) {
    return array[array.length - 1];
}

function IsInArray(array, name)
{
	for (var i = 0; i < array.length; i++) {
		if (name == array[i])
			return true;
	}

	return false;
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

	for (var i = 0; i < hexValues.length; i++) {
		hexStr += DecToHex(hexValues[i]);
	}
	
	if( hexStr == "#00000000" ){
		hexStr = "#FFFFFF";
	}
	
	hexStr = '<span style="border: 1px solid #000000 !important;width: 8px !important;height: 8px !important;display: inline-block !important;background-color:'+ hexStr +' !important;"></span> ' + hexStr;

	return hexStr;
}

function GetFileName(str)
{
	var start = str.search(/\(/) + 1;
	var end = str.search(/\)/);

	str = str.slice(start, end);

	var path = str.split('/');
	
	return path[path.length - 1];
}

function RemoveExtraFloat(nb)
{
	nb = nb.substr(0, nb.length - 2);

	return Math.round(nb) + 'px';
}

// #endregion

// #region Globals variables
var CSS_Scanner_element
var CSS_Scanner_element_cssDefinition
var CSS_Scanner_current_element
var CSS_Scanner_has_document_event_listeners = true // Switch to false - should set to true/false once start/pause are implemented
var CSS_Scanner_on_custom_element = false
var CSS_Scanner_is_closed = true 
var elementMap = new Map([]); 
// #endregion

// #region CSS Property: Value Setter Functions
function SetCSSProperty(element, property)
{
	var document = GetCurrentDocument();
	var li = last(document.getElementsByClassName('CSS_Scanner_' + property));
	if(li != undefined){
		li.style.display = 'flex';
		li.lastChild.innerHTML = ": " + element.getPropertyValue(property);
	}
}

function SetCSSPropertyIf(element, property, condition)
{
	var document = GetCurrentDocument();
	var li = last(document.getElementsByClassName('CSS_Scanner_' + property));
	if(li != undefined){
		if (condition) {
			li.lastChild.innerHTML =  ": " + element.getPropertyValue(property);
			li.style.display = 'flex';
			return 1;
		}
		else {
			li.style.display = 'none';
			return 0;
		}
	}
}

function SetCSSPropertyValue(element, property, value)
{
	var document = GetCurrentDocument();
	var li = last(document.getElementsByClassName('CSS_Scanner_' + property));
	if(li != undefined){
		li.lastChild.innerHTML =  ": " + value;
		li.style.display = 'flex';
	}
}

function SetCSSPropertyValueIf(element, property, value, condition)
{
	var document = GetCurrentDocument();
	var li = last(document.getElementsByClassName('CSS_Scanner_' + property));
	if(li != undefined){

		if (condition) {
			li.lastChild.innerHTML =  ": " + value;
			li.style.display = 'flex';
			return 1;
		}
		else {
			li.style.display = 'none';
			return 0;
		}
	}
}

//#endregion

// #region CSS Show/Hide Property Functions
function HideCSSProperty(property)
{
	var document = GetCurrentDocument();
	var li = last(document.getElementsByClassName('CSS_Scanner_' + property));
	if(li != undefined){
		li.style.display = 'none';
	}
}

function HideCSSCategory(category)
{
	var document = GetCurrentDocument();
	var div = last(document.getElementsByClassName('CSS_Scanner_' + category));
	div.style.display = 'none';
}

function ShowCSSCategory(category)
{
	var document = GetCurrentDocument();
	var div = last(document.getElementsByClassName('CSS_Scanner_' + category));
	div.style.display = 'flex';
}
// #endregion 

// #region Update Functions 

function UpdateSubHeadings(element){
	var fontStyle = element.getPropertyValue('font-family').split(" ")[0];
	var fontSize = element.getPropertyValue('font-size');

	var height = ((element.naturalHeight == undefined) ? element.getPropertyValue('height') : element.naturalHeight + "px");
	var width = ((element.naturalWidth == undefined) ? element.getPropertyValue('width') : element.naturalWidth + "px");

	var header = last(document.getElementsByClassName('css-scanner-viewer-block')).firstChild;
	try {
		header.childNodes[1].lastChild.innerHTML = '&nbsp;' + height + " " + width; 
		header.childNodes[2].lastChild.innerHTML = '&nbsp;' + fontStyle + " " + fontSize;
	} catch(err) {
		console.log("Error: CSS_Scanner: error setting subtitles " + err);
	}
}

function UpdatefontText(element)
{
	let assuredList = ['font-family','font-size']
	let possibleList = [
		'font-weight','font-variant','font-style','letter-spacing',
		'line-height','text-decoration','text-align','text-indent','text-transform',
		'vertical-align','white-space','word-spacing'
	]
	for(let prop in assuredList) { SetCSSProperty(element, assuredList[prop]); }
	for(let prop in possibleList) { SetCSSPropertyIf(element, possibleList[prop], isPropertyNotEqualToDefault(element, possibleList[prop]));}
}

function UpdateColorBg(element)
{
	// Color
	SetCSSPropertyValue(element, 'color', RGBToHex(GetCSSProperty(element, 'color')));

	// Background
	SetCSSPropertyValueIf(element, 'background-color', RGBToHex(GetCSSProperty(element, 'background-color')), GetCSSProperty(element, 'background-color') != 'transparent');
	SetCSSPropertyValueIf(element, 'background-image', GetFileName(GetCSSProperty(element, 'background-image')), GetCSSProperty(element, 'background-image') != 'none');

	// Other
	var possibleColorBgList = ['background-attachment', 'background-position' ,'background-repeat' ]
	for (let prop in possibleColorBgList) { SetCSSPropertyIf(element, possibleColorBgList[prop], isPropertyNotEqualToDefault(element, possibleColorBgList[prop]));}
}

function UpdateBox(element)
{
	// Width/Height
	SetCSSPropertyIf(element, 'height', RemoveExtraFloat(GetCSSProperty(element, 'height')) != 'auto');
	SetCSSPropertyIf(element, 'width', RemoveExtraFloat(GetCSSProperty(element, 'width')) != 'auto');

	// Border
	var borderTop    = RemoveExtraFloat(GetCSSProperty(element, 'border-top-width')) + ' ' + GetCSSProperty(element, 'border-top-style') + ' ' + RGBToHex(GetCSSProperty(element, 'border-top-color'));
	var borderBottom = RemoveExtraFloat(GetCSSProperty(element, 'border-bottom-width')) + ' ' + GetCSSProperty(element, 'border-bottom-style') + ' ' + RGBToHex(GetCSSProperty(element, 'border-bottom-color'));
	var borderRight  = RemoveExtraFloat(GetCSSProperty(element, 'border-right-width')) + ' ' + GetCSSProperty(element, 'border-right-style') + ' ' + RGBToHex(GetCSSProperty(element, 'border-right-color'));
	var borderLeft   = RemoveExtraFloat(GetCSSProperty(element, 'border-left-width')) + ' ' + GetCSSProperty(element, 'border-left-style') + ' ' + RGBToHex(GetCSSProperty(element, 'border-left-color'));

	if (borderTop == borderBottom && borderBottom == borderRight && borderRight == borderLeft && GetCSSProperty(element, 'border-top-style') != 'none') {
		SetCSSPropertyValue(element, 'border', borderTop);

		HideCSSProperty('border-top');
		HideCSSProperty('border-bottom');
		HideCSSProperty('border-right');
		HideCSSProperty('border-left');
	}
	else {
		SetCSSPropertyValueIf(element, 'border-top'   , borderTop   , GetCSSProperty(element, 'border-top-style') != 'none');
		SetCSSPropertyValueIf(element, 'border-bottom', borderBottom, GetCSSProperty(element, 'border-bottom-style') != 'none');
		SetCSSPropertyValueIf(element, 'border-right' , borderRight , GetCSSProperty(element, 'border-right-style') != 'none');
		SetCSSPropertyValueIf(element, 'border-left'  , borderLeft  , GetCSSProperty(element, 'border-left-style') != 'none');

		HideCSSProperty('border');
	}
	
	// Margin
	var marginTop    = RemoveExtraFloat(GetCSSProperty(element, 'margin-top'));
	var marginBottom = RemoveExtraFloat(GetCSSProperty(element, 'margin-bottom'));
	var marginRight  = RemoveExtraFloat(GetCSSProperty(element, 'margin-right'));
	var marginLeft   = RemoveExtraFloat(GetCSSProperty(element, 'margin-left'));
	var margin       = (marginTop == '0px' ? '0' : marginTop) + ' ' + (marginRight == '0px' ? '0' : marginRight) + ' '  + (marginBottom == '0px' ? '0' : marginBottom) + ' '  + (marginLeft == '0px' ? '0' : marginLeft);

	SetCSSPropertyValueIf(element, 'margin', margin, margin != '0 0 0 0');

	// padding
	var paddingTop    = RemoveExtraFloat(GetCSSProperty(element, 'padding-top'));
	var paddingBottom = RemoveExtraFloat(GetCSSProperty(element, 'padding-bottom'));
	var paddingRight  = RemoveExtraFloat(GetCSSProperty(element, 'padding-right'));
	var paddingLeft   = RemoveExtraFloat(GetCSSProperty(element, 'padding-left'));
	var padding       = (paddingTop == '0px' ? '0' : paddingTop) + ' ' + (paddingRight == '0px' ? '0' : paddingRight) + ' '  + (paddingBottom == '0px' ? '0' : paddingBottom) + ' '  + (paddingLeft == '0px' ? '0' : paddingLeft);

	SetCSSPropertyValueIf(element, 'padding', padding, padding != '0 0 0 0');

	// Max/Min Width/Height
	let possibleBoxList = ['min-height', 'max-height', 'min-width', 'max-width']
	for (let prop in possibleBoxList) { SetCSSPropertyIf(element, possibleBoxList[prop], isPropertyNotEqualToDefault(element, possibleBoxList[prop]));}
}

function UpdatePositioning(element)
{
	SetCSSProperty(element, 'display');
	let possiblePositionList = ['position','top','bottom','right','left','float','clear','z-index']
	for (var prop in possiblePositionList) { SetCSSPropertyIf(element, possiblePositionList[prop], isPropertyNotEqualToDefault(element, possiblePositionList[prop]));}
}

function UpdateTable(element, tagName)
{
	if (IsInArray(CSS_Scanner_tableTagNames, tagName)) {
		var nbProperties = 0;

		let possibleTableList = ['border-collapse', 'border-spacing', 'caption-side', 'empty-cells',  'table-layout']
		for (let prop in possibleTableList) { nbProperties += SetCSSPropertyIf(element, possibleTableList[prop], isPropertyNotEqualToDefault(element, possibleTableList[prop]));}

		if (nbProperties > 0) ShowCSSCategory('pTable');
		else HideCSSCategory('pTable');
	}
	else {
		HideCSSCategory('pTable');
	}
}

function UpdateList(element, tagName)
{
	if (IsInArray(CSS_Scanner_listTagNames, tagName)) {
		ShowCSSCategory('pList');

		var listStyleImage = GetCSSProperty(element, 'list-style-image');

		if (listStyleImage == 'none') {
			SetCSSProperty(element, 'list-style-type');
			HideCSSProperty('list-style-image');
		}
		else {
			SetCSSPropertyValue(element, 'list-style-image', listStyleImage);
			HideCSSProperty('list-style-type');
		}
		SetCSSProperty(element, 'list-style-position');
	}
	else {
		HideCSSCategory('pList');
	}
}

function UpdateMisc(element)
{
	var nbProperties = 0;

	let possibleMiscList = ['overflow', 'cursor', 'visibility'];
	for (var prop in possibleMiscList) { nbProperties += SetCSSPropertyIf(element, possibleMiscList[prop], isPropertyNotEqualToDefault(element, possibleMiscList[prop]));}

	if (nbProperties > 0) ShowCSSCategory('pMisc');
	else HideCSSCategory('pMisc');
}

function UpdateEffects(element)
{
	var nbProperties = 0;
	var possibleEffectList = ['transform','transition','outline','outline-offset','box-sizing','resize',
						'text-shadow','text-overflow','word-wrap','box-shadow','border-top-left-radius',
						'border-top-right-radius', 'border-bottom-left-radius','border-bottom-right-radius']

	for (let prop in possibleEffectList) { nbProperties += SetCSSPropertyIf(element, possibleEffectList[prop], isPropertyNotEqualToDefault(element, possibleEffectList[prop]));}
	if (nbProperties > 0) ShowCSSCategory('pEffect');
	else HideCSSCategory('pEffect');
}

// #endregion 

// #region Event Handlers

function AddPropertyValuesToCssDefinitions(typeArray, element){
	for (var i = 0; i < typeArray.length; i++){
		if(isPropertyNotEqualToDefault(element, typeArray[i])){
			CSS_Scanner_element_cssDefinition += "\t" + typeArray[i] + ': ' + element.getPropertyValue( typeArray[i] ) + ";\n";
		}
	}
}

function CSS_ScannerMouseOver(e)
{
	// Block
	var document = GetCurrentDocument();
	var block = last(document.getElementsByClassName('css-scanner-viewer-block'));
	if( ! block ){ return; }
	elementMap.set(block, this)
	// Initial Logic to decide whether to show the popup:
	if(this != undefined && (this.classList.contains("css-scanner-viewer-block") || this.id == "css-scanner-floating-options")){
		CSS_Scanner_on_custom_element = true 
		block.style.display = "none"
		return;
	}else if(CSS_Scanner_on_custom_element){ return; } // Ignore all elements while you're on a custom element
	else{ block.style.display = "flex" }

	//GETTING HTML::: 
	//console.log('zayd::: ' + this.tagName + " ::: "+ this.outerHTML);  
	//note: css scanner also adds inherited-styles-for-exported-element <- figure out why 
	
	//console.log('zayd' + this.classList)
	//block.firstChild.innerHTML = '&lt;' + this.tagName.toLowerCase() + '&gt;' + (this.id == '' ? '' : ' #' + this.id) + (this.className == '' ? '' : ' .' + this.className);
	block.firstChild.firstChild.firstChild.innerHTML = '&lt;' + this.tagName.toLowerCase() + '&gt;';

	// Outline element
	if (this.tagName != 'body') {
		this.style.outline = '1px dashed #f00';
		CSS_Scanner_current_element = this;
	}
	
	// Updating CSS properties
	var element = document.defaultView.getComputedStyle(this, null);

	//These all commented out cause parser wont work with them in 

	UpdateSubHeadings(element)
	UpdatefontText(element);
	UpdateColorBg(element);
	UpdateBox(element);
	UpdatePositioning(element);
	UpdateTable(element, this.tagName);
	UpdateList(element, this.tagName);
	UpdateMisc(element);
	UpdateEffects(element);

	CSS_Scanner_element = this;

	cssScannerRemoveElement("cssScannerInsertMessage");

	e.stopPropagation();

	// generate simple css definition
	CSS_Scanner_element_cssDefinition = this.tagName.toLowerCase() + (this.id == '' ? '' : ' #' + this.id) + (this.className == '' ? '' : ' .' + this.className) + " {\n";

	var listOfHeaders = [
		"\t/* Font & Text */\n",  "\n\t/* Color & Background */\n", "\n\t/* Box */\n", 
		"\n\t/* Positioning */\n", "\n\t/* List */\n", "\n\t/* Table */\n",
		"\n\t/* Miscellaneous */\n", "\n\t/* Effects */\n"
	]
	var listOfTypeArrays = [
		CSS_Scanner_pFont, CSS_Scanner_pColorBg, CSS_Scanner_pBox, CSS_Scanner_pPositioning,
		CSS_Scanner_pList, CSS_Scanner_pTable, CSS_Scanner_pMisc, CSS_Scanner_pEffect,
	]
	for(var i = 0; i < listOfHeaders.length; i++){
		CSS_Scanner_element_cssDefinition += listOfHeaders[i];
		AddPropertyValuesToCssDefinitions(listOfTypeArrays[i], element);
	}
	CSS_Scanner_element_cssDefinition += "}";

	// console.log( element.cssText ); //< debug the hovered el css
}

function CSS_ScannerMouseOut(e)
{
	if(this != undefined && (this.classList.contains("css-scanner-viewer-block") || this.id == "css-scanner-floating-options")){
		CSS_Scanner_on_custom_element = false 
		return;
	}
	this.style.outline = '';

	e.stopPropagation();
}

function CSS_ScannerMouseMove(e)
{
	if(this == undefined || CSS_Scanner_on_custom_element || this.classList.contains("css-scanner-viewer-block") || this.id == "css-scanner-floating-options" ){return;}
	
	var document = GetCurrentDocument();
	var block = last(document.getElementsByClassName('css-scanner-viewer-block'));

	if( ! block ){ return; }

	block.style.display = 'flex';
	
	var pageWidth = window.innerWidth;
	var pageHeight = window.innerHeight;
	var blockWidth = 332;
	var blockHeight = document.defaultView.getComputedStyle(block, null).getPropertyValue('height');

	blockHeight = blockHeight.substr(0, blockHeight.length - 2) * 1;

	if ((e.pageX + blockWidth) > pageWidth) {
		if ((e.pageX - blockWidth - 10) > 0)
			block.style.left = e.pageX - blockWidth - 40 + 'px';
		else
			block.style.left = 0 + 'px';
	}
	else
		block.style.left = (e.pageX + 20) + 'px';

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
	div.classList.add("css-scanner-primary-text", "css-scanner-subheading-text", "css-scanner-flex-subheading");
	var img = document.createElement("img")
	img.src = chrome.runtime.getURL(image_path)
	div.appendChild(img)
	div.appendChild(document.createElement('span'));
	return div
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
			
			// Insert a title for CSS selector

			var header = document.createElement('div');
			var subheader = document.createElement('div');

			header.classList.add("css-scanner-header");
			subheader.classList.add("css-scanner-subheader");

			var title = document.createElement('h1');
			title.classList.add("css-scanner-primary-text", "css-scanner-title")
			title.id = 'CSS_Scanner_title'; 
			title.appendChild(document.createTextNode(''));
			
			var code_btn = header_button("../img/code.svg")
			var copy_btn = header_button("../img/copy.svg")
			var trash_btn = header_button("../img/trash.svg")

			//TODO - Add On-Clicks for code_btn and copy_btn
			trash_btn.addEventListener("click", function () {
				RemoveEventListners(block)
				block.remove();
			});
			copy_btn.addEventListener("click", function(){
				parseStyleSheets(block)
			}); 
			subheader.append(title, code_btn, copy_btn, trash_btn);

			header.appendChild(subheader); 

 			var size_sub_heading = sub_headings_text("../img/size.svg")
			var font_sub_heading = sub_headings_text("../img/font.svg");

			header.appendChild(size_sub_heading);
			header.appendChild(font_sub_heading);

			block.appendChild(header);
			
			// Insert all properties
			var center = document.createElement('div');

		
			for (var cat in CSS_Scanner_categories) {
				var div = document.createElement('div');

				div.className = 'CSS_Scanner_' + cat;
				// var h2 = document.createElement('h2');
				// h2.appendChild(document.createTextNode(CSS_Scanner_categoriesTitle[cat]));

				var ul = document.createElement('ul');
				ul.classList.add("css-scanner-ul")
				var properties = CSS_Scanner_categories[cat];

				for (var i = 0; i < properties.length; i++) {
				
					var li = document.createElement('li');
					if(li != undefined){
						li.className = 'CSS_Scanner_' + properties[i];
						li.style.display = 'none';
					}
					var span_property = document.createElement('span');
					span_property.classList.add("css-scanner-primary-text", "css-scanner-property-name");
					span_property.appendChild(document.createTextNode(properties[i]));

					var span_value = document.createElement('span'); 
					span_value.classList.add("css-scanner-primary-text", "css-scanner-property-value");

					li.appendChild(span_property);
					li.appendChild(span_value)
					ul.appendChild(li);
				}
				div.appendChild(ul);
				center.appendChild(div);
			}
		
			block.appendChild(center);

			// Insert a footer
			var footer = document.createElement('div');

			footer.className = 'CSS_Scanner_footer';

			//< 
			footer.appendChild( document.createTextNode('CSS_Scanner 1.7. keys: [f] Un/Freeze. [c] Css. [Esc] Close.') ); 
			// TODO - add back in: block.appendChild(footer);
		}
		
		cssScannerInsertMessage( "CSS_Scanner loaded! Hover any element you want to inspect in the page." );

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
CSS_Scanner.prototype.Enable = function()
{
	var document = GetCurrentDocument();
	var block = last(document.getElementsByClassName('css-scanner-viewer-block'));

	new_block = this.CreateBlock();
	document.body.appendChild(new_block);
	setElementToBeDraggable(new_block);
	AddEventListners(new_block);	
	AddDocumentEventListeners();

	return true;
}

// Disable CSS_Scanner
CSS_Scanner.prototype.Disable = function()
{
	console.log("Disabling the CSS Block")
	var document = GetCurrentDocument();
	var block = last(document.getElementsByClassName('css-scanner-viewer-block'));
    var insertMessage = document.getElementById("cssScannerInsertMessage");
        
	if (block || insertMessage) {
		if(block) document.body.removeChild(block);
        if(insertMessage) document.body.removeChild(insertMessage);
		RemoveDocumentEventListeners();
		return true;
	}

	return false;
}

// #endregion 

// #region Notification Code - replace with cleaner version 

function cssScannerInsertMessage( msg )
{
	// Display the notification message
	var oNewP = document.createElement("p");
	var oText = document.createTextNode( msg );

	oNewP.appendChild(oText);
	oNewP.id                    = 'cssScannerInsertMessage';
	oNewP.style.backgroundColor = '#b40000';
	oNewP.style.color           = '#ffffff';
	oNewP.style.position        = "fixed";
	oNewP.style.top             = '10px';
	oNewP.style.left            = '10px';
	oNewP.style.zIndex          = '9999';
	oNewP.style.padding         = '3px';

	document.body.appendChild(oNewP);
}

function cssScannerRemoveElement(divid)
{   
	//Removes and element from the dom, used to remove the notification message
	var n = document.getElementById(divid);

	if(n){
		document.body.removeChild(n); 
	}
}
// #endregion

//#region Main State Functions (Pause/Continue/Open/Close/Freeze/Grid)

function PauseCSS_Scanner(){
	var state_btn = document.getElementById("css-scanner-pause-continue")
	state_btn.firstChild.innerHTML = "Continue&nbsp;"
	state_btn.lastChild.src = chrome.runtime.getURL("../img/play.svg")
	CSS_Scanner_current_element.style.outline = '';
	cssScanner.Disable();
}

function ContinueCSS_Scanner(){
	var state_btn = document.getElementById("css-scanner-pause-continue")
	state_btn.firstChild.innerHTML = "Pause&nbsp;"
	state_btn.lastChild.src = chrome.runtime.getURL("../img/pause.svg")
	cssScanner = new CSS_Scanner();
	cssScanner.Enable(); 
}

function CloseCSS_Scanner(){
	PauseCSS_Scanner()
	// Remove all the Blocks 
	var blocks = document.getElementsByClassName("css-scanner-viewer-block")
    while(blocks.length > 0){ blocks[0].parentNode.removeChild(blocks[0]); }
	// Remove option menu 
	var option_menu = document.getElementById("css-scanner-floating-options")
	option_menu.parentNode.removeChild(option_menu)
	CSS_Scanner_is_closed = true
}

function OpenCSS_Scanner(){
	console.log("Opening CSS Viewer!!")
	floatingHeaderOptions()
	cssScanner = new CSS_Scanner();
	if ( cssScanner.IsEnabled() ){ cssScanner.Disable(); }
	else{ cssScanner.Enable(); }
	CSS_Scanner_is_closed = false 
}

function FreezeCurrentBlock(){
	cssScanner = new CSS_Scanner();
	cssScanner.Enable(); 
}

function ToggleGrid(enable){
	console.log("Toggling the grid " + enable)
	let elements = GetAllSubElements(document.body)
	if(enable){ for (var i = 0; i < elements.length; i++){ elements[i].classList.add("css-scanner-red-outline") }}
	else { for (var i = 0; i < elements.length; i++){ elements[i].classList.remove("css-scanner-red-outline") }}
}
// #endregion 

// #region Click Event and Key Mapping 

function ClickEvent(e){
	if(CSS_Scanner_is_closed || !CSS_Scanner_has_document_event_listeners) return 
	var isCopyEnabled= (document.getElementById('css-scanner-onclick-copy').firstChild.checked == true);
	var isPinEnabled= (document.getElementById('css-scanner-onclick-pin').firstChild.checked == true);

	if(isCopyEnabled){ /* TODO - Add Code to copy css to clipboard */ }
	if(isPinEnabled){ FreezeCurrentBlock()}
}

function CssScannerKeyMap(e) {

	if(CSS_Scanner_is_closed){ 
		// Open Extension: (Ctrl+Shift+S) - Run Content Script 
		if(e.keyCode === 83 && (e.key === "S" || e.key === "s") && e.shiftKey && e.ctrlKey){ OpenCSS_Scanner() }
		return
	}
	// Close Extension(Escape) - delete custom added elements + event listeners 
	if(e.keyCode === 27 && e.key == "Escape"){ CloseCSS_Scanner() }

	// Pause/Continue: (Alt+Shift+S)
	if( e.keyCode === 83 && (e.key === "S" || e.key === "s") && e.shiftKey && e.altKey){
		if(CSS_Scanner_has_document_event_listeners){ PauseCSS_Scanner() }
		else{ ContinueCSS_Scanner() }	
	}

	// Freeze Current Block(Space) - create a new one and forget the old one
	if (e.keyCode === 32 && e.key == " " && CSS_Scanner_has_document_event_listeners){
		cssScanner = new CSS_Scanner();
		cssScanner.Enable(); 
		return false; // Prevent default behaviour of scrolling down
	}

	if( e.keyCode === 88 && (e.key === "X" || e.key === "x") && e.shiftKey && e.ctrlKey){
		var perf= document.getElementById('css-scanner-display-grid').firstChild;
		perf.checked = !perf.checked
		ToggleGrid(perf.checked)
	}
	// REMOVE!!! -  c: Show code css for selected element. -
	//if ( e.keyCode === 67 ){ window.prompt("Simple Css Definition :\n\nYou may copy the code below then hit escape to continue.", CSS_Scanner_element_cssDefinition); }
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
	CSS_Scanner_has_document_event_listeners = true
	setBlockCursorStyle("auto")
}

function RemoveDocumentEventListeners()
{
	var document = GetCurrentDocument();
	var elements = GetAllSubElements(document.body);

	for (var i = 0; i < elements.length; i++){ RemoveEventListners(elements[i]) }
	CSS_Scanner_has_document_event_listeners = false
	setBlockCursorStyle("move")
}

function GetAllSubElements (element)
{
	var elemArr = new Array();
		
	// Ignore all of our added CSS
	if (element && element.hasChildNodes()) {

		elemArr.push(element);
		if(element.classList.contains("css-scanner-viewer-block") || element.id == "css-scanner-floating-options") return elemArr;

		var childs = element.childNodes;

		for (var i = 0; i < childs.length; i++) {
			if (childs[i].hasChildNodes()) {
				elemArr = elemArr.concat(GetAllSubElements(childs[i]));
			}
			else if (childs[i].nodeType == 1) {
				elemArr.push(childs[i]);
			}
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

	var inner_span = document.createElement("span")
	inner_span.id = "css-scanner-span-" + type
	inner_span.innerHTML = inner_text +  "&nbsp;"

	var inner_img = document.createElement("img")
	inner_img.id = "css-scanner-image-" + type
	inner_img.src = chrome.runtime.getURL(image_path)

	btn.appendChild(inner_span);
	btn.appendChild(inner_img);
	return btn
}
function dropdownContainer(){
	var cntr = document.createElement("div")
	cntr.classList = ["css-scanner-spacing-7", "css-scanner-full-width"]
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
	divShortcut.className = "css-scanner-simple-text css-scanner-spacing-3"
	divShortcut.innerHTML = "<b>" + command + "</b> " + inner_text
	return divShortcut
}

function setStateOfSwitches(){ addEventListener
	chrome.storage.sync.get('onclick_copy', function(result) {
        var perf= document.getElementById('css-scanner-onclick-copy').firstChild;
	    var tmp = result.onclick_copy; 
        perf.checked = tmp;
        
        perf.addEventListener("change", function() {
            if(tmp) { perf.checked = false; tmp = false; chrome.storage.sync.set({'onclick_copy': false}); }
            else { perf.checked = true; tmp = true; chrome.storage.sync.set({'onclick_copy': true}); }
        });
    })
	chrome.storage.sync.get('onclick_pin', function(result) {
        var perf= document.getElementById('css-scanner-onclick-pin').firstChild;
	    var tmp = result.onclick_pin; 
        perf.checked = tmp;
        
        perf.addEventListener("change", function() {
            if(tmp) { perf.checked = false; tmp = false; chrome.storage.sync.set({'onclick_pin': false}); }
            else { perf.checked = true; tmp = true; chrome.storage.sync.set({'onclick_pin': true}); }
        });
    })
	chrome.storage.sync.get('other_child_css', function(result) {
        var perf= document.getElementById('css-scanner-other-child-css').firstChild;
	    var tmp = result.other_child_css; 
        perf.checked = tmp;
        
        perf.addEventListener("change", function() {
            if(tmp) { perf.checked = false; tmp = false; chrome.storage.sync.set({'other_child_css': false}); }
            else { perf.checked = true; tmp = true; chrome.storage.sync.set({'other_child_css': true}); }
        });
    })
	chrome.storage.sync.get('other_html_copy', function(result) {
        var perf= document.getElementById('css-scanner-other-html-copy').firstChild;
	    var tmp = result.other_html_copy; 
        perf.checked = tmp;
        
        perf.addEventListener("change", function() {
            if(tmp) { perf.checked = false; tmp = false; chrome.storage.sync.set({'other_html_copy': false}); }
            else { perf.checked = true; tmp = true; chrome.storage.sync.set({'other_html_copy': true}); }
        });
    })
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
	chrome.storage.sync.get('display_guidelines', function(result) {
        var perf= document.getElementById('css-scanner-display-guidelines').firstChild;
	    var tmp = result.display_guidelines; 
        perf.checked = tmp;
        
        perf.addEventListener("change", function() {
            if(tmp) { perf.checked = false; tmp = false; chrome.storage.sync.set({'display_guidelines': false}); }
            else { perf.checked = true; tmp = true; chrome.storage.sync.set({'display_guidelines': true}); }
        });
    })
}

function setOnClicksOfDropDown(){
	// Pause/Continue Button: 
	document.getElementById("css-scanner-pause-continue").addEventListener("click", function(){
		if(CSS_Scanner_has_document_event_listeners){ PauseCSS_Scanner() }
		else{ ContinueCSS_Scanner() }
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
	document.getElementById("css-scanner-close").addEventListener("click", function(){
		CloseCSS_Scanner();
	})	
}

function floatingHeaderOptions(){
	var parent_container = document.createElement("div")
	parent_container.id = "css-scanner-floating-options"
	
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
	onclick_sub.appendChild(dropdownSwitch("onclick-copy", " Copy Code"))
	onclick_sub.appendChild(dropdownSwitch("onclick-pin", " Pin the CSS Window"))

	var other_sub = dropdownContainer()
	other_sub.appendChild(dropdownHeader("Other Behaviour:"))
	other_sub.appendChild(dropdownSwitch("other-child-css", " Copy Child Element CSS"))
	other_sub.appendChild(dropdownSwitch("other-html-copy", " Copy HTML Code (Seperately)"))

	var display_sub = dropdownContainer()
	display_sub.appendChild(dropdownHeader("Display Behaviour:"))
	display_sub.appendChild(dropdownSwitch("display-grid", " Grid"))
	display_sub.appendChild(dropdownSwitch("display-guidelines", " Guidelines"))

	var shortcuts_sub = dropdownContainer()
	shortcuts_sub.appendChild(dropdownHeader("Shortcuts:"))
	shortcuts_sub.appendChild(dropdownShortcuts("Ctrl+Shift+S:", "Activate Extension"))
	shortcuts_sub.appendChild(dropdownShortcuts("Alt+Shift+S:", "Pause/Continue"))
	shortcuts_sub.appendChild(dropdownShortcuts("Ctrl+Shift+X::", "Toggle Grid"))
	shortcuts_sub.appendChild(dropdownShortcuts("Arrow Keys:", "Navigate through DOM"))
	shortcuts_sub.appendChild(dropdownShortcuts("ESC Key:", "Close the Extension"))

	innerSubDiv.append(onclick_sub, other_sub, display_sub, shortcuts_sub)
	dropdownDiv.appendChild(innerSubDiv)
	parent_container.appendChild(dropdownDiv)
	parent_container.appendChild(floatingHeaderButton("close", "Close the Extension", "../img/close.svg"))

	document.body.appendChild(parent_container)
	setStateOfSwitches()
	setOnClicksOfDropDown()
}

// #endregion

//#region StyleSheet Functions 
function parseStyleSheets(block){
	var arr = GetAllSubElements(elementMap.get(block));
	var text = ""; 
	for(let j = 0; j < arr.length; j++){
		var elem = arr[j];
		var rules = MEJSX.getCustomCssRulesOnElement(elem);
		for (var i = 0; i < rules.length; i++) {
			if(rules[i].media.includes('screen'))
				text += '\n\n @media ' +  rules[i].media; 
		  text += '\n\n' + rules[i].content;
		}	
	}
	console.log(text); 
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
  
	  var isCssStyleRule = function(cssRule) {
		return cssRule.getName() === 'CSSStyleRule';
	  }
  
	  // Here we get the cssRules across all the stylesheets in one array
	  var cssRules = slice(document.styleSheets).reduce(function(rules, styleSheet) {
		try {
			return rules.concat(slice(styleSheet.cssRules)); 
		} catch (err){
			console.log("err"); 
			return rules; 
			}
	  }, []);
  
	  var mediaRules = cssRules.filter(isCssMediaRule);
  
	  cssRules = cssRules.filter(isCssStyleRule);
  
	  cssRules = cssRules.concat(slice(mediaRules).reduce(function(rules, mediaRule) {
		return rules.concat(slice(mediaRule.cssRules));
	  }, []));
    
	  // get only the css rules that matches that element
	  var rulesOnElement = cssRules.filter(isElementMatchWithCssRule.bind(null, elm));
	  var elementRules = [];
	  var elementRule = function(order, content, media) {
		if (media === undefined || media == null || media == '') {
		  media = 'all';
		}
		this.order = order;
		this.content = content;
		this.media = media;
	  }
	  if (rulesOnElement.length) {
		for (var i = 0; i < rulesOnElement.length; i++) {
		  var e = rulesOnElement[i];
		  var order = i;
		  var content = e.cssText;
		  var media = e.parentRule == null ? e.parentStyleSheet == null ? 'all' : e.parentStyleSheet.media.mediaText : e.parentRule.media.mediaText;
  
		  var _elementRule = new elementRule(order, content, media);
		  elementRules.push(_elementRule);
		}
	  }
  
	  if (elm.getAttribute('style')) {
		var _elementRule = new elementRule(rulesOnElement.length, 'style {' + elm.getAttribute('style') + '}')
		elementRules.push(_elementRule);
	  }
	  return elementRules;
	};
  
	var isElementMatchWithCssRule = function(element, cssRule) {
	  var proto = Element.prototype;
	  var matches = Function.call.bind(proto.matchesSelector ||
		proto.mozMatchesSelector || proto.webkitMatchesSelector ||
		proto.msMatchesSelector || proto.oMatchesSelector);
	  return matches(element, cssRule.selectorText);
	};
  
	return {
	  getCustomCssRulesOnElement: function(element) {
		return getCustomCssRulesOnElement(element);
	  }
	}
  }()
  