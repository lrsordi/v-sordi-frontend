var React = require('react');
var ReactDOM = require('react-dom');
var Link = require('react-router').Link;
var Globals = require('../core/Globals');
var classNames = require('classnames');
var DocumentMeta = require('react-document-meta');
var ContentProvider = require('../providers/ContentProvider');


var HomeScreen = React.createClass({

		componentDidMount : function(){
		//	document.title = "valéria sordi photography //";
			window.prerenderReady = true;
		},

		render : function(){
			return (
				<div>
					<DocumentMeta title="valéria sordi photography //"/>
				</div>
			)
		}
});


module.exports = HomeScreen;
