var React = require('react');
var ReactDOM = require('react-dom');
var Link = require('react-router').Link;
var Globals = require('../core/Globals');
var classNames = require('classnames');


var HomeScreen = React.createClass({

		componentDidMount : function(){
			document.title = "valéria sordi photography //";
		},

		render : function(){
			return (
				<div></div>
			)
		}
});


module.exports = HomeScreen;
