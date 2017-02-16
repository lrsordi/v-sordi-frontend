var React = require('react');
var PageTransition = require('react-router-page-transition');
var Link = require('react-router').Link;
var Globals = require('../core/Globals');
var ReactDOM = require('react-dom');
var browserHistory = require('react-router').browserHistory;
var MenuComponent = require('./components/MenuComponent');
var BackgroundComponent = require('./components/BackgroundComponent');



var MainTemplate = React.createClass({

  $interval : null,


  getInitialState: function() {
    return {
      location : this.props.location
    };
  },

  componentWillReceiveProps : function(nextProps){
    this.setState({
      location : nextProps.location
    });
  },

  onUpdateBackground : function(color){

    if(this.refs.menu)
      this.refs.menu.setColor(color);
  },

  render : function(){
    return (
      <div className="site-wrapper">
        <BackgroundComponent onUpdateBackground={this.onUpdateBackground} location={this.state.location.pathname}/>
        <div className="section-container">
          {React.cloneElement(this.props.children, {})}
        </div>
        <MenuComponent ref="menu" location={this.state.location.pathname} />
      </div>
    )
  }
});

module.exports = MainTemplate;
