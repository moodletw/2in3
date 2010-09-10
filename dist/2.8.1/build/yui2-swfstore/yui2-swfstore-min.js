YUI.add('yui2-swfstore', function(Y) {
    if (Y.YUI2) {
        var YAHOO    = Y.YUI2;
    }
    /*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.8.1
*/
YAHOO.util.SWFStore=function(A,C,D){var B;var E;C=C.toString();D=D.toString();if(YAHOO.env.ua.ie){B="ie";}else{if(YAHOO.env.ua.gecko){B="gecko";}else{if(YAHOO.env.ua.webkit){B="webkit";}else{if(YAHOO.env.ua.caja){B="caja";}else{if(YAHOO.env.ua.opera){B="opera";}else{B="other";}}}}}if(YAHOO.util.Cookie.get("swfstore")==null||YAHOO.util.Cookie.get("swfstore")=="null"||YAHOO.util.Cookie.get("swfstore")==""){E=Math.round(Math.random()*Math.PI*100000);YAHOO.util.Cookie.set("swfstore",E);}else{E=YAHOO.util.Cookie.get("swfstore");}var F={version:9.115,useExpressInstall:false,fixedAttributes:{allowScriptAccess:"always",allowNetworking:"all",scale:"noScale"},flashVars:{shareData:C,browser:E,useCompression:D}};this.embeddedSWF=new YAHOO.widget.SWF(A,YAHOO.util.SWFStore.SWFURL,F);this.createEvent("error");this.createEvent("quotaExceededError");this.createEvent("securityError");this.createEvent("save");this.createEvent("clear");this.createEvent("pending");this.createEvent("openingDialog");this.createEvent("inadequateDimensions");};YAHOO.extend(YAHOO.util.SWFStore,YAHOO.util.AttributeProvider,{on:function(A,B){this.embeddedSWF.addListener(A,B);},addListener:function(A,B){this.embeddedSWF.addListener(A,B);},toString:function(){return"SWFStore "+this._id;},getShareData:function(){return this.embeddedSWF.callSWF("getShareData");},setShareData:function(A){this.embeddedSWF.callSWF("setShareData",[A]);},hasAdequateDimensions:function(){return this.embeddedSWF.callSWF("hasAdequateDimensions");},getUseCompression:function(){return this.embeddedSWF.callSWF("getUseCompression");},setUseCompression:function(A){this.embeddedSWF.callSWF("setUseCompression",[A]);},setItem:function(A,B){return this.embeddedSWF.callSWF("setItem",[A,B]);},getValueAt:function(A){return this.embeddedSWF.callSWF("getValueAt",[A]);},getNameAt:function(A){return this.embeddedSWF.callSWF("getNameAt",[A]);},getValueOf:function(A){return this.embeddedSWF.callSWF("getValueOf",[A]);},getTypeOf:function(A){return this.embeddedSWF.callSWF("getTypeOf",[A]);},getTypeAt:function(A){return this.embeddedSWF.callSWF("getTypeAt",[A]);},getItems:function(){return this.embeddedSWF.callSWF("getItems",[]);},removeItem:function(A){return this.embeddedSWF.callSWF("removeItem",[A]);},removeItemAt:function(A){return this.embeddedSWF.callSWF("removeItemAt",[A]);},getLength:function(){return this.embeddedSWF.callSWF("getLength",[]);},clear:function(){return this.embeddedSWF.callSWF("clear",[]);},calculateCurrentSize:function(){return this.embeddedSWF.callSWF("calculateCurrentSize",[]);},getModificationDate:function(){return this.embeddedSWF.callSWF("getModificationDate",[]);},setSize:function(B){var A=this.embeddedSWF.callSWF("setSize",[B]);return A;},displaySettings:function(){this.embeddedSWF.callSWF("displaySettings",[]);}});YAHOO.util.SWFStore.SWFURL="swfstore.swf";YAHOO.register("swfstore",YAHOO.util.SWFStore,{version:"2.8.1",build:"19"});YAHOO.register("swfstore",YAHOO.util.SWFStore,{version:"2.8.1",build:"19"});
    if (!Y.YUI2) {
        Y.YUI2 = YAHOO;
    }
    if (!YAHOO._activ && YAHOO.util.Event) {
        YAHOO._activ = true;
        YAHOO.util.Event._load();
    }
}, '2.8.1' ,{"requires": ["yui2-yahoo", "yui2-dom", "yui2-event", "yui2-element", "yui2-swf", "yui2-cookie"]});