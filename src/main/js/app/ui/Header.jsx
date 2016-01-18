'use strict';

require("react-bootstrap");
var Reflux = require('reflux');

var {Navbar, Nav, NavItem, NavDropdown,  MenuItem} = require('react-bootstrap');

var Header = React.createClass ({


    render: function() {

        return (
  <Navbar inverse>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">Our Crisis</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <NavItem eventKey={1} href="#">About</NavItem>
        {/*
        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
          <MenuItem eventKey={3.1}>Action</MenuItem>
          <MenuItem eventKey={3.2}>Another action</MenuItem>
          <MenuItem eventKey={3.3}>Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.3}>Separated link</MenuItem>
        </NavDropdown>
        */}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
        );
    }
});


module.exports = Header;