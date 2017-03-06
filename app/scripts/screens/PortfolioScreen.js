var React = require('react');
var ReactDOM = require('react-dom');
var Link = require('react-router').Link;
var Globals = require('../core/Globals');
var classNames = require('classnames');
var ContentProvider = require('../providers/ContentProvider');
var PhotoItemComponent = require('./components/PhotoItemComponent');
require("gsap/ScrollToPlugin");


var PortfolioScreen = React.createClass({
		totalScrollAreas : 0,
		containerMax : null,
		albums : null,
		queue : null,

		isIgnoring : false,

		positeElements : function(){
			var posy = 0;

			if(window.mobileDetect.mobile()) return;

			for(var i = 0; i < this.albums.length; i++){
				TweenMax.set(ReactDOM.findDOMNode(this.refs["album"+i.toString()]), {y : posy});
				this.albums[i].posy = posy;
				posy += $(window).height() * (this.albums[i].photos.length + 1);
			}
		},


		componentWillUnmount : function(){
			$(window).off('scroll', this.onScroll);
			$("section#portfolio").off('scroll', this.onScroll);
			$(window).off('scroll', this.onResize);
			$("#fake-scroller").height("100vh");
			this.queue.removeAllEventListeners();
			this.queue.close();
			this.queue.destroy();
			this.queue = null;
			TweenMax.killChildTweensOf(this.containerMax);
		},

		componentDidMount : function(){
			$("#app").addClass("white");
			this.totalScrollAreas = 0;
			this.containerMax = $(ReactDOM.findDOMNode(this.refs.containermax));
			var self = this;

			this.queue = new createjs.LoadQueue(true,null,true);


			ContentProvider.albums.map(function(item,index){
				self.totalScrollAreas += item.photos.length + 1;
				self.albums[index].totalAreas = item.photos.length + 1;


				for(var k = 0; k < self.albums[index].photos.length; k++){
					self.queue.loadFile(
						{	data : {ref : "photo"+index+"_"+k},
							src : window.api_url + self.albums[index].photos[k].path.replace("public/","") + self.albums[index].photos[k].filename,
							type : createjs.AbstractLoader.IMAGE
						}
					);
				}

				var el = $(ReactDOM.findDOMNode(self.refs["album"+index.toString()]));
				TweenMax.fromTo(el.find("div.area-details"), 1, {opacity : 0, y : 300}, {opacity : 1, y : 0, ease : Quint.easeOut, delay:1});
				TweenMax.fromTo(el.find("div.area-details h2"), 1, {opacity : 0, y : 300}, {opacity : 1, y : 0, ease : Quint.easeOut, delay:1.1});
				TweenMax.fromTo(el.find("div.area-details div.scroll-down"), 1, {opacity : 0, y : -50}, {opacity : 1, y : 0, ease : Quint.easeOut, delay:1});
				TweenMax.to(el.find("div.area-details div.scroll-down svg"), 0.5, {y : -2, yoyo : true, ease : Quad.easeOut, repeat : -1});
				TweenMax.fromTo(el.find("div.area-details div.content"), 1, {opacity : 0, y : 300}, {opacity : 1, y : 0, ease : Quint.easeOut, delay:1.2});
			});
			TweenMax.set(this.containerMax, {opacity : 0});
			TweenMax.fromTo(this.containerMax, 0.5, {opacity :0}, {opacity : 1, ease : Linear.easeNone, delay : 0.5});



			this.positeElements();

			this.queue.on('fileprogress', this.onFileProgress);
			this.queue.on('fileload', this.onFileComplete);
			this.queue.load();

			if(!window.mobileDetect.mobile()){
				var h = (this.totalScrollAreas * 100).toString() + "vh";
				$("#fake-scroller").height(h);
				this.containerMax.height(h);
				$(window).on('resize', this.onResize);
				$(window).on('scroll', this.onScroll);
			}else{
				$("section#portfolio").on('scroll', this.onScroll);
			}

			var slug = this.props.params.slug;
			this.updateScrollBySlug(slug);
		},

		onResize : function(){
			this.positeElements();
			this.onScroll();
		},

		componentWillReceiveProps : function(nextProps){
			var slug = nextProps.params.slug;
			this.updateScrollBySlug(slug);
		},


		updateScrollBySlug : function(slug){
			this.isIgnoring = true;

			for(var i = 0; i < this.albums.length; i++){
				if(this.albums[i].category.slug === slug){
					TweenMax.to(window, 1, {scrollTo:{y : this.albums[i].posy, autoKill : true, onAutoKill : this.endScroll}, onComplete:this.endScroll,ease : Quad.easeInOut});
				}
			}
		},


		endScroll : function(){
			this.isIgnoring = false;
		},


		onFileProgress : function(evt){
			this.refs[evt.item.data.ref].setPercentage(evt.progress);
		},

		onFileComplete : function(evt){
			this.refs[evt.item.data.ref].setComplete(evt.item.src);
		},

		onScroll : function(){
			//if(window.mobileDetect.mobile()) return;
			var mob = window.mobileDetect.mobile();

			var stop = (!mob) ? $(window).scrollTop() : $("section#portfolio").scrollTop();

			if(!mob)
				TweenMax.to(this.containerMax, 1, {y : -stop, onUpdate:this.onFixedUpdate, roundProps:"y", force3D : true, ease : Quint.easeOut});

			var album;
			var coef = 0;
			var orgCoef = 0;
			var albumContainer;
			var wh = $(window).height();
			var dH;
			var coefSlug = 0;

			var hasCover = false;

			for(var i = 0; i < this.albums.length; i++){
				album = this.albums[i];
				albumContainer = $(ReactDOM.findDOMNode(this.refs["album"+i.toString()]));
				dH = albumContainer.find("div.area-details").height();


				coef = -(album.posy - stop)/(wh);
				coefSlug = -(album.posy - stop)/(wh * album.photos.length+1);

				if(mob){
					coef = albumContainer.offset().top/wh;
				}
				// if(i == 0)
				// console.log(coefSlug);

				if(coefSlug >= 0 && coefSlug <= 1 && !this.isIgnoring){
					if(album.category.slug !== this.props.params.slug){
						this.props.router.push('/portfolio/'+album.category.slug);
					}
				}

				if(mob){
					if(coef < 0 && coef > -1){
						hasCover = true;
					}
				}

				coef = Math.max(0,coef);
				coef = Math.min(1,coef);

				if(!mob){
					if(coef > 0 && coef < 1){
						hasCover = true;
					}
				}

				var coefScl = coef * 2;
				coecoefSclf = Math.max(0,coefScl);
				coefScl = Math.min(1,coefScl);

				if(!mob){
					TweenMax.to(albumContainer.find("div.area-cover div.white-layer"), 1, {opacity : coef, ease : Linear.easeNone});
					TweenMax.to(albumContainer.find("div.area-cover"), 1, {y : coef * wh*0.8, roundProps:"y", force3D : true, ease : Quint.easeOut});
					TweenMax.to(albumContainer.find("div.area-details div.scroll-down"), 1, {opacity : Math.max(0,1-(coefScl*1.5)), scale : 1-coefScl, y : coefScl * 20, ease : Quint.easeOut});
				}
				//TweenMax.to(albumContainer.find("div.area-details"), 1, {y : coef * -(dH - (wh * 0.04)), roundProps:"y", force3D : true, ease : Quint.easeOut});
			}

			console.log(hasCover + " " + stop);
			if(hasCover || stop == 0){
				$("#app").addClass("white");
			}else{
				$("#app").removeClass("white");
			}
		},

		render : function(){
			this.albums = [];
			var self = this;
			var areas = ContentProvider.categories.map(function(item,index){
				var album = ContentProvider.getAlbumByCategory(item.slug);
				if(album == null)
					return null;

				self.albums.push(album);
					var content = {
		            __html: ContentProvider.getCategoryTranslatedContent(item)
		        };

					var photos = album.photosLowQuality.map(function(item1,index1){
						return (
							<PhotoItemComponent ref={"photo" + index + "_" + index1} key={"photo-sub-item" + index1} fileurl={(window.api_url + item1.path.replace("public/","") + item1.filename)} />
						)
					});

				return (
					<section ref={"album" + index.toString()} className="portfolio-area" id={"portfolio"+index} key={"portfolio"+index}>
						<div className="area-cover" style={{backgroundImage : "url('"+(window.api_url + album.albumCover.path.replace("public/","") + album.albumCover.filename)+"')"}}>
							<div className="white-layer"></div>
						</div>
						<div className="area-details">
							<div className="scroll-down">{ContentProvider.getTranslatedText("scrolldown")}<svg version="1.1" id="Capa_1" x="0px" y="0px" width="454.52px" height="454.52px" viewBox="0 0 454.52 454.52" style={{enableBackground:"new 0 0 454.52 454.52"}}><g><path d="M378.135,227.256L206.224,55.354c-12.354-12.359-12.354-32.394,0-44.748c12.354-12.359,32.388-12.359,44.747,0L445.258,204.89c6.177,6.18,9.262,14.271,9.262,22.366c0,8.098-3.091,16.195-9.262,22.372L250.971,443.91c-12.359,12.365-32.394,12.365-44.747,0c-12.354-12.354-12.354-32.391,0-44.744L378.135,227.256z M9.265,399.166c-12.354,12.354-12.354,32.391,0,44.744c12.354,12.365,32.382,12.365,44.748,0l194.287-194.281c6.177-6.177,9.257-14.274,9.257-22.372c0-8.095-3.086-16.192-9.257-22.366L54.013,10.606c-12.365-12.359-32.394-12.359-44.748,0c-12.354,12.354-12.354,32.388,0,44.748L181.18,227.256L9.265,399.166z"/></g></svg></div>
							<h2>{ContentProvider.getCategoryTranslatedName(item)}</h2>
							<div className="content" dangerouslySetInnerHTML={content}>
							</div>
						</div>
						<div className="area-photos">
							{photos}
						</div>
					</section>
				)
			});

			return (
				<section id="portfolio" ref="containermax" >
					{areas}
				</section>
			)
		}
});


module.exports = PortfolioScreen;
