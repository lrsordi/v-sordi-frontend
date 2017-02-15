window.$ = window.jQuery = require('jquery');
var MainApplication = require('./MainApplication');
var ReactDOM = require('react-dom');
var React = require('react');
var Globals = require('./core/Globals');
require('gsap');
var MobileDetect = require('mobile-detect');

var ContentProvider = require('./providers/ContentProvider');

TweenMax.ticker.fps(60);



var Index = function(){
	var queue;

	var preloaderContainer;
	var preloaderLogo;
	var preloaderBar;
	var percentage;



	window.Globals = Globals;
	  window.mobileDetect = new MobileDetect(window.navigator.userAgent);
	  window.mobileDetect.touch = function(){
	    var isTouchDevice = 'ontouchstart' in document.documentElement;
	    return (isTouchDevice || window.mobileDetect.mobile() || window.mobileDetect.tablet());
		};
	if(window.mobileDetect.mobile() && !window.mobileDetect.tablet()){

	}

	initPreloader();








	function initPreloader(){
		preloaderContainer = $("#preloader");
		preloaderLogo = preloaderContainer.find("svg#logo-preloader");
		preloaderBar = preloaderContainer.find("div.bar");
		percentage = preloaderBar.find("div.percentage");
		TweenMax.set(percentage, {scaleX : 0});

		TweenMax.fromTo(preloaderLogo, 2, {y : 30, opacity : 0}, {opacity : 1, y : 0, roundProps:"y", ease : Expo.easeInOut});
		TweenMax.fromTo(preloaderBar, 1, {scaleY : 0},{scaleY : 1, ease : Expo.easeInOut, onComplete:startLoading});
	}

	function startLoading(){
		queue = new createjs.LoadQueue(true,"",true);
		queue.loadFile({id : "texts", src : "public/data/texts.json", type : createjs.AbstractLoader.JSON});
		queue.loadFile({id : "about", src : api_url + "api/about", type : createjs.AbstractLoader.JSON});
		queue.loadFile({id : "generalcontacts", src : api_url + "api/generalcontacts", type : createjs.AbstractLoader.JSON});
		queue.loadFile({id : "categories", src : api_url + "api/categories", type : createjs.AbstractLoader.JSON});
		queue.loadFile({id : "albums", src : api_url + "api/albums", type : createjs.AbstractLoader.JSON});

		queue.on('progress', onDataProgress);
		queue.on('fileload', onDataFileComplete);
		queue.on('complete', onDataQueueComplete);
		queue.load();

	}


	function onDataFileComplete(evt){
		if(evt.item.id === "texts"){
			ContentProvider.texts = evt.result;
		}else if(evt.item.id == "about"){
			ContentProvider.about = evt.result;
		}else if(evt.item.id == "generalcontacts"){
			ContentProvider.generalContacts = evt.result;
		}else if(evt.item.id == "categories"){
			ContentProvider.categories = evt.result;
		}else if(evt.item.id == "albums"){
			ContentProvider.albums = evt.result;
		}

	}

	function onDataProgress(evt){
		TweenMax.to(percentage, 1,{scaleX : evt.progress * 0.3, ease : Expo.easeOut});
	}

	function onDataQueueComplete(evt){
		queue.close();
		queue.destroy();
		queue.removeAllEventListeners();

		ContentProvider.generateHomeCovers();

		queue = new createjs.LoadQueue(true,"",true);

		for(var i = 0; i < ContentProvider.homeCovers.length; i++){
			queue.loadFile({id : "homecover", data : {index : i}, src : ContentProvider.homeCovers[i].file, type : createjs.AbstractLoader.JSON});
		}

		queue.on('progress', onCoverProgress);
		queue.on('fileload', onCoverFileComplete);
		// queue.on('complete', onCoverQueueComplete);
		queue.load();
	}

	function onCoverProgress(evt){
		TweenMax.to(percentage, 1,{scaleX : 0.3 + (evt.progress * 0.7), ease : Expo.easeOut});
	}

	function onCoverFileComplete(evt){
		console.log(evt);
		// TweenMax.to(percentage, 1,{scaleX : 0.3 + (evt.progress * 0.7), ease : Expo.easeOut});
	}
	//ReactDOM.render((<MainApplication/>), $("#app")[0]);
}





$(window).on('load', function(evt){
	new Index();
});



//
