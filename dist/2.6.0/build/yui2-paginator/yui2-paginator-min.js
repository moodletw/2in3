YUI.add('yui2-paginator', function(Y) {
    if (Y.YUI2) {
        var YAHOO    = Y.YUI2,
            window   = Y.config.win,
            document = Y.config.doc;
    }
    /*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.6.0
*/
YAHOO.widget.Paginator=function(D){var H=YAHOO.widget.Paginator.VALUE_UNLIMITED,G=YAHOO.lang,E,A,B,C;D=G.isObject(D)?D:{};this.initConfig();this.initEvents();this.set("rowsPerPage",D.rowsPerPage,true);if(G.isNumber(D.totalRecords)){this.set("totalRecords",D.totalRecords,true);}this.initUIComponents();for(E in D){if(G.hasOwnProperty(D,E)){this.set(E,D[E],true);}}A=this.get("initialPage");B=this.get("totalRecords");C=this.get("rowsPerPage");if(A>1&&C!==H){var F=(A-1)*C;if(B===H||F<B){this.set("recordOffset",F,true);}}};YAHOO.lang.augmentObject(YAHOO.widget.Paginator,{id:0,ID_BASE:"yui-pg",VALUE_UNLIMITED:-1,TEMPLATE_DEFAULT:"{FirstPageLink} {PreviousPageLink} {PageLinks} {NextPageLink} {LastPageLink}",TEMPLATE_ROWS_PER_PAGE:"{FirstPageLink} {PreviousPageLink} {PageLinks} {NextPageLink} {LastPageLink} {RowsPerPageDropdown}",ui:{}},true);YAHOO.widget.Paginator.prototype={_containers:[],_batch:false,_pageChanged:false,_state:null,initConfig:function(){var B=YAHOO.widget.Paginator.VALUE_UNLIMITED,A=YAHOO.lang;this.setAttributeConfig("rowsPerPage",{value:0,validator:A.isNumber});this.setAttributeConfig("containers",{value:null,validator:function(E){if(!A.isArray(E)){E=[E];}for(var D=0,C=E.length;D<C;++D){if(A.isString(E[D])||(A.isObject(E[D])&&E[D].nodeType===1)){continue;}return false;}return true;},method:function(C){C=YAHOO.util.Dom.get(C);if(!A.isArray(C)){C=[C];}this._containers=C;}});this.setAttributeConfig("totalRecords",{value:0,validator:A.isNumber});this.setAttributeConfig("recordOffset",{value:0,validator:function(D){var C=this.get("totalRecords");if(A.isNumber(D)){return C===B||C>D||(C===0&&D===0);}return false;}});this.setAttributeConfig("initialPage",{value:1,validator:A.isNumber});this.setAttributeConfig("template",{value:YAHOO.widget.Paginator.TEMPLATE_DEFAULT,validator:A.isString});this.setAttributeConfig("containerClass",{value:"yui-pg-container",validator:A.isString});this.setAttributeConfig("alwaysVisible",{value:true,validator:A.isBoolean});this.setAttributeConfig("updateOnChange",{value:false,validator:A.isBoolean});this.setAttributeConfig("id",{value:YAHOO.widget.Paginator.id++,readOnly:true});this.setAttributeConfig("rendered",{value:false,readOnly:true});},initUIComponents:function(){var C=YAHOO.widget.Paginator.ui,B,A;for(B in C){if(YAHOO.lang.hasOwnProperty(C,B)){A=C[B];if(YAHOO.lang.isObject(A)&&YAHOO.lang.isFunction(A.init)){A.init(this);}}}},initEvents:function(){this.createEvent("recordOffsetChange");this.createEvent("totalRecordsChange");this.createEvent("rowsPerPageChange");this.createEvent("alwaysVisibleChange");this.createEvent("render");this.createEvent("rendered");this.createEvent("changeRequest");this.createEvent("pageChange");this.createEvent("beforeDestroy");this.createEvent("destroy");this._selfSubscribe();},_selfSubscribe:function(){this.subscribe("totalRecordsChange",this.updateVisibility,this,true);this.subscribe("alwaysVisibleChange",this.updateVisibility,this,true);this.subscribe("totalRecordsChange",this._handleStateChange,this,true);this.subscribe("recordOffsetChange",this._handleStateChange,this,true);this.subscribe("rowsPerPageChange",this._handleStateChange,this,true);this.subscribe("totalRecordsChange",this._syncRecordOffset,this,true);},_syncRecordOffset:function(D){var A=D.newValue,C,B;if(D.prevValue!==A){if(A!==YAHOO.widget.Paginator.VALUE_UNLIMITED){C=this.get("rowsPerPage");if(C&&this.get("recordOffset")>=A){B=this.getState({totalRecords:D.prevValue,recordOffset:this.get("recordOffset")});this.set("recordOffset",B.before.recordOffset);this._firePageChange(B);}}}},_handleStateChange:function(B){if(B.prevValue!==B.newValue){var C=this._state||{},A;C[B.type.replace(/Change$/,"")]=B.prevValue;A=this.getState(C);if(A.page!==A.before.page){if(this._batch){this._pageChanged=true;}else{this._firePageChange(A);}}}},_firePageChange:function(A){if(YAHOO.lang.isObject(A)){var B=A.before;delete A.before;this.fireEvent("pageChange",{type:"pageChange",prevValue:A.page,newValue:B.page,prevState:A,newState:B});}},render:function(){if(this.get("rendered")){return ;}var M=this.get("totalRecords");if(M!==YAHOO.widget.Paginator.VALUE_UNLIMITED&&M<this.get("rowsPerPage")&&!this.get("alwaysVisible")){return ;}var F=YAHOO.util.Dom,N=this.get("template"),P=this.get("containerClass");N=N.replace(/\{([a-z0-9_ \-]+)\}/gi,'<span class="yui-pg-ui $1"></span>');for(var H=0,J=this._containers.length;H<J;++H){var L=this._containers[H],G=YAHOO.widget.Paginator.ID_BASE+this.get("id")+"-"+H;if(!L){continue;}L.style.display="none";F.addClass(L,P);L.innerHTML=N;var E=F.getElementsByClassName("yui-pg-ui","span",L);for(var D=0,O=E.length;D<O;++D){var C=E[D],B=C.parentNode,A=C.className.replace(/\s*yui-pg-ui\s+/g,""),K=YAHOO.widget.Paginator.ui[A];if(YAHOO.lang.isFunction(K)){var I=new K(this);if(YAHOO.lang.isFunction(I.render)){B.replaceChild(I.render(G),C);}}}L.style.display="";}if(this._containers.length){this.setAttributeConfig("rendered",{value:true});this.fireEvent("render",this.getState());this.fireEvent("rendered",this.getState());}},destroy:function(){this.fireEvent("beforeDestroy");this.fireEvent("destroy");this.setAttributeConfig("rendered",{value:false});},updateVisibility:function(F){var B=this.get("alwaysVisible");if(F.type==="alwaysVisibleChange"||!B){var H=this.get("totalRecords"),G=true,D=this.get("rowsPerPage"),E=this.get("rowsPerPageOptions"),C,A;if(YAHOO.lang.isArray(E)){for(C=0,A=E.length;C<A;++C){D=Math.min(D,E[C]);}}if(H!==YAHOO.widget.Paginator.VALUE_UNLIMITED&&H<=D){G=false;}G=G||B;for(C=0,A=this._containers.length;C<A;++C){YAHOO.util.Dom.setStyle(this._containers[C],"display",G?"":"none");}}},getContainerNodes:function(){return this._containers;},getTotalPages:function(){var A=this.get("totalRecords");var B=this.get("rowsPerPage");if(!B){return null;}if(A===YAHOO.widget.Paginator.VALUE_UNLIMITED){return YAHOO.widget.Paginator.VALUE_UNLIMITED;}return Math.ceil(A/B);},hasPage:function(B){if(!YAHOO.lang.isNumber(B)||B<1){return false;}var A=this.getTotalPages();
return(A===YAHOO.widget.Paginator.VALUE_UNLIMITED||A>=B);},getCurrentPage:function(){var A=this.get("rowsPerPage");if(!A||!this.get("totalRecords")){return 0;}return Math.floor(this.get("recordOffset")/A)+1;},hasNextPage:function(){var A=this.getCurrentPage(),B=this.getTotalPages();return A&&(B===YAHOO.widget.Paginator.VALUE_UNLIMITED||A<B);},getNextPage:function(){return this.hasNextPage()?this.getCurrentPage()+1:null;},hasPreviousPage:function(){return(this.getCurrentPage()>1);},getPreviousPage:function(){return(this.hasPreviousPage()?this.getCurrentPage()-1:1);},getPageRecords:function(D){if(!YAHOO.lang.isNumber(D)){D=this.getCurrentPage();}var C=this.get("rowsPerPage"),B=this.get("totalRecords"),E,A;if(!D||!C){return null;}E=(D-1)*C;if(B!==YAHOO.widget.Paginator.VALUE_UNLIMITED){if(E>=B){return null;}A=Math.min(E+C,B)-1;}else{A=E+C-1;}return[E,A];},setPage:function(B,A){if(this.hasPage(B)&&B!==this.getCurrentPage()){if(this.get("updateOnChange")||A){this.set("recordOffset",(B-1)*this.get("rowsPerPage"));}else{this.fireEvent("changeRequest",this.getState({"page":B}));}}},getRowsPerPage:function(){return this.get("rowsPerPage");},setRowsPerPage:function(B,A){if(YAHOO.lang.isNumber(B)&&B>0&&B!==this.get("rowsPerPage")){if(this.get("updateOnChange")||A){this.set("rowsPerPage",B);}else{this.fireEvent("changeRequest",this.getState({"rowsPerPage":B}));}}},getTotalRecords:function(){return this.get("totalRecords");},setTotalRecords:function(B,A){if(YAHOO.lang.isNumber(B)&&B>=0&&B!==this.get("totalRecords")){if(this.get("updateOnChange")||A){this.set("totalRecords",B);}else{this.fireEvent("changeRequest",this.getState({"totalRecords":B}));}}},getStartIndex:function(){return this.get("recordOffset");},setStartIndex:function(B,A){if(YAHOO.lang.isNumber(B)&&B>=0&&B!==this.get("recordOffset")){if(this.get("updateOnChange")||A){this.set("recordOffset",B);}else{this.fireEvent("changeRequest",this.getState({"recordOffset":B}));}}},getState:function(J){var L=YAHOO.widget.Paginator.VALUE_UNLIMITED,D=YAHOO.lang,H=Math,F=H.min,I=H.max,G=H.floor,K=H.ceil,C,A,E;function B(O,M,N){if(O<=0||M===0){return 0;}if(M===L||M>O){return O-(O%N);}return M-(M%N||N);}C={paginator:this,totalRecords:this.get("totalRecords"),rowsPerPage:this.get("rowsPerPage"),records:this.getPageRecords()};C.recordOffset=B(this.get("recordOffset"),C.totalRecords,C.rowsPerPage);C.page=K(C.recordOffset/C.rowsPerPage)+1;if(!J){return C;}A={paginator:this,before:C,rowsPerPage:J.rowsPerPage||C.rowsPerPage,totalRecords:(D.isNumber(J.totalRecords)?I(J.totalRecords,L):C.totalRecords)};if(A.totalRecords===0){A.recordOffset=A.page=0;}else{E=D.isNumber(J.page)?(J.page-1)*A.rowsPerPage:D.isNumber(J.recordOffset)?J.recordOffset:C.recordOffset;A.recordOffset=B(E,A.totalRecords,A.rowsPerPage);A.page=K(A.recordOffset/A.rowsPerPage)+1;}A.records=[A.recordOffset,A.recordOffset+A.rowsPerPage-1];if(A.totalRecords!==L&&A.recordOffset<A.totalRecords&&A.records&&A.records[1]>A.totalRecords-1){A.records[1]=A.totalRecords-1;}return A;},setState:function(B){if(YAHOO.lang.isObject(B)){this._state=this.getState({});B={page:B.page,rowsPerPage:B.rowsPerPage,totalRecords:B.totalRecords,recordOffset:B.recordOffset};if(B.page&&B.recordOffset===undefined){B.recordOffset=(B.page-1)*(B.rowsPerPage||this.get("rowsPerPage"));}this._batch=true;this._pageChanged=false;for(var A in B){if(B.hasOwnProperty(A)){this.set(A,B[A]);}}this._batch=false;if(this._pageChanged){this._pageChanged=false;this._firePageChange(this.getState(this._state));}}}};YAHOO.lang.augmentProto(YAHOO.widget.Paginator,YAHOO.util.AttributeProvider);(function(){var B=YAHOO.widget.Paginator,A=YAHOO.lang;B.ui.CurrentPageReport=function(C){this.paginator=C;C.createEvent("pageReportClassChange");C.createEvent("pageReportTemplateChange");C.subscribe("recordOffsetChange",this.update,this,true);C.subscribe("rowsPerPageChange",this.update,this,true);C.subscribe("totalRecordsChange",this.update,this,true);C.subscribe("pageReportTemplateChange",this.update,this,true);C.subscribe("destroy",this.destroy,this,true);C.subscribe("pageReportClassChange",this.update,this,true);};B.ui.CurrentPageReport.init=function(C){C.setAttributeConfig("pageReportClass",{value:"yui-pg-current",validator:A.isString});C.setAttributeConfig("pageReportTemplate",{value:"({currentPage} of {totalPages})",validator:A.isString});C.setAttributeConfig("pageReportValueGenerator",{value:function(F){var E=F.getCurrentPage(),D=F.getPageRecords();return{"currentPage":D?E:0,"totalPages":F.getTotalPages(),"startIndex":D?D[0]:0,"endIndex":D?D[1]:0,"startRecord":D?D[0]+1:0,"endRecord":D?D[1]+1:0,"totalRecords":F.get("totalRecords")};},validator:A.isFunction});};B.ui.CurrentPageReport.sprintf=function(D,C){return D.replace(/\{([\w\s\-]+)\}/g,function(E,F){return(F in C)?C[F]:"";});};B.ui.CurrentPageReport.prototype={span:null,render:function(C){this.span=document.createElement("span");this.span.id=C+"-page-report";this.span.className=this.paginator.get("pageReportClass");this.update();return this.span;},update:function(C){if(C&&C.prevValue===C.newValue){return ;}this.span.innerHTML=B.ui.CurrentPageReport.sprintf(this.paginator.get("pageReportTemplate"),this.paginator.get("pageReportValueGenerator")(this.paginator));},destroy:function(){this.span.parentNode.removeChild(this.span);this.span=null;}};})();(function(){var B=YAHOO.widget.Paginator,A=YAHOO.lang;B.ui.PageLinks=function(C){this.paginator=C;C.createEvent("pageLinkClassChange");C.createEvent("currentPageClassChange");C.createEvent("pageLinksContainerClassChange");C.createEvent("pageLinksChange");C.subscribe("recordOffsetChange",this.update,this,true);C.subscribe("rowsPerPageChange",this.update,this,true);C.subscribe("totalRecordsChange",this.update,this,true);C.subscribe("pageLinksChange",this.rebuild,this,true);C.subscribe("pageLinkClassChange",this.rebuild,this,true);C.subscribe("currentPageClassChange",this.rebuild,this,true);C.subscribe("destroy",this.destroy,this,true);C.subscribe("pageLinksContainerClassChange",this.rebuild,this,true);
};B.ui.PageLinks.init=function(C){C.setAttributeConfig("pageLinkClass",{value:"yui-pg-page",validator:A.isString});C.setAttributeConfig("currentPageClass",{value:"yui-pg-current-page",validator:A.isString});C.setAttributeConfig("pageLinksContainerClass",{value:"yui-pg-pages",validator:A.isString});C.setAttributeConfig("pageLinks",{value:10,validator:A.isNumber});C.setAttributeConfig("pageLabelBuilder",{value:function(D,E){return D;},validator:A.isFunction});};B.ui.PageLinks.calculateRange=function(E,F,D){var I=B.VALUE_UNLIMITED,H,C,G;if(!E||D===0||F===0||(F===I&&D===I)){return[0,-1];}if(F!==I){D=D===I?F:Math.min(D,F);}H=Math.max(1,Math.ceil(E-(D/2)));if(F===I){C=H+D-1;}else{C=Math.min(F,H+D-1);}G=D-(C-H+1);H=Math.max(1,H-G);return[H,C];};B.ui.PageLinks.prototype={current:0,container:null,render:function(C){var D=this.paginator;this.container=document.createElement("span");this.container.id=C+"-pages";this.container.className=D.get("pageLinksContainerClass");YAHOO.util.Event.on(this.container,"click",this.onClick,this,true);this.update({newValue:null,rebuild:true});return this.container;},update:function(J){if(J&&J.prevValue===J.newValue){return ;}var E=this.paginator,I=E.getCurrentPage();if(this.current!==I||!I||J.rebuild){var L=E.get("pageLabelBuilder"),H=B.ui.PageLinks.calculateRange(I,E.getTotalPages(),E.get("pageLinks")),D=H[0],F=H[1],K="",C,G;C='<a href="#" class="'+E.get("pageLinkClass")+'" page="';for(G=D;G<=F;++G){if(G===I){K+='<span class="'+E.get("currentPageClass")+" "+E.get("pageLinkClass")+'">'+L(G,E)+"</span>";}else{K+=C+G+'">'+L(G,E)+"</a>";}}this.container.innerHTML=K;}},rebuild:function(C){C.rebuild=true;this.update(C);},destroy:function(){YAHOO.util.Event.purgeElement(this.container,true);this.container.parentNode.removeChild(this.container);this.container=null;},onClick:function(D){var C=YAHOO.util.Event.getTarget(D);if(C&&YAHOO.util.Dom.hasClass(C,this.paginator.get("pageLinkClass"))){YAHOO.util.Event.stopEvent(D);this.paginator.setPage(parseInt(C.getAttribute("page"),10));}}};})();(function(){var B=YAHOO.widget.Paginator,A=YAHOO.lang;B.ui.FirstPageLink=function(C){this.paginator=C;C.createEvent("firstPageLinkLabelChange");C.createEvent("firstPageLinkClassChange");C.subscribe("recordOffsetChange",this.update,this,true);C.subscribe("rowsPerPageChange",this.update,this,true);C.subscribe("totalRecordsChange",this.update,this,true);C.subscribe("destroy",this.destroy,this,true);C.subscribe("firstPageLinkLabelChange",this.update,this,true);C.subscribe("firstPageLinkClassChange",this.update,this,true);};B.ui.FirstPageLink.init=function(C){C.setAttributeConfig("firstPageLinkLabel",{value:"&lt;&lt;&nbsp;first",validator:A.isString});C.setAttributeConfig("firstPageLinkClass",{value:"yui-pg-first",validator:A.isString});};B.ui.FirstPageLink.prototype={current:null,link:null,span:null,render:function(D){var E=this.paginator,F=E.get("firstPageLinkClass"),C=E.get("firstPageLinkLabel");this.link=document.createElement("a");this.span=document.createElement("span");this.link.id=D+"-first-link";this.link.href="#";this.link.className=F;this.link.innerHTML=C;YAHOO.util.Event.on(this.link,"click",this.onClick,this,true);this.span.id=D+"-first-span";this.span.className=F;this.span.innerHTML=C;this.current=E.get("recordOffset")<1?this.span:this.link;return this.current;},update:function(D){if(D&&D.prevValue===D.newValue){return ;}var C=this.current?this.current.parentNode:null;if(this.paginator.get("recordOffset")<1){if(C&&this.current===this.link){C.replaceChild(this.span,this.current);this.current=this.span;}}else{if(C&&this.current===this.span){C.replaceChild(this.link,this.current);this.current=this.link;}}},destroy:function(){YAHOO.util.Event.purgeElement(this.link);this.current.parentNode.removeChild(this.current);this.link=this.span=null;},onClick:function(C){YAHOO.util.Event.stopEvent(C);this.paginator.setPage(1);}};})();(function(){var B=YAHOO.widget.Paginator,A=YAHOO.lang;B.ui.LastPageLink=function(C){this.paginator=C;C.createEvent("lastPageLinkLabelChange");C.createEvent("lastPageLinkClassChange");C.subscribe("recordOffsetChange",this.update,this,true);C.subscribe("rowsPerPageChange",this.update,this,true);C.subscribe("totalRecordsChange",this.update,this,true);C.subscribe("destroy",this.destroy,this,true);C.subscribe("lastPageLinkLabelChange",this.update,this,true);C.subscribe("lastPageLinkClassChange",this.update,this,true);};B.ui.LastPageLink.init=function(C){C.setAttributeConfig("lastPageLinkLabel",{value:"last&nbsp;&gt;&gt;",validator:A.isString});C.setAttributeConfig("lastPageLinkClass",{value:"yui-pg-last",validator:A.isString});};B.ui.LastPageLink.prototype={current:null,link:null,span:null,na:null,render:function(D){var F=this.paginator,G=F.get("lastPageLinkClass"),C=F.get("lastPageLinkLabel"),E=F.getTotalPages();this.link=document.createElement("a");this.span=document.createElement("span");this.na=this.span.cloneNode(false);this.link.id=D+"-last-link";this.link.href="#";this.link.className=G;this.link.innerHTML=C;YAHOO.util.Event.on(this.link,"click",this.onClick,this,true);this.span.id=D+"-last-span";this.span.className=G;this.span.innerHTML=C;this.na.id=D+"-last-na";switch(E){case B.VALUE_UNLIMITED:this.current=this.na;break;case F.getCurrentPage():this.current=this.span;break;default:this.current=this.link;}return this.current;},update:function(D){if(D&&D.prevValue===D.newValue){return ;}var C=this.current?this.current.parentNode:null,E=this.link;if(C){switch(this.paginator.getTotalPages()){case B.VALUE_UNLIMITED:E=this.na;break;case this.paginator.getCurrentPage():E=this.span;break;}if(this.current!==E){C.replaceChild(E,this.current);this.current=E;}}},destroy:function(){YAHOO.util.Event.purgeElement(this.link);this.current.parentNode.removeChild(this.current);this.link=this.span=null;},onClick:function(C){YAHOO.util.Event.stopEvent(C);this.paginator.setPage(this.paginator.getTotalPages());}};})();(function(){var B=YAHOO.widget.Paginator,A=YAHOO.lang;B.ui.NextPageLink=function(C){this.paginator=C;
C.createEvent("nextPageLinkLabelChange");C.createEvent("nextPageLinkClassChange");C.subscribe("recordOffsetChange",this.update,this,true);C.subscribe("rowsPerPageChange",this.update,this,true);C.subscribe("totalRecordsChange",this.update,this,true);C.subscribe("destroy",this.destroy,this,true);C.subscribe("nextPageLinkLabelChange",this.update,this,true);C.subscribe("nextPageLinkClassChange",this.update,this,true);};B.ui.NextPageLink.init=function(C){C.setAttributeConfig("nextPageLinkLabel",{value:"next&nbsp;&gt;",validator:A.isString});C.setAttributeConfig("nextPageLinkClass",{value:"yui-pg-next",validator:A.isString});};B.ui.NextPageLink.prototype={current:null,link:null,span:null,render:function(D){var F=this.paginator,G=F.get("nextPageLinkClass"),C=F.get("nextPageLinkLabel"),E=F.getTotalPages();this.link=document.createElement("a");this.span=document.createElement("span");this.link.id=D+"-next-link";this.link.href="#";this.link.className=G;this.link.innerHTML=C;YAHOO.util.Event.on(this.link,"click",this.onClick,this,true);this.span.id=D+"-next-span";this.span.className=G;this.span.innerHTML=C;this.current=F.getCurrentPage()===E?this.span:this.link;return this.current;},update:function(E){if(E&&E.prevValue===E.newValue){return ;}var D=this.paginator.getTotalPages(),C=this.current?this.current.parentNode:null;if(this.paginator.getCurrentPage()!==D){if(C&&this.current===this.span){C.replaceChild(this.link,this.current);this.current=this.link;}}else{if(this.current===this.link){if(C){C.replaceChild(this.span,this.current);this.current=this.span;}}}},destroy:function(){YAHOO.util.Event.purgeElement(this.link);this.current.parentNode.removeChild(this.current);this.link=this.span=null;},onClick:function(C){YAHOO.util.Event.stopEvent(C);this.paginator.setPage(this.paginator.getNextPage());}};})();(function(){var B=YAHOO.widget.Paginator,A=YAHOO.lang;B.ui.PreviousPageLink=function(C){this.paginator=C;C.createEvent("previousPageLinkLabelChange");C.createEvent("previousPageLinkClassChange");C.subscribe("recordOffsetChange",this.update,this,true);C.subscribe("rowsPerPageChange",this.update,this,true);C.subscribe("totalRecordsChange",this.update,this,true);C.subscribe("destroy",this.destroy,this,true);C.subscribe("previousPageLinkLabelChange",this.update,this,true);C.subscribe("previousPageLinkClassChange",this.update,this,true);};B.ui.PreviousPageLink.init=function(C){C.setAttributeConfig("previousPageLinkLabel",{value:"&lt;&nbsp;prev",validator:A.isString});C.setAttributeConfig("previousPageLinkClass",{value:"yui-pg-previous",validator:A.isString});};B.ui.PreviousPageLink.prototype={current:null,link:null,span:null,render:function(D){var E=this.paginator,F=E.get("previousPageLinkClass"),C=E.get("previousPageLinkLabel");this.link=document.createElement("a");this.span=document.createElement("span");this.link.id=D+"-prev-link";this.link.href="#";this.link.className=F;this.link.innerHTML=C;YAHOO.util.Event.on(this.link,"click",this.onClick,this,true);this.span.id=D+"-prev-span";this.span.className=F;this.span.innerHTML=C;this.current=E.get("recordOffset")<1?this.span:this.link;return this.current;},update:function(D){if(D&&D.prevValue===D.newValue){return ;}var C=this.current?this.current.parentNode:null;if(this.paginator.get("recordOffset")<1){if(C&&this.current===this.link){C.replaceChild(this.span,this.current);this.current=this.span;}}else{if(C&&this.current===this.span){C.replaceChild(this.link,this.current);this.current=this.link;}}},destroy:function(){YAHOO.util.Event.purgeElement(this.link);this.current.parentNode.removeChild(this.current);this.link=this.span=null;},onClick:function(C){YAHOO.util.Event.stopEvent(C);this.paginator.setPage(this.paginator.getPreviousPage());}};})();(function(){var B=YAHOO.widget.Paginator,A=YAHOO.lang;B.ui.RowsPerPageDropdown=function(C){this.paginator=C;C.createEvent("rowsPerPageOptionsChange");C.createEvent("rowsPerPageDropdownClassChange");C.subscribe("rowsPerPageChange",this.update,this,true);C.subscribe("rowsPerPageOptionsChange",this.rebuild,this,true);C.subscribe("destroy",this.destroy,this,true);C.subscribe("rowsPerPageDropdownClassChange",this.rebuild,this,true);};B.ui.RowsPerPageDropdown.init=function(C){C.setAttributeConfig("rowsPerPageOptions",{value:[],validator:A.isArray});C.setAttributeConfig("rowsPerPageDropdownClass",{value:"yui-pg-rpp-options",validator:A.isString});};B.ui.RowsPerPageDropdown.prototype={select:null,render:function(C){this.select=document.createElement("select");this.select.id=C+"-rpp";this.select.className=this.paginator.get("rowsPerPageDropdownClass");this.select.title="Rows per page";YAHOO.util.Event.on(this.select,"change",this.onChange,this,true);this.rebuild();return this.select;},update:function(G){if(G&&G.prevValue===G.newValue){return ;}var F=this.paginator.get("rowsPerPage"),D=this.select.options,E,C;for(E=0,C=D.length;E<C;++E){if(parseInt(D[E].value,10)===F){D[E].selected=true;}}},rebuild:function(J){var E=this.paginator,F=this.select,K=E.get("rowsPerPageOptions"),C=document.createElement("option"),H,I;while(F.firstChild){F.removeChild(F.firstChild);}for(H=0,I=K.length;H<I;++H){var G=C.cloneNode(false),D=K[H];G.value=A.isValue(D.value)?D.value:D;G.innerHTML=A.isValue(D.text)?D.text:D;F.appendChild(G);}this.update();},destroy:function(){YAHOO.util.Event.purgeElement(this.select);this.select.parentNode.removeChild(this.select);this.select=null;},onChange:function(C){this.paginator.setRowsPerPage(parseInt(this.select.options[this.select.selectedIndex].value,10));}};})();YAHOO.register("paginator",YAHOO.widget.Paginator,{version:"2.6.0",build:"1321"});
    if (!Y.YUI2) {
        Y.YUI2 = YAHOO;
    }
    if (!YAHOO._activ && YAHOO.util.Event) {
        YAHOO._activ = true;
        YAHOO.util.Event._load();
    }
}, '2.6.0' ,{"requires": ["yui2-yahoo", "yui2-dom", "yui2-event", "yui2-element", "yui2-skin-sam-paginator"]});