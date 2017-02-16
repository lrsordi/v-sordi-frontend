var React = require('react');
var Router = require('react-router').Router;
var browserHistory = require('react-router').browserHistory;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;

var HomeScreen = require('./screens/HomeScreen');
var AboutMeScreen = require('./screens/AboutMeScreen');
var PortfolioScreen = require('./screens/PortfolioScreen');
var ContactScreen = require('./screens/ContactScreen');
var MainTemplate = require('./screens/MainTemplate');



require('./vendors/preloadjs-0.6.2.min');
require('./vendors/SplitText.min');





var MainApplication = React.createClass({


  render : function(){
    return (
      <Router history={browserHistory}>
          <Route path="/" component={MainTemplate}>
            <IndexRoute component={HomeScreen} />
            <Route path="/sobre" component={AboutMeScreen} />
            <Route path="/portfolio" component={PortfolioScreen}>
              <IndexRoute component={PortfolioScreen} />
              <Route path=":slug" component={PortfolioScreen}/>
            </Route>
            <Route path="/contato" component={ContactScreen} />
          </Route>
      </Router>
    )
  }
});

module.exports = MainApplication;
