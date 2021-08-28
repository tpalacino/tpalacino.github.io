import React from "react";
import UrlEncoder from "./pages/UrlEncoder/UrlEncoder";
import Home from './pages/Home/Home';
import NavBar from './components/NavBar';
import "./App.css";
import { Route, Switch } from "react-router";
import { ScrollablePane, Sticky } from "@fluentui/react";

export default class App extends React.Component {
    public render() {
        return (
            <ScrollablePane className="App">
                <Sticky stickyClassName="NavBar">
                    <Route path="*" component={NavBar} />
                </Sticky>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/tools/url-encoder" component={UrlEncoder} />
                </Switch>
            </ScrollablePane>
        );
    }
}
