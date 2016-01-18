'use strict';

var React = window.React = require('react');
var ReactDOM = require('react-dom')

var {create: createRouter, HistoryLocation, HashLocation, Route, Router,
    DefaultRoute, NotFoundRoute, Link, Redirect, RouterHander, IndexRoute, browserHistory} = require('react-router');

/*
 * Pull in the components so that they can be used as handlers.
 */
var App = require('./app/ui/App');
var CrisisMap = require('./crisismap/ui/CrisisMap');

/**
 * Setup routes.
 */
ReactDOM.render((
  <Router history={browserHistory}>
    <Route name="app" path="/" component={App}>
        <Route path="map" component={CrisisMap}/>
        <IndexRoute component={CrisisMap} />
    </Route>
  </Router>
), document.body);


