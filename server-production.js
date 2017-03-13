#!/usr/bin/env node

/**
 * Module dependencies.
 */

/**
 * Get port from environment and store in Express.
 */
var express = require('express');
var app = express();
var debug = require('debug');
var http = require('http');
var port = normalizePort(process.env.PORT || '3001');
var server = http.createServer(app);
var html = require('html');
var cons = require('consolidate');
var prerender = require('prerender-node');
var useragent = require('express-useragent');
var sm = require('sitemap');

app.use('/public', express.static(__dirname + '/public'));
app.use(useragent.express());
app.engine('html', cons.underscore);
// set .html as the default extension
app.set('view engine', 'html');
app.use(express.static('sitemap.xml'));


var sitemap = sm.createSitemap ({
      hostname: 'http://www.valeriasordi.com',
      cacheTime: 600000,        // 600 sec - cache purge period
      urls: [
        { url: '/',  changefreq: 'weekly', priority: 1.0, links : [ {lang: 'en', url: '/?language=en'}] },
        { url: '/sobre',  changefreq: 'weekly',  priority: 0.7, links : [ {lang: 'en', url: '/sobre?language=en'}] },
        { url: '/contato',  changefreq: 'weekly',  priority: 0.7 , links : [ {lang: 'en', url: '/contato?language=en'}]},
        { url: '/portifolio/baby',  changefreq: 'weekly',  priority: 0.7, links : [ {lang: 'en', url: '/portifolio/baby?language=en'}] },
        { url: '/portifolio/acompanhamento',  changefreq: 'weekly',  priority: 0.7, links : [ {lang: 'en', url: '/portifolio/acompanhamento?language=en'}] },
        { url: '/portifolio/infantil',  changefreq: 'weekly',  priority: 0.7, links : [ {lang: 'en', url: '/portifolio/infantil?language=en'}] },
        { url: '/portifolio/cake-smash',  changefreq: 'weekly',  priority: 0.7, links : [ {lang: 'en', url: '/portifolio/cake-smash?language=en'}] },
        { url: '/portifolio/familia',  changefreq: 'weekly',  priority: 0.7, links : [ {lang: 'en', url: '/portifolio/familia?language=en'}] },
        { url: '/portifolio/eventos',  changefreq: 'weekly',  priority: 0.7, links : [ {lang: 'en', url: '/portifolio/eventos?language=en'}] },
      ]
    });

app.get('/sitemap.xml', function(req, res) {
  sitemap.toXML( function (err, xml) {
      if (err) {
        return res.status(500).end();
      }
      res.header('Content-Type', 'application/xml');
      res.send( xml );
  });
});



app.get('*', function(req, res, next) {
  var fullUrl = req.protocol + '://' + req.get('host');
  res.render(__dirname + "/index.html", {root_url : fullUrl, api_url : "http://www.valeriasordi.com:3010/", is_crawler : /bot|googlebot|phantom|facebook|crawler|spider|robot|crawling/i.test(req.useragent.source)});
  //res.status(404).send('Sorry cant find that!');
});

prerender.set('prerenderServiceUrl', 'http://service.prerender.io/');
prerender.set('prerenderToken', 'JzaYMT1rHS9YfjYujxvN');
app.use(prerender);



app.set('port', port);

/**
 * Create HTTP server.
 */


/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}


/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
