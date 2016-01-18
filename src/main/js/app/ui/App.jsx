'use strict';

var React = window.React = require('react');
var ReactDOM = require('react-dom')
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Reflux = require('reflux');

var Header = require('./Header');


var App = React.createClass({

    render: function() {

      return (
         <div>
            <Header/>
            <div className='container'>
                {this.props.children}
            </div>
         </div>
      );
    }
});

module.exports = App;