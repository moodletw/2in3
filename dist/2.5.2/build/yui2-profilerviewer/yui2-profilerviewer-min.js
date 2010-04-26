YUI.add('yui2-profilerviewer', function(Y) {
    if (Y.YUI2) {
        var YAHOO = Y.YUI2;
    }
    /*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.5.2
*/
(function(){YAHOO.widget.ProfilerViewer=function(H,G){G=G||{};if(arguments.length==1&&!YAHOO.lang.isString(H)&&!H.nodeName){G=H;H=G.element||null;}if(!H&&!G.element){H=this._createProfilerViewerElement();}YAHOO.widget.ProfilerViewer.superclass.constructor.call(this,H,G);this._init();};YAHOO.extend(YAHOO.widget.ProfilerViewer,YAHOO.util.Element);YAHOO.lang.augmentObject(YAHOO.widget.ProfilerViewer,{CLASS:"yui-pv",CLASS_DASHBOARD:"yui-pv-dashboard",CLASS_REFRESH:"yui-pv-refresh",CLASS_BUSY:"yui-pv-busy",CLASS_CHART_CONTAINER:"yui-pv-chartcontainer",CLASS_CHART:"yui-pv-chart",CLASS_CHART_LEGEND:"yui-pv-chartlegend",CLASS_TABLE:"yui-pv-table",STRINGS:{title:"YUI Profiler (beta)",buttons:{viewprofiler:"View Profiler Data",hideprofiler:"Hide Profiler Report",showchart:"Show Chart",hidechart:"Hide Chart",refreshdata:"Refresh Data"},colHeads:{fn:["Function/Method",null],calls:["Calls",40],avg:["Average",80],min:["Shortest",70],max:["Longest",70],total:["Total Time",70],pct:["Percent",70]},millisecondsAbbrev:"ms",initMessage:"initialiazing chart...",installFlashMessage:"Unable to load Flash content. The YUI Charts Control requires Flash Player 9.0.45 or higher. You can download the latest version of Flash Player from the <a href='http://www.adobe.com/go/getflashplayer'>Adobe Flash Player Download Center</a>."},timeAxisLabelFunction:function(H){var G=(H===Math.floor(H))?H:(Math.round(H*1000))/1000;return(G+" "+YAHOO.widget.ProfilerViewer.STRINGS.millisecondsAbbrev);},percentAxisLabelFunction:function(H){var G=(H===Math.floor(H))?H:(Math.round(H*100))/100;return(G+"%");}},true);var C=YAHOO.util.Dom;var A=YAHOO.util.Event;var B=YAHOO.tool.Profiler;var E=YAHOO.widget.ProfilerViewer;var D=E.prototype;D.refreshData=function(){this.fireEvent("dataRefreshEvent");};D.getHeadEl=function(){return(this._headEl)?C.get(this._headEl):false;};D.getBodyEl=function(){return(this._bodyEl)?C.get(this._bodyEl):false;};D.getChartEl=function(){return(this._chartEl)?C.get(this._chartEl):false;};D.getTableEl=function(){return(this._tableEl)?C.get(this._tableEl):false;};D.getDataTable=function(){return this._dataTable;};D.getChart=function(){return this._chart;};D._rendered=false;D._headEl=null;D._bodyEl=null;D._toggleVisibleEl=null;D._busyEl=null;D._busy=false;D._tableEl=null;D._dataTable=null;D._chartEl=null;D._chartLegendEl=null;D._chartElHeight=250;D._chart=null;D._chartInitialized=false;D._init=function(){this.createEvent("dataRefreshEvent");this.createEvent("renderEvent");this.on("dataRefreshEvent",this._refreshDataTable,this,true);this._initLauncherDOM();if(this.get("showChart")){this.on("sortedByChange",this._refreshChart);}};D._createProfilerViewerElement=function(){var G=document.createElement("div");document.body.insertBefore(G,document.body.firstChild);C.addClass(G,this.SKIN_CLASS);C.addClass(G,E.CLASS);return G;};D.toString=function(){return"ProfilerViewer "+(this.get("id")||this.get("tagName"));};D._toggleVisible=function(){var G=(this.get("visible"))?false:true;this.set("visible",G);};D._show=function(){if(!this._busy){this._setBusyState(true);if(!this._rendered){var G=new YAHOO.util.YUILoader();if(this.get("base")){G.base=this.get("base");}var H=["datatable"];if(this.get("showChart")){H.push("charts");}G.insert({require:H,onSuccess:function(){this._render();},scope:this});}else{var I=this.get("element");C.removeClass(I,"yui-pv-minimized");this._toggleVisibleEl.innerHTML=E.STRINGS.buttons.hideprofiler;C.addClass(I,"yui-pv-null");C.removeClass(I,"yui-pv-null");this.refreshData();}}};D._hide=function(){this._toggleVisibleEl.innerHTML=E.STRINGS.buttons.viewprofiler;C.addClass(this.get("element"),"yui-pv-minimized");};D._render=function(){C.removeClass(this.get("element"),"yui-pv-minimized");this._initViewerDOM();this._initDataTable();if(this.get("showChart")){this._initChartDOM();this._initChart();}this._rendered=true;this._toggleVisibleEl.innerHTML=E.STRINGS.buttons.hideprofiler;this.fireEvent("renderEvent");};D._initLauncherDOM=function(){var I=this.get("element");C.addClass(I,E.CLASS);C.addClass(I,"yui-pv-minimized");this._headEl=document.createElement("div");C.addClass(this._headEl,"hd");var H=E.STRINGS.buttons;var G=(this.get("visible"))?H.hideprofiler:H.viewprofiler;this._toggleVisibleEl=this._createButton(G,this._headEl);this._refreshEl=this._createButton(H.refreshdata,this._headEl);C.addClass(this._refreshEl,E.CLASS_REFRESH);this._busyEl=document.createElement("span");this._headEl.appendChild(this._busyEl);var J=document.createElement("h4");J.innerHTML=E.STRINGS.title;this._headEl.appendChild(J);I.appendChild(this._headEl);A.on(this._toggleVisibleEl,"click",this._toggleVisible,this,true);A.on(this._refreshEl,"click",function(){if(!this._busy){this._setBusyState(true);this.fireEvent("dataRefreshEvent");}},this,true);};D._initViewerDOM=function(){var G=this.get("element");this._bodyEl=document.createElement("div");C.addClass(this._bodyEl,"bd");this._tableEl=document.createElement("div");C.addClass(this._tableEl,E.CLASS_TABLE);this._bodyEl.appendChild(this._tableEl);G.appendChild(this._bodyEl);};D._initChartDOM=function(){this._chartContainer=document.createElement("div");C.addClass(this._chartContainer,E.CLASS_CHART_CONTAINER);var H=document.createElement("div");C.addClass(H,E.CLASS_CHART_LEGEND);var G=document.createElement("div");this._chartLegendEl=document.createElement("dl");this._chartLegendEl.innerHTML="<dd>"+E.STRINGS.initMessage+"</dd>";this._chartEl=document.createElement("div");C.addClass(this._chartEl,E.CLASS_CHART);var I=document.createElement("p");I.innerHTML=E.STRINGS.installFlashMessage;this._chartEl.appendChild(I);this._chartContainer.appendChild(H);H.appendChild(G);G.appendChild(this._chartLegendEl);this._chartContainer.appendChild(this._chartEl);this._bodyEl.insertBefore(this._chartContainer,this._tableEl);};D._createButton=function(I,J,H){var G=document.createElement("a");G.innerHTML=G.title=I;if(J){if(!H){J.appendChild(G);}else{J.insertBefore(G,J.firstChild);}}return G;};D._setBusyState=function(G){if(G){C.addClass(this._busyEl,E.CLASS_BUSY);
this._busy=true;}else{C.removeClass(this._busyEl,E.CLASS_BUSY);this._busy=false;}};D._genSortFunction=function(H,G){var J=H;var I=G;return function(L,K){if(I==YAHOO.widget.DataTable.CLASS_ASC){return L[J]-K[J];}else{return((L[J]-K[J])*-1);}};};var F=function(G){var I=0;for(var H=0;H<G.length;I+=G[H++]){}return I;};D._getProfilerData=function(){var L=B.getFullReport();var N=[];var H=0;for(name in L){if(YAHOO.lang.hasOwnProperty(L,name)){var G=L[name];var I={};I.fn=name;I.points=G.points.slice();I.calls=G.calls;I.min=G.min;I.max=G.max;I.avg=G.avg;I.total=F(I.points);I.points=G.points;var P=this.get("filter");if((!P)||(P(I))){N.push(I);H+=I.total;}}}for(var M=0,K=N.length;M<K;M++){N[M].pct=(H)?(N[M].total*100)/H:0;}var O=this.get("sortedBy");var Q=O.key;var J=O.dir;N.sort(this._genSortFunction(Q,J));return N;};D._initDataTable=function(){var P=this;this._dataSource=new YAHOO.util.DataSource(function(){return P._getProfilerData.call(P);},{responseType:YAHOO.util.DataSource.TYPE_JSARRAY,maxCacheEntries:0});var H=this._dataSource;H.responseSchema={fields:["fn","avg","calls","max","min","total","pct","points"]};var O=function(S,R,T,U){var Q=(U===Math.floor(U))?U:(Math.round(U*1000))/1000;S.innerHTML=Q+" "+E.STRINGS.millisecondsAbbrev;};var N=function(S,R,T,U){var Q=(U===Math.floor(U))?U:(Math.round(U*100))/100;S.innerHTML=Q+"%";};var M=YAHOO.widget.DataTable.CLASS_ASC;var J=YAHOO.widget.DataTable.CLASS_DESC;var K=E.STRINGS.colHeads;var I=O;var L=[{key:"fn",sortable:true,label:K.fn[0],sortOptions:{defaultDir:M},resizeable:(YAHOO.util.DragDrop)?true:false,minWidth:K.fn[1]},{key:"calls",sortable:true,label:K.calls[0],sortOptions:{defaultDir:J},width:K.calls[1]},{key:"avg",sortable:true,label:K.avg[0],sortOptions:{defaultDir:J},formatter:I,width:K.avg[1]},{key:"min",sortable:true,label:K.min[0],sortOptions:{defaultDir:M},formatter:I,width:K.min[1]},{key:"max",sortable:true,label:K.max[0],sortOptions:{defaultDir:J},formatter:I,width:K.max[1]},{key:"total",sortable:true,label:K.total[0],sortOptions:{defaultDir:J},formatter:I,width:K.total[1]},{key:"pct",sortable:true,label:K.pct[0],sortOptions:{defaultDir:J},formatter:N,width:K.pct[1]}];this._dataTable=new YAHOO.widget.DataTable(this._tableEl,L,H,{scrollable:true,height:this.get("tableHeight"),initialRequest:null,sortedBy:{key:"total",dir:YAHOO.widget.DataTable.CLASS_DESC}});var G=this._dataTable;G.subscribe("sortedByChange",this._sortedByChange,this,true);G.subscribe("renderEvent",this._dataTableRenderHandler,this,true);G.subscribe("initEvent",this._dataTableRenderHandler,this,true);A.on(this._tableEl.getElementsByTagName("th"),"click",this._thClickHandler,this,true);};D._sortedByChange=function(G){if(G.newValue&&G.newValue.key){this.set("sortedBy",{key:G.newValue.key,dir:G.newValue.dir});}};D._dataTableRenderHandler=function(G){this._setBusyState(false);};D._thClickHandler=function(G){this._setBusyState(true);};D._refreshDataTable=function(G){var H=this._dataTable;H.getDataSource().sendRequest("",H.onDataReturnInitializeTable,H);};D._refreshChart=function(){switch(this.get("sortedBy").key){case"fn":this._chart.set("dataSource",this._chart.get("dataSource"));return ;case"calls":this._chart.set("xAxis",this._chartAxisDefinitionPlain);break;case"pct":this._chart.set("xAxis",this._chartAxisDefinitionPercent);break;default:this._chart.set("xAxis",this._chartAxisDefinitionTime);break;}this._drawChartLegend();this._chart.set("series",this._getSeriesDef(this.get("sortedBy").key));};D._getChartData=function(){var H=this._dataTable.getRecordSet().getRecords(0,this.get("maxChartFunctions"));var G=[];for(var I=H.length-1;I>-1;I--){G.push(H[I].getData());}return G;};D._getSeriesDef=function(K){var J=this.get("chartSeriesDefinitions")[K];var G=[];for(var I=0,H=J.group.length;I<H;I++){var L=this.get("chartSeriesDefinitions")[J.group[I]];G.push({displayName:L.displayName,xField:L.xField,style:{color:L.style.color,size:L.style.size}});}return G;};D._initChart=function(){this._sizeChartCanvas();YAHOO.widget.Chart.SWFURL=this.get("swfUrl");var G=this;var H=new YAHOO.util.DataSource(function(){return G._getChartData.call(G);},{responseType:YAHOO.util.DataSource.TYPE_JSARRAY,maxCacheEntries:0});H.responseSchema={fields:["fn","avg","calls","max","min","total","pct"]};H.subscribe("responseEvent",this._sizeChartCanvas,this,true);this._chartAxisDefinitionTime=new YAHOO.widget.NumericAxis();this._chartAxisDefinitionTime.labelFunction="YAHOO.widget.ProfilerViewer.timeAxisLabelFunction";this._chartAxisDefinitionPercent=new YAHOO.widget.NumericAxis();this._chartAxisDefinitionPercent.labelFunction="YAHOO.widget.ProfilerViewer.percentAxisLabelFunction";this._chartAxisDefinitionPlain=new YAHOO.widget.NumericAxis();this._chart=new YAHOO.widget.BarChart(this._chartEl,H,{yField:"fn",series:this._getSeriesDef(this.get("sortedBy").key),style:this.get("chartStyle"),xAxis:this._chartAxisDefinitionTime});this._drawChartLegend();this._chartInitialized=true;this._dataTable.unsubscribe("initEvent",this._initChart,this);this._dataTable.subscribe("initEvent",this._refreshChart,this,true);};D._drawChartLegend=function(){var M=this.get("chartSeriesDefinitions");var I=M[this.get("sortedBy").key];var H=this._chartLegendEl;H.innerHTML="";for(var K=0,J=I.group.length;K<J;K++){var N=M[I.group[K]];var L=document.createElement("dt");C.setStyle(L,"backgroundColor","#"+N.style.color);var G=document.createElement("dd");G.innerHTML=N.displayName;H.appendChild(L);H.appendChild(G);}};D._sizeChartCanvas=function(I){var G=(I)?I.response.length:this.get("maxChartFunctions");var H=(G*36)+34;if(H!=parseInt(this._chartElHeight,10)){this._chartElHeight=H;C.setStyle(this._chartEl,"height",H+"px");}};D.initAttributes=function(G){YAHOO.widget.ProfilerViewer.superclass.initAttributes.call(this,G);this.setAttributeConfig("base",{value:G.base});this.setAttributeConfig("tableHeight",{value:G.tableHeight||"15em",method:function(H){if(this._dataTable){this._dataTable.set("height",H);}}});this.setAttributeConfig("sortedBy",{value:G.sortedBy||{key:"total",dir:"yui-dt-desc"}});
this.setAttributeConfig("filter",{value:G.filter||null,validator:YAHOO.lang.isFunction});this.setAttributeConfig("swfUrl",{value:G.swfUrl||"http://yui.yahooapis.com/2.5.0/build/charts/assets/charts.swf"});this.setAttributeConfig("maxChartFunctions",{value:G.maxChartFunctions||6,method:function(H){if(this._rendered){this._sizeChartCanvas();}},validator:YAHOO.lang.isNumber});this.setAttributeConfig("chartStyle",{value:G.chartStyle||{font:{name:"Arial",color:15658588,size:12},background:{color:"6e6e63"}},method:function(){if(this._rendered&&this.get("showChart")){this._refreshChart();}}});this.setAttributeConfig("chartSeriesDefinitions",{value:G.chartSeriesDefinitions||{total:{displayName:E.STRINGS.colHeads.total[0],xField:"total",style:{color:"4d95dd",size:20},group:["total"]},calls:{displayName:E.STRINGS.colHeads.calls[0],xField:"calls",style:{color:"edff9f",size:20},group:["calls"]},avg:{displayName:E.STRINGS.colHeads.avg[0],xField:"avg",style:{color:"209daf",size:9},group:["avg","min","max"]},min:{displayName:E.STRINGS.colHeads.min[0],xField:"min",style:{color:"b6ecf4",size:9},group:["avg","min","max"]},max:{displayName:E.STRINGS.colHeads.max[0],xField:"max",style:{color:"29c7de",size:9},group:["avg","min","max"]},pct:{displayName:E.STRINGS.colHeads.pct[0],xField:"pct",style:{color:"C96EDB",size:20},group:["pct"]}},method:function(){if(this._rendered&&this.get("showChart")){this._refreshChart();}}});this.setAttributeConfig("visible",{value:G.visible||false,validator:YAHOO.lang.isBoolean,method:function(H){if(H){this._show();}else{if(this._rendered){this._hide();}}}});this.setAttributeConfig("showChart",{value:G.showChart||true,validator:YAHOO.lang.isBoolean,writeOnce:true});YAHOO.widget.ProfilerViewer.superclass.initAttributes.call(this,G);};})();YAHOO.register("profilerviewer",YAHOO.widget.ProfilerViewer,{version:"2.5.2",build:"1076"});
    if (!Y.YUI2) {
        Y.YUI2 = YAHOO;
    }
    if (!YAHOO._activ && YAHOO.util.Event) {
        YAHOO._activ = true;
        YAHOO.util.Event._load();
    }
}, '2.5.2' ,{"requires": ["yui2-skin-sam-profilerviewer", "yui2-yuiloader", "yui2-dom", "yui2-event", "yui2-element", "yui2-profiler"]});
