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

  componentDidMount : function(){
  //  TweenMax.fromTo(ReactDOM.findDOMNode(this.refs.links), 1, {y : 30, opacity : 0}, {y : 0, opacity : 1 , ease : Expo.easeInOut});
  },

  componentWillReceiveProps : function(nextProps){
    this.setState({
      location : nextProps.location
    });

  },

  onUpdateBackground : function(color){

  },

  render : function(){
    return (
      <div className="site-wrapper">
        <div id="fake-scroller"></div>
        <BackgroundComponent onUpdateBackground={this.onUpdateBackground} location={this.state.location.pathname}/>
        <div className="section-container">
          {React.cloneElement(this.props.children, {})}
        </div>
        <MenuComponent ref="menu" location={this.state.location.pathname} />

        <div className="links" ref="links" style={{opacity : (this.state.location.pathname.indexOf("portfolio") > -1 ? 0 : 1)}}>
          <Link to={ContentProvider.generalContacts.facebook_url} target="_blank">facebook</Link>
          <div className="spacer"/>
          <Link to={ContentProvider.generalContacts.instagram_url} target="_blank">instagram</Link>
        </div>
      </div>
    )
  }
});

module.exports = MainTemplate;
