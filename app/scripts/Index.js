window.$ = window.jQuery = require('jquery');
var MainApplication = require('./MainApplication');
var ReactDOM = require('react-dom');
var React = require('react');
var Globals = require('./core/Globals');
require('gsap');
var MobileDetect = require('mobile-detect');


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
		queue.load();

	}
	//ReactDOM.render((<MainApplication/>), $("#app")[0]);
}


$(window).on('load', function(evt){
	new Index();
});



//
