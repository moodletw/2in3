YUI.add('yui2-carousel', function(Y) {
    if (Y.YUI2) {
        var YAHOO = Y.YUI2;
    }
    /*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.6.0
*/
(function(){var W;YAHOO.widget.Carousel=function(k,j){this._navBtns={};this._pages={};YAHOO.widget.Carousel.superclass.constructor.call(this,k,j);};var e=YAHOO.widget.Carousel,C=YAHOO.util.Dom,i=YAHOO.util.Event,R=YAHOO.lang;W="Carousel";var G={};var h="afterScroll";var F="beforeHide";var f="beforePageChange";var b="beforeScroll";var A="beforeShow";var V="blur";var D="focus";var O="hide";var Q="itemAdded";var J="itemRemoved";var d="itemSelected";var B="loadItems";var E="navigationStateChange";var U="pageChange";var T="render";var I="show";var c="startAutoPlay";var g="stopAutoPlay";function L(){var k=this._firstItem,j;if(k>=this.get("numItems")-1){if(this.get("isCircular")){j=0;}else{this.stopAutoPlay();}}else{j=k+this.get("numVisible");}this.scrollTo.call(this,j);}function a(k,j){var l=document.createElement(k);j=j||{};if(j.className){C.addClass(l,j.className);}if(j.parent){j.parent.appendChild(l);}if(j.id){l.setAttribute("id",j.id);}if(j.content){if(j.content.nodeName){l.appendChild(j.content);}else{l.innerHTML=j.content;}}return l;}function K(l,k,j){var n;function m(q,p){var r;r=parseInt(C.getStyle(q,p),10);return R.isNumber(r)?r:0;}function o(q,p){var r;r=parseFloat(C.getStyle(q,p));return R.isNumber(r)?r:0;}if(typeof j=="undefined"){j="int";}switch(k){case"height":n=l.offsetHeight;if(n>0){n+=m(l,"marginTop")+m(l,"marginBottom");}else{n=o(l,"height")+m(l,"marginTop")+m(l,"marginBottom")+m(l,"borderTopWidth")+m(l,"borderBottomWidth")+m(l,"paddingTop")+m(l,"paddingBottom");}break;case"width":n=l.offsetWidth;if(n>0){n+=m(l,"marginLeft")+m(l,"marginRight");}else{n=o(l,"width")+m(l,"marginLeft")+m(l,"marginRight")+m(l,"borderLeftWidth")+m(l,"borderRightWidth")+m(l,"paddingLeft")+m(l,"paddingRight");}break;default:if(j=="int"){n=m(l,k);if(k=="marginRight"&&YAHOO.env.ua.webkit){n=m(l,"marginLeft");}}else{if(j=="float"){n=o(l,k);}else{n=C.getStyle(l,k);}}break;}return n;}function Y(l){var m,k=0,j=false;if(this._itemsTable.numItems===0){return 0;}if(typeof l=="undefined"){if(this._itemsTable.size>0){return this._itemsTable.size;}}if(R.isUndefined(this._itemsTable.items[0])){return 0;}m=C.get(this._itemsTable.items[0].id);if(typeof l=="undefined"){j=this.get("isVertical");}else{j=l=="height";}if(j){k=K(m,"height");}else{k=K(m,"width");}if(typeof l=="undefined"){this._itemsTable.size=k;}return k;}function S(l){var k=0,j=0;k=Y.call(this);j=k*l;if(this.get("isVertical")){j-=l;}return j;}function H(){var n=this.get("firstVisible"),k=0,j=this.get("numItems"),l=this.get("numVisible"),m=this.get("revealAmount");k=n+l-1+(m?1:0);k=k>j-1?j-1:k;if(!this.getItem(n)||!this.getItem(k)){this.fireEvent(B,{ev:B,first:n,last:k,num:k-n});}}function N(j,k){k.scrollPageBackward();i.preventDefault(j);}function X(j,k){k.scrollPageForward();i.preventDefault(j);}function P(o,j){var r,t=this.CLASSES,k,q=this._firstItem,l=this.get("isCircular"),p=this.get("numItems"),s=this.get("numVisible"),n=j,m=q+s-1;r=s>1&&!l&&n>o;if(n>=0&&n<p){if(!R.isUndefined(this._itemsTable.items[n])){k=C.get(this._itemsTable.items[n].id);if(k){C.removeClass(k,t.SELECTED_ITEM);}}}if(R.isNumber(o)){o=parseInt(o,10);o=R.isNumber(o)?o:0;}else{o=q;}if(R.isUndefined(this._itemsTable.items[o])){this.scrollTo(o);}if(!R.isUndefined(this._itemsTable.items[o])){k=C.get(this._itemsTable.items[o].id);if(k){C.addClass(k,t.SELECTED_ITEM);}}if(o<q||o>m){if(r){this.scrollTo(q-s,true);}else{this.scrollTo(o);}}}function Z(){var l=false,k=this.CLASSES,n,j,m;j=this.get("navigation");m=this._firstItem+this.get("numVisible");if(j.prev){if(this._firstItem===0){if(!this.get("isCircular")){i.removeListener(j.prev,"click",N);C.addClass(j.prev,k.FIRST_NAV_DISABLED);for(n=0;n<this._navBtns.prev.length;n++){this._navBtns.prev[n].setAttribute("disabled","true");}this._prevEnabled=false;}else{l=!this._prevEnabled;}}else{l=!this._prevEnabled;}if(l){i.on(j.prev,"click",N,this);C.removeClass(j.prev,k.FIRST_NAV_DISABLED);for(n=0;n<this._navBtns.prev.length;n++){this._navBtns.prev[n].removeAttribute("disabled");}this._prevEnabled=true;}}l=false;if(j.next){if(m>=this.get("numItems")){if(!this.get("isCircular")){i.removeListener(j.next,"click",X);C.addClass(j.next,k.DISABLED);for(n=0;n<this._navBtns.next.length;n++){this._navBtns.next[n].setAttribute("disabled","true");}this._nextEnabled=false;}else{l=!this._nextEnabled;}}else{l=!this._nextEnabled;}if(l){i.on(j.next,"click",X,this);C.removeClass(j.next,k.DISABLED);for(n=0;n<this._navBtns.next.length;n++){this._navBtns.next[n].removeAttribute("disabled");}this._nextEnabled=true;}}this.fireEvent(E,{next:this._nextEnabled,prev:this._prevEnabled});}function M(q){var n,l,p,k,j,r,m;if(!R.isObject(q)){return ;}switch(q.ev){case Q:r=R.isUndefined(q.pos)?this._itemsTable.numItems-1:q.pos;if(!R.isUndefined(this._itemsTable.items[r])){p=this._itemsTable.items[r];if(p&&!R.isUndefined(p.id)){j=C.get(p.id);}}if(!j){n=this._createCarouselItem({className:p.className,content:p.item,id:p.id});if(R.isUndefined(q.pos)){if(!R.isUndefined(this._itemsTable.loading[r])){j=this._itemsTable.loading[r];}if(j){this._carouselEl.replaceChild(n,j);}else{this._carouselEl.appendChild(n);}}else{if(!R.isUndefined(this._itemsTable.items[q.pos+1])){m=C.get(this._itemsTable.items[q.pos+1].id);}if(m){this._carouselEl.insertBefore(n,m);}else{}}}else{if(R.isUndefined(q.pos)){if(!C.isAncestor(this._carouselEl,j)){this._carouselEl.appendChild(j);}}else{if(!C.isAncestor(this._carouselEl,j)){if(!R.isUndefined(this._itemsTable.items[q.pos+1])){this._carouselEl.insertBefore(j,C.get(this._itemsTable.items[q.pos+1].id));}}}}if(this._recomputeSize){this._setClipContainerSize();}break;case J:k=this.get("numItems");p=q.item;r=q.pos;if(p&&(n=C.get(p.id))){if(n&&C.isAncestor(this._carouselEl,n)){i.purgeElement(n,true);this._carouselEl.removeChild(n);}if(this.get("selectedItem")==r){r=r>=k?k-1:r;this.set("selectedItem",r);}}else{}break;case B:for(l=q.first;l<=q.last;l++){n=this._createCarouselItem({content:this.CONFIG.ITEM_LOADING,id:C.generateId()});if(n){if(!R.isUndefined(this._itemsTable.items[q.last+1])){m=C.get(this._itemsTable.items[q.last+1].id);
if(m){this._carouselEl.insertBefore(n,m);}else{}}else{this._carouselEl.appendChild(n);}}this._itemsTable.loading[l]=n;}break;}}e.getById=function(j){return G[j]?G[j]:false;};YAHOO.extend(e,YAHOO.util.Element,{_carouselEl:null,_clipEl:null,_firstItem:0,_isAnimationInProgress:false,_itemsTable:null,_navBtns:null,_navEl:null,_nextEnabled:true,_pages:null,_prevEnabled:true,_recomputeSize:true,CLASSES:{BUTTON:"yui-carousel-button",CAROUSEL:"yui-carousel",CAROUSEL_EL:"yui-carousel-element",CONTAINER:"yui-carousel-container",CONTENT:"yui-carousel-content",DISABLED:"yui-carousel-button-disabled",FIRST_NAV:" yui-carousel-first-button",FIRST_NAV_DISABLED:"yui-carousel-first-button-disabled",FIRST_PAGE:"yui-carousel-nav-first-page",FOCUSSED_BUTTON:"yui-carousel-button-focus",HORIZONTAL:"yui-carousel-horizontal",NAVIGATION:"yui-carousel-nav",NEXT_PAGE:"yui-carousel-next",NAV_CONTAINER:"yui-carousel-buttons",PREV_PAGE:"yui-carousel-prev",SELECTED_ITEM:"yui-carousel-item-selected",SELECTED_NAV:"yui-carousel-nav-page-selected",VERTICAL:"yui-carousel-vertical",VERTICAL_CONTAINER:"yui-carousel-vertical-container",VISIBLE:"yui-carousel-visible"},CONFIG:{FIRST_VISIBLE:0,ITEM_LOADING:"<img "+'src="../../build/carousel/assets/ajax-loader.gif" '+'alt="Loading" '+'style="margin-top:-32px;position:relative;top:50%;">',ITEM_TAG_NAME:"LI",MAX_PAGER_BUTTONS:5,MIN_WIDTH:99,NUM_VISIBLE:3,TAG_NAME:"OL"},STRINGS:{NEXT_BUTTON_TEXT:"Next Page",PAGER_PREFIX_TEXT:"Go to page ",PREVIOUS_BUTTON_TEXT:"Previous Page"},addItem:function(p,k){var n,o,m,j,l=this.get("numItems");if(!p){return false;}if(R.isString(p)||p.nodeName){o=p.nodeName?p.innerHTML:p;}else{if(R.isObject(p)){o=p.content;}else{return false;}}n=p.className||"";j=p.id?p.id:C.generateId();if(R.isUndefined(k)){this._itemsTable.items.push({item:o,className:n,id:j});}else{if(k<0||k>=l){return false;}this._itemsTable.items.splice(k,0,{item:o,className:n,id:j});}this._itemsTable.numItems++;if(l<this._itemsTable.items.length){this.set("numItems",this._itemsTable.items.length);}this.fireEvent(Q,{pos:k,ev:Q});return true;},addItems:function(j){var k,m,l=true;if(!R.isArray(j)){return false;}for(k=0,m=j.length;k<m;k++){if(this.addItem(j[k][0],j[k][1])===false){l=false;}}return l;},blur:function(){this._carouselEl.blur();this.fireEvent(V);},clearItems:function(){var j=this.get("numItems");while(j>0){this.removeItem(0);j--;}},focus:function(){var j,s,k,m,n,r,p,o,l;if(this._isAnimationInProgress){return ;}j=this.get("selectedItem");s=this.get("numVisible");k=this.get("selectOnScroll");m=this.getItem(j);n=this.get("firstVisible");r=n+s-1;p=(j<n||j>r);o=(m&&m.id)?C.get(m.id):null;l=this._itemsTable;if(!k&&p){o=(l&&l.items&&l.items[n])?C.get(l.items[n].id):null;}if(o){try{o.focus();}catch(q){}}this.fireEvent(D);},hide:function(){if(this.fireEvent(F)!==false){this.removeClass(this.CLASSES.VISIBLE);this.fireEvent(O);}},init:function(l,k){var j=l,m=false;if(!l){return ;}this._itemsTable={loading:{},numItems:0,items:[],size:0};if(R.isString(l)){l=C.get(l);}else{if(!l.nodeName){return ;}}if(l){if(!l.id){l.setAttribute("id",C.generateId());}this._parseCarousel(l);m=true;}else{l=this._createCarousel(j);}j=l.id;e.superclass.init.call(this,l,k);this.initEvents();if(m){this._parseCarouselItems();}if(!k||typeof k.isVertical=="undefined"){this.set("isVertical",false);}this._parseCarouselNavigation(l);this._navEl=this._setupCarouselNavigation();G[j]=this;H.call(this);},initAttributes:function(j){j=j||{};e.superclass.initAttributes.call(this,j);this.setAttributeConfig("currentPage",{readOnly:true,value:0});this.setAttributeConfig("firstVisible",{method:this._setFirstVisible,validator:this._validateFirstVisible,value:j.firstVisible||this.CONFIG.FIRST_VISIBLE});this.setAttributeConfig("selectOnScroll",{validator:R.isBoolean,value:j.selectOnScroll||true});this.setAttributeConfig("numVisible",{method:this._setNumVisible,validator:this._validateNumVisible,value:j.numVisible||this.CONFIG.NUM_VISIBLE});this.setAttributeConfig("numItems",{method:this._setNumItems,validator:this._validateNumItems,value:this._itemsTable.numItems});this.setAttributeConfig("scrollIncrement",{validator:this._validateScrollIncrement,value:j.scrollIncrement||1});this.setAttributeConfig("selectedItem",{method:this._setSelectedItem,validator:R.isNumber,value:0});this.setAttributeConfig("revealAmount",{method:this._setRevealAmount,validator:this._validateRevealAmount,value:j.revealAmount||0});this.setAttributeConfig("isCircular",{validator:R.isBoolean,value:j.isCircular||false});this.setAttributeConfig("isVertical",{method:this._setOrientation,validator:R.isBoolean,value:j.isVertical||false});this.setAttributeConfig("navigation",{method:this._setNavigation,validator:this._validateNavigation,value:j.navigation||{prev:null,next:null,page:null}});this.setAttributeConfig("animation",{validator:this._validateAnimation,value:j.animation||{speed:0,effect:null}});this.setAttributeConfig("autoPlay",{validator:R.isNumber,value:j.autoPlay||0});},initEvents:function(){var j=this.CLASSES;this.on("keydown",this._keyboardEventHandler);this.subscribe(h,Z);this.on(h,this.focus);this.subscribe(Q,M);this.subscribe(Q,Z);this.subscribe(J,M);this.subscribe(J,Z);this.on(d,this.focus);this.subscribe(B,M);this.subscribe(U,this._syncPagerUI);this.subscribe(T,Z);this.subscribe(T,this._syncPagerUI);this.on("selectedItemChange",function(k){P.call(this,k.newValue,k.prevValue);this._updateTabIndex(this.getElementForItem(k.newValue));this.fireEvent(d,k.newValue);});this.on("firstVisibleChange",function(k){if(!this.get("selectOnScroll")){this._updateTabIndex(this.getElementForItem(k.newValue));}});this.on("click",this._itemClickHandler);this.on("click",this._pagerClickHandler);i.onFocus(this.get("element"),function(k,l){l._updateNavButtons(i.getTarget(k),true);},this);i.onBlur(this.get("element"),function(k,l){l._updateNavButtons(i.getTarget(k),false);},this);},getElementForItem:function(j){if(j<0||j>=this.get("numItems")){return null;}if(this._itemsTable.numItems>j){if(!R.isUndefined(this._itemsTable.items[j])){return C.get(this._itemsTable.items[j].id);
}}return null;},getElementForItems:function(){var k=[],j;for(j=0;j<this._itemsTable.numItems;j++){k.push(this.getElementForItem(j));}return k;},getItem:function(j){if(j<0||j>=this.get("numItems")){return null;}if(this._itemsTable.numItems>j){if(!R.isUndefined(this._itemsTable.items[j])){return this._itemsTable.items[j];}}return null;},getItems:function(j){return this._itemsTable.items;},getItemPositionById:function(l){var j=0,k=this._itemsTable.numItems;while(j<k){if(!R.isUndefined(this._itemsTable.items[j])){if(this._itemsTable.items[j].id==l){return j;}}j++;}return -1;},removeItem:function(k){var l,j=this.get("numItems");if(k<0||k>=j){return false;}l=this._itemsTable.items.splice(k,1);if(l&&l.length==1){this.set("numItems",j-1);this.fireEvent(J,{item:l[0],pos:k,ev:J});return true;}return false;},render:function(l){var k=this.CONFIG,j=this.CLASSES,m;this.addClass(j.CAROUSEL);if(!this._clipEl){this._clipEl=this._createCarouselClip();this._clipEl.appendChild(this._carouselEl);}if(l){this.appendChild(this._clipEl);this.appendTo(l);this._setClipContainerSize();}else{if(!C.inDocument(this.get("element"))){return false;}this.appendChild(this._clipEl);}if(this.get("isVertical")){m=Y.call(this);m=m<k.MIN_WIDTH?k.MIN_WIDTH:m;this.setStyle("width",m+"px");this.addClass(j.VERTICAL);}else{this.addClass(j.HORIZONTAL);}if(this.get("numItems")<1){return false;}this.set("selectedItem",this.get("firstVisible"));this.fireEvent(T);this._setContainerSize();return true;},scrollBackward:function(){this.scrollTo(this._firstItem-this.get("scrollIncrement"));},scrollForward:function(){this.scrollTo(this._firstItem+this.get("scrollIncrement"));},scrollPageBackward:function(){this.scrollTo(this._firstItem-this.get("numVisible"));},scrollPageForward:function(){this.scrollTo(this._firstItem+this.get("numVisible"));},scrollTo:function(x,v){var u,m,j,w=this.get("animation"),p=this.get("isCircular"),y,z,AA=this._firstItem,t,s=this.get("numItems"),k=this.get("numVisible"),n,l=this.get("currentPage"),o,r,q;if(x==AA){return ;}if(this._isAnimationInProgress){return ;}if(x<0){if(p){x=s+x;}else{return ;}}else{if(x>s-1){if(this.get("isCircular")){x=s-x;}else{return ;}}}z=(this._firstItem>x)?"backward":"forward";r=AA+k;r=(r>s-1)?s-1:r;o=this.fireEvent(b,{dir:z,first:AA,last:r});if(o===false){return ;}this.fireEvent(f,{page:l});y=AA-x;this._firstItem=x;this.set("firstVisible",x);H.call(this);r=x+k;r=(r>s-1)?s-1:r;q=this.get("isVertical")?"top":"left";n=S.call(this,y);m=w.speed>0;if(m){this._isAnimationInProgress=true;if(this.get("isVertical")){j={points:{by:[0,n]}};}else{j={points:{by:[n,0]}};}u=new YAHOO.util.Motion(this._carouselEl,j,w.speed,w.effect);u.onComplete.subscribe(function(AB){var AC=this.get("firstVisible");this._isAnimationInProgress=false;this.fireEvent(h,{first:AC,last:r});},null,this);u.animate();u=null;}else{n+=K(this._carouselEl,q);C.setStyle(this._carouselEl,q,n+"px");}t=parseInt(this._firstItem/k,10);if(t!=l){this.setAttributeConfig("currentPage",{value:t});this.fireEvent(U,t);}if(!v){if(this.get("selectOnScroll")){if(x!=this._selectedItem){this.set("selectedItem",this._getSelectedItem(x));}}}delete this._autoPlayTimer;if(this.get("autoPlay")>0){this.startAutoPlay();}if(!m){this.fireEvent(h,{first:x,last:r});}},show:function(){var j=this.CLASSES;if(this.fireEvent(A)!==false){this.addClass(j.VISIBLE);this.fireEvent(I);}},startAutoPlay:function(){var j=this,k=this.get("autoPlay");if(k>0){if(!R.isUndefined(this._autoPlayTimer)){return ;}this.fireEvent(c);this._autoPlayTimer=setTimeout(function(){L.call(j);},k);}},stopAutoPlay:function(){if(!R.isUndefined(this._autoPlayTimer)){clearTimeout(this._autoPlayTimer);delete this._autoPlayTimer;this.set("autoPlay",0);this.fireEvent(g);}},toString:function(){return W+(this.get?" (#"+this.get("id")+")":"");},_createCarousel:function(k){var j=this.CLASSES;var l=a("DIV",{className:j.CAROUSEL,id:k});if(!this._carouselEl){this._carouselEl=a(this.CONFIG.TAG_NAME,{className:j.CAROUSEL_EL});}return l;},_createCarouselClip:function(){var j=a("DIV",{className:this.CLASSES.CONTENT});this._setClipContainerSize(j);return j;},_createCarouselItem:function(j){return a(this.CONFIG.ITEM_TAG_NAME,{className:j.className,content:j.content,id:j.id});},_getSelectedItem:function(m){var j=this.get("isCircular"),l=this.get("numItems"),k=l-1;if(m<0){if(j){m=l+m;}else{m=this.get("selectedItem");}}else{if(m>k){if(j){m=m-l;}else{m=this.get("selectedItem");}}}return m;},_itemClickHandler:function(m){var j=this.get("element"),k,l,n=YAHOO.util.Event.getTarget(m);while(n&&n!=j&&n.id!=this._carouselEl){k=n.nodeName;if(k.toUpperCase()==this.CONFIG.ITEM_TAG_NAME){break;}n=n.parentNode;}if((l=this.getItemPositionById(n.id))>=0){this.set("selectedItem",this._getSelectedItem(l));}},_keyboardEventHandler:function(m){var l=i.getCharCode(m),k=false,j=0,n;if(this._isAnimationInProgress){return ;}switch(l){case 37:case 38:n=this.get("selectedItem");if(n==this._firstItem){j=n-this.get("numVisible");this.scrollTo(j);this.set("selectedItem",this._getSelectedItem(n-1));}else{j=this.get("selectedItem")-this.get("scrollIncrement");this.set("selectedItem",this._getSelectedItem(j));}k=true;break;case 39:case 40:j=this.get("selectedItem")+this.get("scrollIncrement");this.set("selectedItem",this._getSelectedItem(j));k=true;break;case 33:this.scrollPageBackward();k=true;break;case 34:this.scrollPageForward();k=true;break;}if(k){i.preventDefault(m);}},_pagerClickHandler:function(j){var m,k,l;k=i.getTarget(j);l=k.href||k.value;if(R.isString(l)&&l){m=l.lastIndexOf("#");if(m!=-1){l=this.getItemPositionById(l.substring(m+1));this.scrollTo(l);i.preventDefault(j);}}},_parseCarousel:function(k){var n,j,m,l;j=this.CLASSES;m=false;for(n=k.firstChild;n;n=n.nextSibling){if(n.nodeType==1){l=n.nodeName;if(l.toUpperCase()==this.CONFIG.TAG_NAME){this._carouselEl=n;C.addClass(this._carouselEl,this.CLASSES.CAROUSEL_EL);m=true;}}}return m;},_parseCarouselItems:function(){var m,j,l,k=this._carouselEl;for(m=k.firstChild;m;m=m.nextSibling){if(m.nodeType==1){l=m.nodeName;
if(l.toUpperCase()==this.CONFIG.ITEM_TAG_NAME){if(m.id){j=m.id;}else{j=C.generateId();m.setAttribute("id",j);}this.addItem(m);}}}},_parseCarouselNavigation:function(p){var l,k=this.CLASSES,o,n,m,q,r=false;q=C.getElementsByClassName(k.PREV_PAGE,"*",p);if(q.length>0){for(n in q){if(q.hasOwnProperty(n)){o=q[n];if(o.nodeName=="INPUT"||o.nodeName=="BUTTON"){if(typeof this._navBtns.prev=="undefined"){this._navBtns.prev=[];}this._navBtns.prev.push(o);}else{m=o.getElementsByTagName("INPUT");if(R.isArray(m)&&m.length>0){this._navBtns.prev.push(m[0]);}else{m=o.getElementsByTagName("BUTTON");if(R.isArray(m)&&m.length>0){this._navBtns.prev.push(m[0]);}}}}}l={prev:q};}q=C.getElementsByClassName(k.NEXT_PAGE,"*",p);if(q.length>0){for(n in q){if(q.hasOwnProperty(n)){o=q[n];if(o.nodeName=="INPUT"||o.nodeName=="BUTTON"){if(typeof this._navBtns.next=="undefined"){this._navBtns.next=[];}this._navBtns.next.push(o);}else{m=o.getElementsByTagName("INPUT");if(R.isArray(m)&&m.length>0){this._navBtns.next.push(m[0]);}else{m=o.getElementsByTagName("BUTTON");if(R.isArray(m)&&m.length>0){this._navBtns.next.push(m[0]);}}}}}if(l){l.next=q;}else{l={next:q};}}if(l){this.set("navigation",l);r=true;}return r;},_setupCarouselNavigation:function(){var m,k,j,q,n,p,o,l;j=this.CLASSES;n=C.getElementsByClassName(j.NAVIGATION,"DIV",this.get("element"));if(n.length===0){n=a("DIV",{className:j.NAVIGATION});this.insertBefore(n,C.getFirstChild(this.get("element")));}else{n=n[0];}this._pages.el=a("UL");n.appendChild(this._pages.el);q=this.get("navigation");if(q.prev&&q.prev.length>0){n.appendChild(q.prev[0]);}else{l=a("SPAN",{className:j.BUTTON+j.FIRST_NAV});C.setStyle(l,"visibility","visible");m=C.generateId();l.innerHTML='<input type="button" '+'id="'+m+'" '+'value="'+this.STRINGS.PREVIOUS_BUTTON_TEXT+'" '+'name="'+this.STRINGS.PREVIOUS_BUTTON_TEXT+'">';n.appendChild(l);m=C.get(m);this._navBtns.prev=[m];k={prev:[l]};}if(q.next&&q.next.length>0){n.appendChild(q.next[0]);}else{p=a("SPAN",{className:j.BUTTON});C.setStyle(p,"visibility","visible");m=C.generateId();p.innerHTML='<input type="button" '+'id="'+m+'" '+'value="'+this.STRINGS.NEXT_BUTTON_TEXT+'" '+'name="'+this.STRINGS.NEXT_BUTTON_TEXT+'">';n.appendChild(p);m=C.get(m);this._navBtns.next=[m];if(k){k.next=[p];}else{k={next:[p]};}}if(k){this.set("navigation",k);}return n;},_setClipContainerSize:function(k,m){var n,j,o,p,q,r,l;o=this.get("isVertical");q=this.get("revealAmount");l=o?"height":"width";n=o?"top":"left";k=k||this._clipEl;if(!k){return ;}m=m||this.get("numVisible");p=Y.call(this,l);r=p*m;this._recomputeSize=(r===0);if(this._recomputeSize){return ;}if(q>0){q=p*(q/100)*2;r+=q;j=parseFloat(C.getStyle(this._carouselEl,n));j=R.isNumber(j)?j:0;C.setStyle(this._carouselEl,n,j+(q/2)+"px");}if(o){r+=K(this._carouselEl,"marginTop")+K(this._carouselEl,"marginBottom")+K(this._carouselEl,"paddingTop")+K(this._carouselEl,"paddingBottom")+K(this._carouselEl,"borderTop")+K(this._carouselEl,"borderBottom");C.setStyle(k,l,(r-(m-1))+"px");}else{r+=K(this._carouselEl,"marginLeft")+K(this._carouselEl,"marginRight")+K(this._carouselEl,"paddingLeft")+K(this._carouselEl,"paddingRight")+K(this._carouselEl,"borderLeft")+K(this._carouselEl,"borderRight");C.setStyle(k,l,r+"px");}this._setContainerSize(k);},_setContainerSize:function(l,j){var m,k;m=this.get("isVertical");l=l||this._clipEl;j=j||(m?"height":"width");k=parseFloat(C.getStyle(l,j),10);k=R.isNumber(k)?k:0;k+=K(l,"marginLeft")+K(l,"marginRight")+K(l,"paddingLeft")+K(l,"paddingRight")+K(l,"borderLeft")+K(l,"borderRight");if(m){k+=K(this._navEl,"height");}this.setStyle(j,k+"px");},_setFirstVisible:function(j){if(j>=0&&j<this.get("numItems")){this.scrollTo(j);}else{j=this.get("firstVisible");}return j;},_setNavigation:function(j){if(j.prev){i.on(j.prev,"click",N,this);}if(j.next){i.on(j.next,"click",X,this);}},_setNumVisible:function(j){if(j>1&&j<this.get("numItems")){this._setClipContainerSize(this._clipEl,j);}else{j=this.get("numVisible");}return j;},_setNumItems:function(k){var j=this._itemsTable.numItems;if(R.isArray(this._itemsTable.items)){if(this._itemsTable.items.length!=j){j=this._itemsTable.items.length;this._itemsTable.numItems=j;}}if(k<j){while(j>k){this.removeItem(j-1);j--;}}return k;},_setOrientation:function(k){var j=this.CLASSES;if(k){this.replaceClass(j.HORIZONTAL,j.VERTICAL);}else{this.replaceClass(j.VERTICAL,j.HORIZONTAL);}this._itemsTable.size=0;return k;},_setRevealAmount:function(j){if(j>=0&&j<=100){j=parseInt(j,10);j=R.isNumber(j)?j:0;this._setClipContainerSize();}else{j=this.get("revealAmount");}return j;},_setSelectedItem:function(j){this._selectedItem=j;},_syncPagerUI:function(p){var k,j=this.CLASSES,n,m="",l,o=this.get("numVisible");p=p||0;l=Math.ceil(this.get("numItems")/o);this._pages.num=l;this._pages.cur=p;if(l>this.CONFIG.MAX_PAGER_BUTTONS){m="<form><select>";}else{m="";}for(n=0;n<l;n++){if(R.isUndefined(this._itemsTable.items[n*o])){break;}k=this._itemsTable.items[n*o].id;if(l>this.CONFIG.MAX_PAGER_BUTTONS){m+='<option value="#'+k+'" '+(n==p?" selected":"")+">"+this.STRINGS.PAGER_PREFIX_TEXT+" "+(n+1)+"</option>";}else{m+='<li class="'+(n===0?j.FIRST_PAGE:"")+(n==p?" "+j.SELECTED_NAV:"")+'"><a href="#'+k+'" tabindex="0"><em>'+this.STRINGS.PAGER_PREFIX_TEXT+" "+(n+1)+"</em></a></li>";}}if(l>this.CONFIG.MAX_PAGER_BUTTONS){m+="</select></form>";}this._pages.el.innerHTML=m;m=null;},_updateNavButtons:function(n,k){var l,j=this.CLASSES,o,m=n.parentNode;if(!m){return ;}o=m.parentNode;if(n.nodeName.toUpperCase()=="INPUT"&&C.hasClass(m,j.BUTTON)){if(k){if(o){l=C.getChildren(o);if(l){C.removeClass(l,j.FOCUSSED_BUTTON);}}C.addClass(m,j.FOCUSSED_BUTTON);}else{C.removeClass(m,j.FOCUSSED_BUTTON);}}},_updateTabIndex:function(j){if(j){if(this._focusableItemEl){this._focusableItemEl.tabIndex=-1;}this._focusableItemEl=j;j.tabIndex=0;}},_validateAnimation:function(j){var k=true;if(R.isObject(j)){if(j.speed){k=k&&R.isNumber(j.speed);}if(j.effect){k=k&&R.isFunction(j.effect);}else{if(!R.isUndefined(YAHOO.util.Easing)){j.effect=YAHOO.util.Easing.easeOut;
}}}else{k=false;}return k;},_validateFirstVisible:function(j){var k=false;if(R.isNumber(j)){k=(j>=0&&j<this.get("numItems"));}return k;},_validateNavigation:function(j){var k;if(!R.isObject(j)){return false;}if(j.prev){if(!R.isArray(j.prev)){return false;}for(k in j.prev){if(j.prev.hasOwnProperty(k)){if(!R.isString(j.prev[k].nodeName)){return false;}}}}if(j.next){if(!R.isArray(j.next)){return false;}for(k in j.next){if(j.next.hasOwnProperty(k)){if(!R.isString(j.next[k].nodeName)){return false;}}}}return true;},_validateNumItems:function(j){var k=false;if(R.isNumber(j)){k=j>0;}return k;},_validateNumVisible:function(j){var k=false;if(R.isNumber(j)){k=j>0&&j<this.get("numItems");}return k;},_validateRevealAmount:function(j){var k=false;if(R.isNumber(j)){k=j>=0&&j<100;}return k;},_validateScrollIncrement:function(j){var k=false;if(R.isNumber(j)){k=(j>0&&j<this.get("numItems"));}return k;}});})();YAHOO.register("carousel",YAHOO.widget.Carousel,{version:"2.6.0",build:"1321"});
    if (!Y.YUI2) {
        Y.YUI2 = YAHOO;
    }
    if (!YAHOO._activ && YAHOO.util.Event) {
        YAHOO._activ = true;
        YAHOO.util.Event._load();
    }
}, '2.6.0' ,{"requires": ["yui2-yahoo", "yui2-dom", "yui2-event", "yui2-element", "yui2-skin-sam-carousel"], "optional": ["yui2-animation"]});
