var React = require('react');
var Router = require('react-router').Router;
var browserHistory = require('react-router').browserHistory;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;

var HomeScreen = require('./screens/HomeScreen');
var MainTemplate = require('./screens/MainTemplate');



require('./vendors/preloadjs-0.6.2.min');
require('./vendors/SplitText.min');





var MainApplication = React.createClass({


  render : function(){
    return (
      <Router history={browserHistory}>
          <Route path="/" component={MainTemplate}>
            <IndexRoute component={HomeScreen} />
            <Route path="/sobre" component={HomeScreen} />
            <Route path="/contato" component={HomeScreen} />
          </Route>
      </Router>
    )
  }
});

module.exports = MainApplication;
