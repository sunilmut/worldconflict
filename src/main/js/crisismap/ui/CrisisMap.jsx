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
            center: {lat: 26.04, lng: 8.22},
            radius: 60,
            zoom: 2,
            infoIndex: -1
        }
    },

    componentDidMount: function() {

//        geolocation.getCurrentPosition((position) => {
//              this.setState({
//                center: {
//                  lat: position.coords.latitude,
//                  lng: position.coords.longitude
//                },
//                content: "Location found using HTML5.",
//              });
//        }, (reason) => {
//          this.setState({
//
//            content: `Error: The Geolocation service failed (${ reason }).`
//          });
//        });

    },

    handleMouseOver: function(index) {

    },

    handleInfoClose: function() {
    },


    render: function() {

            const {center, content, radius} = this.state;

            let contents = [];

            const iraqConflict = {lat:36.35, lng: 43.07};

            contents = contents.concat([
            ( <Marker
                       defaultPosition={iraqConflict}
                       title="Iraq Conflict"/>
            ),
            (<Circle key="circle" center={iraqConflict} radius={600} options={{
                fillColor: "red",
                fillOpacity: 0.50,
                strokeColor: "red",
                strokeOpacity: 1,
                strokeWeight: 1,
              }} />),
            ]);

            return (
              <div id="map" className="crisis-map">
                <GoogleMap containerProps={{
                      ...this.props,
                      style: {
                        height: "100%",
                      },
                    }}
                    ref="map"
                    defaultZoom={this.state.zoom}
                    center={center}
                    >
                    {contents}
                </GoogleMap>
              </div>
            );

   }
});



module.exports = CrisisMap;