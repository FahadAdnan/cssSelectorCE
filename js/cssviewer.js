
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

var CSSViewer_newVals = new Array(
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
var CSSViewer_pFont = new Array(
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

var CSSViewer_pColorBg = new Array(
	'background-attachment', 
	'background-color', 
	'background-image',
	'background-position',
	'background-repeat',
	'color', 
);

var CSSViewer_pBox = new Array(
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

var CSSViewer_pPositioning = new Array(
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

var CSSViewer_pList = new Array(
	'list-style-image', 
	'list-style-type', 
	'list-style-position'
);

var CSSViewer_pTable = new Array(
	'border-collapse',
	'border-spacing',
	'caption-side',
	'empty-cells',
	'table-layout'
);

var CSSViewer_pMisc = new Array(
	'overflow', 
	'cursor', 
	'visibility'
);

var CSSViewer_pEffect = new Array(
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
var CSSViewer_categories = { 
	'pFontText'    : CSSViewer_pFont, 
	'pColorBg'     : CSSViewer_pColorBg, 
	'pBox'         : CSSViewer_pBox, 
	'pPositioning' : CSSViewer_pPositioning, 
	'pList'        : CSSViewer_pList, 
	'pTable'       : CSSViewer_pTable, 
	'pMisc'        : CSSViewer_pMisc, 
	'pEffect'      : CSSViewer_pEffect 
};

var CSSViewer_categoriesTitle = { 
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
var CSSViewer_tableTagNames = new Array(
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

var CSSViewer_listTagNames = new Array(
	'ul',
	'li',
	'dd',
	'dt',
	'ol'
);

// Hexadecimal
var CSSViewer_hexa = new Array(
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


var elementMap = new Map([]); 


function setBlockCursorStyle(cursorstyle){
	Array.from(document.getElementsByClassName("CSSViewer_block")).forEach(
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
var CSSViewer_has_document_event_listeners = true // Switch to false - should set to true/false once start/pause are implemented
var CSSViewer_on_custom_element = false
var CSSViewer_is_closed = true 
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
	li.style.display = 'flex';
	li.lastChild.innerHTML = ": " + element.getPropertyValue(property);
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

function UpdateSubHeadings(element){
	var fontStyle = element.getPropertyValue('font-family').split(" ")[0];
	var fontSize = element.getPropertyValue('font-size');

	var height = ((element.naturalHeight == undefined) ? element.getPropertyValue('height') : element.naturalHeight + "px");
	var width = ((element.naturalWidth == undefined) ? element.getPropertyValue('width') : element.naturalWidth + "px");

	var header = last(document.getElementsByClassName('CSSViewer_block')).firstChild;
	try {
		header.childNodes[1].lastChild.innerHTML = '&nbsp;' + height + " " + width; 
		header.childNodes[2].lastChild.innerHTML = '&nbsp;' + fontStyle + " " + fontSize;
	} catch(err) {
		console.log("Error: CSSViewer: error setting subtitles " + err);
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
	if( ! block ){ return; }
	elementMap.set(block, this)
	// Initial Logic to decide whether to show the popup:
	if(this != undefined && (this.classList.contains("CSSViewer_block") || this.id == "cssscan-floating-options")){
		CSSViewer_on_custom_element = true 
		block.style.display = "none"
		return;
	}else if(CSSViewer_on_custom_element){ return; } // Ignore all elements while you're on a custom element
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
		CSSViewer_current_element = this;
	}
	
	// Updating CSS properties
	var element = document.defaultView.getComputedStyle(this, null);

	UpdateSubHeadings(element)
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
	if(this != undefined && (this.classList.contains("CSSViewer_block") || this.id == "cssscan-floating-options")){
		CSSViewer_on_custom_element = false 
		return;
	}
	this.style.outline = '';

	e.stopPropagation();
}

// #region Setting position of box (XY Position) and secondary function to make the div movable

function CSSViewerMouseMove(e)
{
	if(this == undefined || CSSViewer_on_custom_element || this.classList.contains("CSSViewer_block") || this.id == "cssscan-floating-options" ){return;}
	
	var document = GetCurrentDocument();
	var block = last(document.getElementsByClassName('CSSViewer_block'));

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

function header_button(image_path){
	var btn = document.createElement('button')
	btn.classList.add('cssViewerbtn')		
	var img = document.createElement("img");
	img.src = chrome.runtime.getURL(image_path)
	btn.appendChild(img)
	return btn 
}

function sub_headings_text(image_path){
	var div = document.createElement('div');
	div.classList.add("primary", "white_color", "flex_subheading");
	var img = document.createElement("img")
	img.src = chrome.runtime.getURL(image_path)
	div.appendChild(img)
	div.appendChild(document.createElement('span'));
	return div
}

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

			var header = document.createElement('div');
			var subheader = document.createElement('div');

			header.classList.add("header");
			subheader.classList.add("subheader");

			var title = document.createElement('h1');
			title.classList.add("primary", "title")
			title.id = 'CSSViewer_title'; 
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
				parseStyleSheets(document, block)
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
	setElementToBeDraggable(new_block);
	AddEventListners(new_block);	
	AddDocumentEventListeners();

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

CSSViewer.prototype.Freeze = function()
{
	cssViewer = new CSSViewer();
	cssViewer.Enable(); 
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

function PauseCSSViewer(){
	var state_btn = document.getElementById("cssscan-pause-continue")
	state_btn.firstChild.innerHTML = "Continue&nbsp;"
	state_btn.lastChild.src = chrome.runtime.getURL("../img/play.svg")
	CSSViewer_current_element.style.outline = '';
	cssViewer.Disable();
}

function ContinueCSSViewer(){
	var state_btn = document.getElementById("cssscan-pause-continue")
	state_btn.firstChild.innerHTML = "Pause&nbsp;"
	state_btn.lastChild.src = chrome.runtime.getURL("../img/pause.svg")
	cssViewer = new CSSViewer();
	cssViewer.Enable(); 
}

function CloseCSSViewer(){
	PauseCSSViewer()
	// Remove all the Blocks 
	var blocks = document.getElementsByClassName("CSSViewer_block")
    while(blocks.length > 0){ blocks[0].parentNode.removeChild(blocks[0]); }
	// Remove option menu 
	var option_menu = document.getElementById("cssscan-floating-options")
	option_menu.parentNode.removeChild(option_menu)
	CSSViewer_is_closed = true
}

function OpenCSSViewer(){
	console.log("Opening CSS Viewer!!")
	floatingHeaderOptions()
	cssViewer = new CSSViewer();
	if ( cssViewer.IsEnabled() ){ cssViewer.Disable(); }
	else{ cssViewer.Enable(); }
	CSSViewer_is_closed = false 
}

function FreezeCurrentBlock(){
	cssViewer = new CSSViewer();
	cssViewer.Enable(); 
}

function ToggleGrid(enable){
	console.log("Toggling the grid " + enable)
	let elements = GetAllSubElements(document.body)
	if(enable){ for (var i = 0; i < elements.length; i++){ elements[i].classList.add("css-scanner-red-outline") }}
	else { for (var i = 0; i < elements.length; i++){ elements[i].classList.remove("css-scanner-red-outline") }}
}

function ClickEvent(e){
	if(CSSViewer_is_closed || !CSSViewer_has_document_event_listeners) return 
	var isCopyEnabled= (document.getElementById('cssscan-onclick-copy').firstChild.checked == true);
	var isPinEnabled= (document.getElementById('cssscan-onclick-pin').firstChild.checked == true);

	if(isCopyEnabled){ /* TODO - Add Code to copy css to clipboard */ }
	if(isPinEnabled){ FreezeCurrentBlock()}
}

function CssViewerKeyMap(e) {

	if(CSSViewer_is_closed){ 
		// Open Extension(Ctrl+Shift+S) - Run Content Script 
		if(e.keyCode === 83 && (e.key === "S" || e.key === "s") && e.shiftKey && e.ctrlKey){ OpenCSSViewer() }
		return
	}
	// Close Extension(Escape) - delete custom added elements + event listeners 
	if(e.keyCode === 27 && e.key == "Escape"){ CloseCSSViewer() }

	// Pause/Continue: Alt+Shift+S
	if( e.keyCode === 83 && (e.key === "S" || e.key === "s") && e.shiftKey && e.altKey){
		if(CSSViewer_has_document_event_listeners){ PauseCSSViewer() }
		else{ ContinueCSSViewer() }	
	}

	// Freeze Current Block(Space) - create a new one and forget the old one
	if (e.keyCode === 32 && e.key == " " && CSSViewer_has_document_event_listeners){
		cssViewer = new CSSViewer();
		cssViewer.Enable(); 
		return false; // Prevent default behaviour of scrolling down
	}

	if( e.keyCode === 88 && (e.key === "X" || e.key === "x") && e.shiftKey && e.ctrlKey){
		var perf= document.getElementById('cssscan-display-grid').firstChild;
		perf.checked = !perf.checked
		ToggleGrid(perf.checked)
	}
	// REMOVE!!! -  c: Show code css for selected element. -
	//if ( e.keyCode === 67 ){ window.prompt("Simple Css Definition :\n\nYou may copy the code below then hit escape to continue.", CSSViewer_element_cssDefinition); }
}
//#endregion

//#region Document Functions 

function AddEventListners(element){
	element.addEventListener("mouseover", CSSViewerMouseOver, false);
	element.addEventListener("mouseout", CSSViewerMouseOut, false);
	element.addEventListener("mousemove", CSSViewerMouseMove, false);
	element.addEventListener("click", ClickEvent, false);
}
function RemoveEventListners(element){
	element.removeEventListener("mouseover", CSSViewerMouseOver, false);
	element.removeEventListener("mouseout", CSSViewerMouseOut, false);
	element.removeEventListener("mousemove", CSSViewerMouseMove, false);
	element.addEventListener("click", ClickEvent, false);
}

// Add event listeners for all elements in the current document
function AddDocumentEventListeners()
{
	var document = GetCurrentDocument();
	var elements = GetAllSubElements(document.body);

	for (var i = 0; i < elements.length; i++){ AddEventListners(elements[i]) }	
	CSSViewer_has_document_event_listeners = true
	setBlockCursorStyle("auto")
}

// Remove event listeners for all elements in the current document
function RemoveDocumentEventListeners()
{
	var document = GetCurrentDocument();
	var elements = GetAllSubElements(document.body);

	for (var i = 0; i < elements.length; i++){ RemoveEventListners(elements[i]) }
	CSSViewer_has_document_event_listeners = false
	setBlockCursorStyle("move")
}
// Get all elements within the given element
function GetAllSubElements (element)
{
	var elemArr = new Array();
		
	// Ignore all of our added CSS
	if (element && element.hasChildNodes()) {

		elemArr.push(element);
		if(element.classList.contains("CSSViewer_block") || element.id == "cssscan-floating-options") return elemArr;

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

// #region Floating Menu Header 

function floatingHeaderButton(type, inner_text, image_path){

	var btn = document.createElement("button")
	btn.id = "cssscan-" + type
	btn.className = "cssscan-button"

	var inner_span = document.createElement("span")
	inner_span.id = "cssscan-span-" + type
	inner_span.innerHTML = inner_text +  "&nbsp;"

	var inner_img = document.createElement("img")
	inner_img.id = "cssscan-image-" + type
	inner_img.src = chrome.runtime.getURL(image_path)

	btn.appendChild(inner_span);
	btn.appendChild(inner_img);
	return btn
}
function dropdownContainer(){
	var container = document.createElement("div")
	container.classList = ["spacing-7", "cssscan-full-width"]
	return container
}
function dropdownHeader(inner_text){
	var header = document.createElement("div")
	header.className = "cssscan-header-text"
	header.innerHTML = inner_text
	return header
}
function dropdownSwitch(type, inner_text){
	var divSwitch = document.createElement("div")
	divSwitch.id = "cssscan-" + type
	divSwitch.className = "cssscan-row-container"

	var inputSwitch = document.createElement("input");
	inputSwitch.className = "cssscan-switch"
	inputSwitch.type = "checkbox"

	var spanSwitch = document.createElement("switch")
	spanSwitch.className = "cssscan-simple-text"
	spanSwitch.innerHTML = inner_text

	divSwitch.append(inputSwitch, spanSwitch)
	return divSwitch
}
function dropdownShortcuts(command, inner_text){
	var divShortcut = document.createElement("div")
	divShortcut.className = "cssscan-simple-text spacing-3"
	divShortcut.innerHTML = "<b>" + command + "</b> " + inner_text
	return divShortcut
}

function setStateOfSwitches(){ addEventListener
	chrome.storage.sync.get('onclick_copy', function(result) {
        var perf= document.getElementById('cssscan-onclick-copy').firstChild;
	    var tmp = result.onclick_copy; 
        perf.checked = tmp;
        
        perf.addEventListener("change", function() {
            if(tmp) { perf.checked = false; tmp = false; chrome.storage.sync.set({'onclick_copy': false}); }
            else { perf.checked = true; tmp = true; chrome.storage.sync.set({'onclick_copy': true}); }
        });
    })
	chrome.storage.sync.get('onclick_pin', function(result) {
        var perf= document.getElementById('cssscan-onclick-pin').firstChild;
	    var tmp = result.onclick_pin; 
        perf.checked = tmp;
        
        perf.addEventListener("change", function() {
            if(tmp) { perf.checked = false; tmp = false; chrome.storage.sync.set({'onclick_pin': false}); }
            else { perf.checked = true; tmp = true; chrome.storage.sync.set({'onclick_pin': true}); }
        });
    })
	chrome.storage.sync.get('other_child_css', function(result) {
        var perf= document.getElementById('cssscan-other-child-css').firstChild;
	    var tmp = result.other_child_css; 
        perf.checked = tmp;
        
        perf.addEventListener("change", function() {
            if(tmp) { perf.checked = false; tmp = false; chrome.storage.sync.set({'other_child_css': false}); }
            else { perf.checked = true; tmp = true; chrome.storage.sync.set({'other_child_css': true}); }
        });
    })
	chrome.storage.sync.get('other_html_copy', function(result) {
        var perf= document.getElementById('cssscan-other-html-copy').firstChild;
	    var tmp = result.other_html_copy; 
        perf.checked = tmp;
        
        perf.addEventListener("change", function() {
            if(tmp) { perf.checked = false; tmp = false; chrome.storage.sync.set({'other_html_copy': false}); }
            else { perf.checked = true; tmp = true; chrome.storage.sync.set({'other_html_copy': true}); }
        });
    })
	chrome.storage.sync.get('display_grid', function(result) {
        var perf= document.getElementById('cssscan-display-grid').firstChild;
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
        var perf= document.getElementById('cssscan-display-guidelines').firstChild;
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
	document.getElementById("cssscan-pause-continue").addEventListener("click", function(){
		if(CSSViewer_has_document_event_listeners){ PauseCSSViewer() }
		else{ ContinueCSSViewer() }
	})
	// Move Button: 
	document.getElementById("cssscan-move").addEventListener("click", function(){

		var option_menu = document.getElementById("cssscan-floating-options")
		var dropdown = document.getElementById("cssscan-btn-dropdown-container")
		var dropdown_menu = document.getElementById("cssscan-options-dropdown")

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
	var dropdown = document.getElementById("cssscan-options-dropdown")
	document.getElementById("cssscan-options").addEventListener("click", function(){
		if(dropdown.style.display == 'none'){ dropdown.style.display = 'flex'; } else { dropdown.style.display = 'none'}
	})
	// Close Button
	document.getElementById("cssscan-close").addEventListener("click", function(){
		CloseCSSViewer();
	})	
}

function floatingHeaderOptions(){
	var parent_container = document.createElement("div")
	parent_container.id = "cssscan-floating-options"
	
	parent_container.appendChild(floatingHeaderButton("pause-continue", "Pause", "../img/pause.svg"))
	parent_container.appendChild(floatingHeaderButton("move", "Move", "../img/arrow_down.svg"))

	var dropdownDiv = document.createElement("div")
	dropdownDiv.id = "cssscan-btn-dropdown-container"

	dropdownDiv.appendChild(floatingHeaderButton("options", "Options", "../img/options.svg"))

	var innerSubDiv = document.createElement("div")
	innerSubDiv.id = "cssscan-options-dropdown"
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

// Handle Clicks
document.onkeydown = CssViewerKeyMap;


//#region StyleSheet Functions 

function parseStyleSheets(document, block){
	var element = elementMap.get(block); 
	var classList = element.classList; 	//TO DO: parse through innerHTML to get inner HTML class list
	
	var classMap = parseClassList(element); 

	var css = ""; 
	for(let s = 0; s < document.styleSheets.length; s++){
		var sheet = document.styleSheets.item(s); 

		for (let i = 0; i < sheet.cssRules.length; i++) { 

				//TO DO: parse selectorText to better check for prefix match 
				var className  = sheet.cssRules.item(i).selectorText;
				//diff words 
				//for each word as loop, filter for everything before hello: -> hello class 
				//if matches in map, add 
				if(className != null && className.length > 1 && classMap.has(className.substr(1))){
					//check if same prefix 
					css += "\n" + sheet.cssRules.item(i).cssText;
				} 
		}	
	}	
	//console.log(css); 
	//console.log("::::::::CSS:::::::::::");
}

function parseClassList(element){
	arr = GetAllSubElements(element); 
	var classList = new Set();

	for(let i =0; i < arr.length; i++){
		var list = arr[i].classList; 
		for(let j = 0; j < list.length; j++){
			if(!classList.has(list.item(j))){
				classList.add(list.item(j))
				console.log(list.item(j)) 
			}
		}
	}
	return classList; 
}

// #endregion
