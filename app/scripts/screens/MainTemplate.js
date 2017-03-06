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

        <div id="rotate-layer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 89.76 69.17"><title>rotate</title><path d="M22.27,56.84H2.54a.36.36,0,0,1-.36-.36V9.54a.36.36,0,0,1,.36-.36H29a.36.36,0,0,1,.36.36V36.46h1.88V4.16A4,4,0,0,0,27.31.21h-.9A.36.36,0,0,0,26.09,0H22.65a.36.36,0,0,0-.32.21H4.16A4,4,0,0,0,.21,4.16v5.1A.36.36,0,0,0,0,9.58v1.31a.36.36,0,0,0,.21.32v1.52a.36.36,0,0,0-.21.32v1.31a.35.35,0,0,0,.21.32V61.75a4,4,0,0,0,3.95,3.95H22.27V56.84ZM15.62,2.75a.6.6,0,1,1-.6.6A.6.6,0,0,1,15.62,2.75ZM13.52,5.56H18a.36.36,0,1,1,0,.72H13.52a.36.36,0,1,1,0-.72ZM16,64.2a3.11,3.11,0,1,1,3.11-3.11A3.11,3.11,0,0,1,16,64.2Z"/><path d="M16,58.67a2.39,2.39,0,1,0,2.39,2.39A2.4,2.4,0,0,0,16,58.67Z"/><circle cx="28.68" cy="53.88" r="2.39"/><path d="M89.55,60.23V42.06a4,4,0,0,0-3.95-3.95H80.5a.36.36,0,0,0-.32-.21H78.87a.35.35,0,0,0-.32.21H77a.36.36,0,0,0-.32-.21h-1.3a.36.36,0,0,0-.32.21H28a4,4,0,0,0-3.95,3.95V65.22A4,4,0,0,0,28,69.17H85.61a4,4,0,0,0,3.95-3.95v-.9a.36.36,0,0,0,.21-.32V60.55A.36.36,0,0,0,89.55,60.23ZM28.68,57a3.11,3.11,0,1,1,3.11-3.11A3.11,3.11,0,0,1,28.68,57Zm51.91,9.93a.36.36,0,0,1-.36.36H33.28a.36.36,0,0,1-.36-.36V40.45a.36.36,0,0,1,.36-.36H80.22a.36.36,0,0,1,.36.36V66.92Zm3.62-11a.36.36,0,1,1-.72,0V51.43a.36.36,0,0,1,.72,0Zm2.21-1.79a.6.6,0,1,1,.6-.6A.6.6,0,0,1,86.41,54.12Z"/><path d="M58.5,29.87,56.81,31.7c-1-9.56-6.53-14.11-11.13-16.25A25.91,25.91,0,0,0,35.44,13.1h-.53v1.43h.55a24.79,24.79,0,0,1,9.65,2.23c6.06,2.83,9.49,7.84,10.25,14.89l-1.73-1.6.08,2.06,2.52,2.34,2.34-2.53Z"/></svg>
          <p>{ContentProvider.getTranslatedText("rotate")}</p>
        </div>
      </div>
    )
  }
});

module.exports = MainTemplate;
