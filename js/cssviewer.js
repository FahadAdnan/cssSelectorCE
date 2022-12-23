
// #region Constants

const defaultPropertyValueMap = new Map([
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

const CSSViewer_pFont = new Array(
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

const CSSViewer_pColorBg = new Array(
	'background-attachment', 
	'background-color', 
	'background-image',
	'background-position',
	'background-repeat',
	'color'
);

const CSSViewer_pBox = new Array(
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
	'min-width'
);

const CSSViewer_pPositioning = new Array(
	'position', 
	'top', 
	'bottom', 
	'right', 
	'left', 
	'float', 
	'display', 
	'clear', 
	'z-index'
);

const CSSViewer_pList = new Array(
	'list-style-image', 
	'list-style-type', 
	'list-style-position'
);

const CSSViewer_pTable = new Array(
	'border-collapse',
	'border-spacing',
	'caption-side',
	'empty-cells',
	'table-layout'
);

const CSSViewer_pMisc = new Array(
	'overflow', 
	'cursor', 
	'visibility'
);

const CSSViewer_pEffect = new Array(
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
const CSSViewer_categories = { 
	'pFontText'    : CSSViewer_pFont, 
	'pColorBg'     : CSSViewer_pColorBg, 
	'pBox'         : CSSViewer_pBox, 
	'pPositioning' : CSSViewer_pPositioning, 
	'pList'        : CSSViewer_pList, 
	'pTable'       : CSSViewer_pTable, 
	'pMisc'        : CSSViewer_pMisc, 
	'pEffect'      : CSSViewer_pEffect 
};

const CSSViewer_categoriesTitle = { 
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
const CSSViewer_tableTagNames = new Array(
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

const CSSViewer_listTagNames = new Array(
	'ul',
	'li',
	'dd',
	'dt',
	'ol'
);

// Hexadecimal
const CSSViewer_hexa = new Array(
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
// A file of Util functions

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

	nbHexa += CSSViewer_hexa[Math.floor(nb / 16)];
	nb = nb % 16;
	nbHexa += CSSViewer_hexa[nb];
	
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
var CSSViewer_element
var CSSViewer_element_cssDefinition
var CSSViewer_current_element
var CSSViewer_has_document_event_listeners = false
// #endregion

// #region Simple Helper Functions
function GetCurrentDocument() { return window.document; }
function GetCSSProperty(element, property){ return element.getPropertyValue(property); }
// #endregion

// #region CSS Property:Value Setter Functions
function SetCSSProperty(element, property)
{
	var document = GetCurrentDocument();
	var li = last(document.getElementsByClassName('CSSViewer_' + property));
	li.lastChild.innerHTML = ": " + element.getPropertyValue(property); // textContent
}

function SetCSSPropertyIf(element, property, condition)
{
	var document = GetCurrentDocument();
	var li = last(document.getElementsByClassName('CSSViewer_' + property));

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

function SetCSSPropertyValue(element, property, value)
{
	var document = GetCurrentDocument();
	var li = last(document.getElementsByClassName('CSSViewer_' + property));
	li.lastChild.innerHTML =  ": " + value;
	li.style.display = 'flex';
}

function SetCSSPropertyValueIf(element, property, value, condition)
{
	var document = GetCurrentDocument();
	var li = last(document.getElementsByClassName('CSSViewer_' + property));

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

//#endregion

// #region CSS Show/Hide Property Functions
function HideCSSProperty(property)
{
	var document = GetCurrentDocument();
	var li = last(document.getElementsByClassName('CSSViewer_' + property));
	li.style.display = 'none';
}

function HideCSSCategory(category)
{
	var document = GetCurrentDocument();
	var div = last(document.getElementsByClassName('CSSViewer_' + category));
	div.style.display = 'none';
}

function ShowCSSCategory(category)
{
	var document = GetCurrentDocument();
	var div = last(document.getElementsByClassName('CSSViewer_' + category));
	div.style.display = 'flex';
}
// #endregion 

// #region Update Functions 

function isPropertyEqualToDefault(element, type)
{
	if(defaultPropertyValueMap.has(type)){ 
		return (GetCSSProperty(element, type) != null &&  GetCSSProperty(element, type) != defaultPropertyValueMap.get(type)); 
	}
	else{ return GetCSSProperty(element, type); }
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
	for(let prop in possibleList) { SetCSSPropertyIf(element, possibleList[prop], isPropertyEqualToDefault(element, possibleList[prop]));}
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
	for (let prop in possibleColorBgList) { SetCSSPropertyIf(element, possibleColorBgList[prop], isPropertyEqualToDefault(element, possibleColorBgList[prop]));}
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
	for (let prop in possibleBoxList) { SetCSSPropertyIf(element, possibleBoxList[prop], isPropertyEqualToDefault(element, possibleBoxList[prop]));}
}

function UpdatePositioning(element)
{
	SetCSSProperty(element, 'display');
	let possiblePositionList = ['position','top','bottom','right','left','float','clear','z-index']
	for (var prop in possiblePositionList) { SetCSSPropertyIf(element, possiblePositionList[prop], isPropertyEqualToDefault(element, possiblePositionList[prop]));}
}

function UpdateTable(element, tagName)
{
	if (IsInArray(CSSViewer_tableTagNames, tagName)) {
		var nbProperties = 0;

		let possibleTableList = ['border-collapse', 'border-spacing', 'caption-side', 'empty-cells',  'table-layout']
		for (let prop in possibleTableList) { nbProperties += SetCSSPropertyIf(element, possibleTableList[prop], isPropertyEqualToDefault(element, possibleTableList[prop]));}

		if (nbProperties > 0) ShowCSSCategory('pTable');
		else HideCSSCategory('pTable');
	}
	else {
		HideCSSCategory('pTable');
	}
}

function UpdateList(element, tagName)
{
	if (IsInArray(CSSViewer_listTagNames, tagName)) {
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
	for (var prop in possibleMiscList) { nbProperties += SetCSSPropertyIf(element, possibleMiscList[prop], isPropertyEqualToDefault(element, possibleMiscList[prop]));}

	if (nbProperties > 0) ShowCSSCategory('pMisc');
	else HideCSSCategory('pMisc');
}

function UpdateEffects(element)
{
	var nbProperties = 0;
	var possibleEffectList = ['transform','transition','outline','outline-offset','box-sizing','resize',
						'text-shadow','text-overflow','word-wrap','box-shadow','border-top-left-radius',
						'border-top-right-radius', 'border-bottom-left-radius','border-bottom-right-radius']

	for (let prop in possibleEffectList) { nbProperties += SetCSSPropertyIf(element, possibleEffectList[prop], isPropertyEqualToDefault(element, possibleEffectList[prop]));}
	if (nbProperties > 0) ShowCSSCategory('pEffect');
	else HideCSSCategory('pEffect');
}

// #endregion 

// #region Event Handlers

function CSSViewerMouseOver(e)
{
	// Block
	var document = GetCurrentDocument();
	var block = last(document.getElementsByClassName('CSSViewer_block'));

	if( ! block ){
		return;
	}

	var h1 = document.getElementById('CSSViewer_title');
	// this.tagName.toLowerCase() -> zayd
	h1.innerHTML = '&lt;' + "zayd"+ '&gt;' + (this.id == '' ? '' : ' #' + this.id) + (this.className == '' ? '' : ' .' + this.className);

	// Outline element
	if (this.tagName != 'body') {
		this.style.outline = '2px dashed #f00';
		CSSViewer_current_element = this;
	}
	
	// Updating CSS properties
	var element = document.defaultView.getComputedStyle(this, null);

	UpdatefontText(element);
	UpdateColorBg(element);
	UpdateBox(element);
	UpdatePositioning(element);
	UpdateTable(element, this.tagName);
	UpdateList(element, this.tagName);
	UpdateMisc(element);
	UpdateEffects(element);

	CSSViewer_element = this;

	cssViewerRemoveElement("cssViewerInsertMessage");

	e.stopPropagation();

	// generate simple css definition
	CSSViewer_element_cssDefinition = this.tagName.toLowerCase() + (this.id == '' ? '' : ' #' + this.id) + (this.className == '' ? '' : ' .' + this.className) + " {\n";

	CSSViewer_element_cssDefinition += "\t/* Font & Text */\n"; 
	for (var i = 0; i < CSSViewer_pFont.length; i++)
		CSSViewer_element_cssDefinition += "\t" + CSSViewer_pFont[i] + ': ' + element.getPropertyValue( CSSViewer_pFont[i] ) + ";\n";

	CSSViewer_element_cssDefinition += "\n\t/* Color & Background */\n";
	for (var i = 0; i < CSSViewer_pColorBg.length; i++)
		CSSViewer_element_cssDefinition += "\t" + CSSViewer_pColorBg[i] + ': ' + element.getPropertyValue( CSSViewer_pColorBg[i] ) + ";\n";

	CSSViewer_element_cssDefinition += "\n\t/* Box */\n";
	for (var i = 0; i < CSSViewer_pBox.length; i++)
		CSSViewer_element_cssDefinition += "\t" + CSSViewer_pBox[i] + ': ' + element.getPropertyValue( CSSViewer_pBox[i] ) + ";\n";

	CSSViewer_element_cssDefinition += "\n\t/* Positioning */\n";
	for (var i = 0; i < CSSViewer_pPositioning.length; i++)
		CSSViewer_element_cssDefinition += "\t" + CSSViewer_pPositioning[i] + ': ' + element.getPropertyValue( CSSViewer_pPositioning[i] ) + ";\n";

	CSSViewer_element_cssDefinition += "\n\t/* List */\n";
	for (var i = 0; i < CSSViewer_pList.length; i++)
		CSSViewer_element_cssDefinition += "\t" + CSSViewer_pList[i] + ': ' + element.getPropertyValue( CSSViewer_pList[i] ) + ";\n";

	CSSViewer_element_cssDefinition += "\n\t/* Table */\n";
	for (var i = 0; i < CSSViewer_pTable.length; i++)
		CSSViewer_element_cssDefinition += "\t" + CSSViewer_pTable[i] + ': ' + element.getPropertyValue( CSSViewer_pTable[i] ) + ";\n";

	CSSViewer_element_cssDefinition += "\n\t/* Miscellaneous */\n";
	for (var i = 0; i < CSSViewer_pMisc.length; i++)
		CSSViewer_element_cssDefinition += "\t" + CSSViewer_pMisc[i] + ': ' + element.getPropertyValue( CSSViewer_pMisc[i] ) + ";\n";

	CSSViewer_element_cssDefinition += "\n\t/* Effects */\n"; 
	for (var i = 0; i < CSSViewer_pEffect.length; i++)
		CSSViewer_element_cssDefinition += "\t" + CSSViewer_pEffect[i] + ': ' + element.getPropertyValue( CSSViewer_pEffect[i] ) + ";\n";

	CSSViewer_element_cssDefinition += "}";

	// console.log( element.cssText ); //< debug the hovered el css
}

function CSSViewerMouseOut(e)
{
	this.style.outline = '';

	e.stopPropagation();
}

// #region Setting position of box (XY Position) and secondary function to make the div movable

function CSSViewerMouseMove(e)
{
	var document = GetCurrentDocument();
	var block = last(document.getElementsByClassName('CSSViewer_block'));

	if( ! block ){
		return;
	}

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

// http://stackoverflow.com/a/7557433
function CSSViewerIsElementInViewport(el) {
    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
// #endregion

// #region Main CSSViewer item Class

function CSSViewer()
{
	// Create a block to display informations
	this.CreateBlock = function() {
		var document = GetCurrentDocument();
		var block;
		
		if (document) {
			// Create a div block
			block = document.createElement('div');
			block.classList.add("container", "moving-glow", "CSSViewer_block")
			
			// Insert a title for CSS selector

			var head1 = document.createElement('div');
			var head2 = document.createElement('div');

			head1.classList.add("header");
			head2.classList.add("subheader");

			var title = document.createElement('h1');
			title.classList.add("primary", "title")
			title.id = 'CSSViewer_title'; 
			title.appendChild(document.createTextNode(''));
			

			var btn1 = document.createElement('button')
			btn1.classList.add('cssViewerbtn')	 
			var img1 = document.createElement("img");
			img1.src = chrome.runtime.getURL("../img/code.svg")
			btn1.appendChild(img1)

			var btn2 = document.createElement('button')
			btn2.classList.add('cssViewerbtn')		
			var img2 = document.createElement("img");
			img2.src = chrome.runtime.getURL("../img/copy.svg")
			btn2.appendChild(img2)

			var btn3 = document.createElement('button')
			btn3.classList.add('cssViewerbtn')
			var img3 = document.createElement("img");
			img3.src = chrome.runtime.getURL("../img/trash.svg")
			btn3.appendChild(img3)


			head2.appendChild(title);
			head2.appendChild(btn1);
			head2.appendChild(btn2);
			head2.appendChild(btn3);

			//head2.appendChild(btn1);

			head1.appendChild(head2); 

			var span1 = document.createElement('span');
			span1.classList.add("primary", "white_color");
			span1.appendChild(document.createTextNode("1690.67x7996.91"));

			var span2 = document.createElement('span');
			span2.classList.add("primary", "white_color");
			span2.appendChild(document.createTextNode("font-CerebriSans-Regular 16px"));


			head1.appendChild(span1);
			head1.appendChild(span2)

			block.appendChild(head1);
			
			// Insert all properties
			var center = document.createElement('div');

			for (var cat in CSSViewer_categories) {
				var div = document.createElement('div');

				div.className = 'CSSViewer_' + cat;
				// var h2 = document.createElement('h2');
				// h2.appendChild(document.createTextNode(CSSViewer_categoriesTitle[cat]));

				var ul = document.createElement('ul');
				var properties = CSSViewer_categories[cat];

				for (var i = 0; i < properties.length; i++) {
				
					var li = document.createElement('li');
					li.className = 'CSSViewer_' + properties[i];
					li.style.display = 'none';
					var span_property = document.createElement('span');
					span_property.classList.add("primary", "aqua_color");
					span_property.appendChild(document.createTextNode(properties[i]));

					var span_value = document.createElement('span'); 
					span_value.classList.add("primary", "purple_color");

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

			footer.className = 'CSSViewer_footer';

			//< 
			footer.appendChild( document.createTextNode('CSSViewer 1.7. keys: [f] Un/Freeze. [c] Css. [Esc] Close.') ); 
			// TODO - add back in: block.appendChild(footer);
		}
		
		cssViewerInsertMessage( "CSSViewer loaded! Hover any element you want to inspect in the page." );

		return block;
	}
	
		// Set the title of the block
	this.SetTitle = function()
	{}
	
	// Add a stylesheet to the current document
	this.AddCSS = function(cssFile)
	{
		var document = GetCurrentDocument();
		var link = document.createElement("link");

		link.setAttribute("href", cssFile);
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("type", "text/css");

		var heads = document.getElementsByTagName("head");

		if(heads.length > 0)
		    heads[0].appendChild(link);
		else
		    document.documentElement.appendChild(link);
	}
	
	this.RemoveCSS = function(cssFile)
	{
		var document = GetCurrentDocument();
		var links = document.getElementsByTagName('link');

		for (var i = 0; i < links.length; i++) {
			if (links[i].rel == "stylesheet" && links[i].href == cssFile) {
				var heads = document.getElementsByTagName("head");

				if(heads.length > 0) {
					heads[0].removeChild(links[i]);
				}

				return;
			}
		}
	}
}

//Check if CSSViewer is enabled
CSSViewer.prototype.IsEnabled = function()
{
	var document = GetCurrentDocument();

	if (last(document.getElementsByClassName('CSSViewer_block'))) {
		return true;
	}

	return false;
}

// Enable CSSViewer
CSSViewer.prototype.Enable = function()
{
	var document = GetCurrentDocument();
	var block = last(document.getElementsByClassName('CSSViewer_block'));

	new_block = this.CreateBlock();
	document.body.appendChild(new_block);
	setElementToBeDraggable(new_block)
	return true;
}

// Disable CSSViewer
CSSViewer.prototype.Disable = function()
{
	console.log("Disabling the CSS Block")
	var document = GetCurrentDocument();
	var block = last(document.getElementsByClassName('CSSViewer_block'));
    var insertMessage = document.getElementById("cssViewerInsertMessage");
        
	if (block || insertMessage) {
		if(block) document.body.removeChild(block);
        if(insertMessage) document.body.removeChild(insertMessage);
		RemoveDocumentEventListeners();
		return true;
	}

	return false;
}

// Freeze CSSViewer
CSSViewer.prototype.Freeze = function()
{
	var document = GetCurrentDocument();
	var block = last(document.getElementsByClassName('CSSViewer_block'));

	//Create a new block for all the updates
	cssViewer = new CSSViewer();
	cssViewer.Enable(); 

	if ( block) { return true;}
	return false;
}

// Unfreeze CSSViewer
CSSViewer.prototype.Unfreeze = function()
{
	var document = GetCurrentDocument();
	var block = last(document.getElementsByClassName('CSSViewer_block'));
	if ( block ) {
		// Remove the red outline
		CSSViewer_current_element.style.outline = '';
		return true;
	}

	return false;
}

// #endregion 

// #region Replace notification + clicking on item with a popup.html that shows freeze behaviour and current state

function cssViewerInsertMessage( msg )
{
	// Display the notification message
	var oNewP = document.createElement("p");
	var oText = document.createTextNode( msg );

	oNewP.appendChild(oText);
	oNewP.id                    = 'cssViewerInsertMessage';
	oNewP.style.backgroundColor = '#b40000';
	oNewP.style.color           = '#ffffff';
	oNewP.style.position        = "fixed";
	oNewP.style.top             = '10px';
	oNewP.style.left            = '10px';
	oNewP.style.zIndex          = '9999';
	oNewP.style.padding         = '3px';

	// https://github.com/miled/cssviewer/issues/5
	// https://github.com/miled/cssviewer/issues/6
	// var beforeMe = document.getElementsByTagName("body");
	// document.body.insertBefore( oNewP, beforeMe[0] );

	// https://github.com/zchee/cssviewer/commit/dad107d27e94aabeb6e11b935ad28c4ff251f895
	document.body.appendChild(oNewP);
}

function cssViewerRemoveElement(divid)
{   
	//Removes and element from the dom, used to remove the notification message
	var n = document.getElementById(divid);

	if(n){
		document.body.removeChild(n); 
	}
}
// #endregion

// #region Unused code - look into it
/*
* Copy current element css to chrome console
*/
function cssViewerCopyCssToConsole(type)
{   
	if( 'el' == type ) return console.log( CSSViewer_element );
	if( 'id' == type ) return console.log( CSSViewer_element.id );
	if( 'tagName' == type ) return console.log( CSSViewer_element.tagName );
	if( 'className' == type ) return console.log( CSSViewer_element.className );
	if( 'style' == type ) return console.log( CSSViewer_element.style ); 
	if( 'cssText' == type ) return console.log( document.defaultView.getComputedStyle(CSSViewer_element, null).cssText );
	if( 'getComputedStyle' == type ) return console.log( document.defaultView.getComputedStyle(CSSViewer_element, null) );
	if( 'simpleCssDefinition' == type ) return console.log( CSSViewer_element_cssDefinition );
}
// #endregion

//#region TODO - Replace Key Mapping with one the same as css snap + refactor some key mapping aspects to popup.html
/*
*  Close css viewer on clicking 'esc' key
*  Freeze css viewer on clicking 'f' key
*/
function CssViewerKeyMap(e) {

	console.log("Got a click event with value: " + e );

	if( ! cssViewer.IsEnabled() )
		return;

	// ESC: Close the css viewer if the cssViewer is enabled.
	if ( e.keyCode === 27 ){
		// Remove the red outline
		CSSViewer_current_element.style.outline = '';
		if(CSSViewer_has_document_event_listeners){
			cssViewer.Disable();
		}
	}
	
	if( e.altKey || e.ctrlKey )
		return;

	// f: Freeze or Unfreeze the css viewer if the cssViewer is enabled
	if ( e.keyCode === 70 ){
		if(CSSViewer_has_document_event_listeners){
			cssViewer.Freeze();
		}else{
			// Was in a paused state - create a new block + return to scanable state 
			cssViewer = new CSSViewer();
			cssViewer.Enable(); 
			AddDocumentEventListeners();
		}
	}
	// c: Show code css for selected element. 
	// window.prompt should suffice for now.
	if ( e.keyCode === 67 ){
		window.prompt("Simple Css Definition :\n\nYou may copy the code below then hit escape to continue.", CSSViewer_element_cssDefinition);
	}
}
//#endregion

//#region Document Functions 

// Add event listeners for all elements in the current document
function AddDocumentEventListeners()
{
	var document = GetCurrentDocument();
	var elements = GetAllSubElements(document.body);
	console.log("elements are" + elements)

	for (var i = 0; i < elements.length; i++)	{
		elements[i].addEventListener("mouseover", CSSViewerMouseOver, false);
		elements[i].addEventListener("mouseout", CSSViewerMouseOut, false);
		elements[i].addEventListener("mousemove", CSSViewerMouseMove, false);
	}	
	CSSViewer_has_document_event_listeners = true
}

// Remove event listeners for all elements in the current document
function RemoveDocumentEventListeners()
{
	var document = GetCurrentDocument();
	var elements = GetAllSubElements(document.body);

	for (var i = 0; i < elements.length; i++){
		elements[i].removeEventListener("mouseover", CSSViewerMouseOver, false);
		elements[i].removeEventListener("mouseout", CSSViewerMouseOut, false);
		elements[i].removeEventListener("mousemove", CSSViewerMouseMove, false);
	}	
	CSSViewer_has_document_event_listeners = false
}
// Get all elements within the given element
function GetAllSubElements (element)
{
	var elemArr = new Array();

	if (element && element.hasChildNodes()) {
		elemArr.push(element);
		
		// Ignore all of our added CSS
		if(element.classList.contains("CSSViewer_block")) return elemArr;

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


//#region Entry point to application
cssViewer = new CSSViewer();

if ( cssViewer.IsEnabled() ){
	cssViewer.Disable();  
}
else{
	AddDocumentEventListeners();
	cssViewer.Enable(); 
}

// Handle any downclick  
document.onkeydown = CssViewerKeyMap;
// #endregion
