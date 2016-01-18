'use strict';

require("react-bootstrap");
var Reflux = require('reflux');

var {Link} = require('react-router');


var {Button, ButtonGroup, DropdownButton, SplitButton, MenuItem, ButtonToolbar} = require('react-bootstrap');
var {Glyphicon} = require('react-bootstrap');
var {Label, Input} = require('react-bootstrap');
var {Grid, Row, Col} = require('react-bootstrap');
var {Panel} = require('react-bootstrap');
var {ListGroup, ListGroupItem} = require('react-bootstrap');

var Rater = require('react-rater');


var { GoogleMapLoader, GoogleMap, Marker, SearchBox, InfoWindow, Circle } = require('react-google-maps');


var canUseDOM = require('can-use-dom');
var raf = require('raf');

/**
 * Grab the geo-location
 */
 const geolocation = (
   canUseDOM && navigator.geolocation || {
     getCurrentPosition: (success, failure) => {
       failure("Your browser doesn't support geolocation.");
     },
   }
 );


var CrisisMap = React.createClass({


    getInitialState: function() {
        return {
            center: {},
            radius: 6000,
            zoom: 10,
            infoIndex: -1
        }
    },

    componentDidMount: function() {

        geolocation.getCurrentPosition((position) => {
              this.setState({
                center: {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                },
                content: "Location found using HTML5.",
              });
        }, (reason) => {
          this.setState({
            center: {
              lat: -122,
              lng: 47
            },
            content: `Error: The Geolocation service failed (${ reason }).`
          });
        });

    },

    handleMouseOver: function(index) {

    },

    handleInfoClose: function() {
    },


    render: function() {

        if(this.props.display) {

            const {center, content, radius} = this.state;

            return (
                <GoogleMap containerProps={{
                      ...this.props,
                      style: {
                        height: "100%",
                      },
                    }}
                    ref="map"
                    defaultZoom={this.state.zoom}
                    defaultCenter={center}
                    >

                </GoogleMap>
            );
        } else {
            return(
                <div/>
            )
        }
   }
});



module.exports = CrisisMap;