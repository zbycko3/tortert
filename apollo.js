var APOLLO=APOLLO||(function(){var scriptName='apollo.js';var defaultID='apollo_adblock_placeholder';var analytics={};var _args={'id':defaultID,'sampling':100,'verbose':false,'timeout':100,'categoryBlocked':'adblock (apollo)','categoryUnblocked':'adblock (apollo)','actionBlocked':'blocked','actionUnblocked':'unblocked','labelBlocked':window.location.pathname,'labelUnblocked':window.location.pathname,};return{init:function(){var scripts=document.getElementsByTagName("script");var i,j,src,parts,basePath;var found=false;var domElement;for(i=0;i<scripts.length;i++){src=scripts[i].src;if(src.indexOf(scriptName)!=-1){found=true;parts=src.split('?');basePath=parts[0].replace(scriptName,'');if(parts[1]){var opt=parts[1].split('&');for(j=opt.length-1;j>=0;--j){var pair=opt[j].split('=');_args[pair[0]]=pair[1];}}
break;}}
if(!found){console.log('adblocking analytics script has been renamed, and arguments are not detectable.  please make sure you update "scriptName" in the source');}
if(_args.sampling<100){var random=Math.floor((Math.random()*100)+1);if(random>_args.sampling){_args.test=false;if(_args.verbose)
console.log('skipping adblock test / sampling['+_args.sampling+'%] rolled['+random+']');return false;}}
if(_args.id==defaultID){if(_args.verbose)
console.log('using placeholder id['+defaultID+']');domElement=document.createElement('div');domElement.setAttribute("class","advertisement ad advertising ad_holder")
domElement.setAttribute("id",defaultID)
domElement.setAttribute("style","width:300px;height:250px;background:#CCC;top:-500px;position:absolute;");document.body.appendChild(domElement);}else{if(_args.verbose)
console.log('not using placeholder id['+defaultID+']');}
return true;},hasGoogleAnalyticsSupport:function(){analytics.ga=true;if(typeof window.ga!='function'){analytics.ga=false;}
if(_args.verbose)
console.log('GA support via ga()['+analytics.ga+']');analytics.trackEvent=true;if(typeof window.trackEvent!='function'){analytics.trackEvent=false;}
if(_args.verbose)
console.log('GA support via trackEvent()['+analytics.trackEvent+']');analytics.gaq=true;if(typeof _gaq=='undefined'){analytics.gaq=false;}
if(_args.verbose)
console.log('GA support via _gaq['+analytics.gaq+']');if(!analytics.ga&&!analytics.trackEvent&&!analytics.gaq){if(_args.verbose)
console.log('GA tracking is not available');return false;}
return true;},adblocked:function(){if(_args.verbose)
console.log('starting adblock test');var tag=document.getElementById(_args.id);if((tag.length<1)||(tag.clientHeight<1)){if(_args.verbose)
console.log('adblock on');return true;}
if(_args.verbose)
console.log('adblock off');return false;},logToGoogleAnalytics:function(category,action,label){if(analytics.ga){ga('send','event',category,action,label);}else if(analytics.trackEvent){trackEvent(category,action,label);}else if(analytics.gaq){_gaq.push(['_trackEvent',category,action,label]);}},getCategoryBlocked:function(){return _args.categoryBlocked;},getActionBlocked:function(){return _args.actionBlocked;},getLabelBlocked:function(){return _args.labelBlocked;},getCategoryUnblocked:function(){return _args.categoryUnblocked;},getActionUnblocked:function(){return _args.actionUnblocked;},getLabelUnblocked:function(){return _args.labelUnblocked;},}}());document.addEventListener("DOMContentLoaded",function(event){if(APOLLO.init()){setTimeout(function(){if(APOLLO.hasGoogleAnalyticsSupport()){if(APOLLO.adblocked()){APOLLO.logToGoogleAnalytics(APOLLO.getCategoryBlocked(),APOLLO.getActionBlocked(),APOLLO.getLabelBlocked());}else{APOLLO.logToGoogleAnalytics(APOLLO.getCategoryUnblocked(),APOLLO.getActionUnblocked(),APOLLO.getLabelUnblocked());}}},APOLLO.timeout);}});