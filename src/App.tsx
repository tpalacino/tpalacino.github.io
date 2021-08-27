import React from 'react';
import UrlEncoder from './tools/UrlEncoder';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Navbar, Container, NavbarBrand, Nav, NavDropdown, Alert } from 'react-bootstrap';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import Switch from 'react-bootstrap/esm/Switch';
import { Route } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

interface IAppProps {
}

interface IAppState {
}

export default class App extends React.Component<IAppProps, IAppState> {
  public constructor(props: IAppProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return <div className="App">
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <NavbarBrand>Troy's Site</NavbarBrand>
        <NavbarToggle aria-controls="responsive-navbar-nav"/>
        <NavbarCollapse id="responsive-navbar-nav">
          <Nav>
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <NavDropdown title="Tools" id="basic-nav-dropdown">
              <LinkContainer to="/tools/url-encoder">
                <NavDropdown.Item>Url Encoder</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
    <Container>
      <Switch>
        <Route exact path="/">
          <Alert variant="info">Home</Alert>
        </Route>
        <Route exact path="/tools/url-encoder">
          <UrlEncoder />
        </Route>
        <Route
          path="/action/:id"
          render={({ match }) => {
            return <Alert variant="info">Action {match?.params?.id}</Alert>;
          }} />
      </Switch>
    </Container>
  </div>;
  }
}