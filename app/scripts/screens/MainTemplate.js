var React = require('react');
var PageTransition = require('react-router-page-transition');
var Link = require('react-router').Link;
var Globals = require('../core/Globals');
var ReactDOM = require('react-dom');
var browserHistory = require('react-router').browserHistory;


var MainTemplate = React.createClass({

  $interval : null,


  getInitialState: function() {
    return {
      lastUpdated : Globals.NORFOLK_LAST_UPDATED,
      norfolkData : Globals.NORFOLK_LAST_DATA,
      loading : false,
      comparing : false,
      comparingData : null
    }
  },

  render : function(){
    return (
      <div id="forecast-wrapper">
      </div>
    )
  }
});

module.exports = MainTemplate;
