var React = require('react');
var ReactDOM = require('react-dom');
var Link = require('react-router').Link;
var Globals = require('../core/Globals');
var classNames = require('classnames');
var ContentProvider = require('../providers/ContentProvider');

var SplitText = require('../vendors/SplitText.min.js');


var AboutMeScreen = React.createClass({

		titleSplit : null,
		contentSplit : null,

		componentDidMount : function(){
			var title = $(ReactDOM.findDOMNode(this.refs.title));
			var spacer = $(ReactDOM.findDOMNode(this.refs.spacer));
			var content = $(ReactDOM.findDOMNode(this.refs.content));

			this.titleSplit = new SplitText(title, {type : "chars", position : "relative"});
			TweenMax.staggerFromTo(this.titleSplit.chars.reverse(), 1, {x : -10, opacity:0}, {x : 0, opacity : 1, ease : Expo.easeInOut}, 0.03);
			TweenMax.fromTo(spacer, 1, {x : -10, scaleX : 0}, {x : 0, scaleX : 1, ease : Expo.easeInOut, delay:0.3});

			TweenMax.fromTo(content, 1, {x : -10, opacity:0}, {x : 0, opacity : 1, ease : Expo.easeInOut, delay : 1});

			document.title = "valéria sordi photography // " + ContentProvider.getTranslatedText("aboutme_title");
		},

		componentWillUnmount : function(){


			var title = $(ReactDOM.findDOMNode(this.refs.title));
			var spacer = $(ReactDOM.findDOMNode(this.refs.spacer));
			var content = $(ReactDOM.findDOMNode(this.refs.content));

			TweenMax.killChildTweensOf(title);
			TweenMax.killTweensOf(spacer);
			TweenMax.killTweensOf(content);


			this.titleSplit.revert();
			this.titleSplit = null;


		},



		render : function(){
			var content = {
            __html: ContentProvider.getAboutContent()
        };

			return (
				<section id="about">
					<div className="column-content">
						<h2 ref="title">{ContentProvider.getTranslatedText("aboutme_title")}</h2>
						<div className="spacer" ref="spacer"></div>
						<div className="content" ref="content" dangerouslySetInnerHTML={content}></div>
					</div>
				</section>
			)
		}
});


module.exports = AboutMeScreen;
