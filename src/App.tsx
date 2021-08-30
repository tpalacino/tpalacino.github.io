import React from "react";
import UrlEncoder from "./pages/UrlEncoder/UrlEncoder";
import Dock from './components/Dock/Dock';
import Menu, { IMenuItem } from './components/Menu/Menu';
import "./App.css";
import { Route, RouteComponentProps, Switch } from "react-router";
import { Stack, StackItem } from "@fluentui/react";

interface IAppState {
    isMenuOpen: boolean;
}

interface IAppItem extends IMenuItem {
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

export default class App extends React.Component<any, IAppState> {
    private _AppItems: IAppItem[];
    private _DismissMenu: boolean = false;

    public constructor(props: any) {
        super(props);
        window.addEventListener("mousedown", this._onMouseDown);
        window.addEventListener("mouseup", this._onMouseUp);
        this._AppItems = [
            {
                title: "Home",
                path: "/",
                iconName: "Home",
                component: () => (<></>)
            },
            {
                title: "URL Encoder",
                path: "/tools/url-encoder",
                iconName: "ChangeEntitlements",
                component: UrlEncoder
            }
        ];
        this.state = {
            isMenuOpen: false
        };
    }

    private _onMouseDown = () => {
        this._DismissMenu = this.state.isMenuOpen;
    }

    private _onMouseUp = () => {
        window.setTimeout(() => {
            if (this._DismissMenu) {
                this._DismissMenu = false;
                this.setState({ isMenuOpen: false })
            }
        }, 10);
    }

    private _onMenuClicked = () => {
        this.setState({ isMenuOpen: !this.state.isMenuOpen });
    }

    private _onDockItemClicked = (item: IMenuItem) => {
        window.location.hash = `#${item.path}`;
        if (this.state.isMenuOpen) {
            this.setState({ isMenuOpen: false });
        }
    }

    public render() {
        return <div className="App">
            <Stack verticalFill>
                <StackItem className="AppContent" grow>
                    <Switch>
                        {this._AppItems.map(i => {
                            return <Route key={i.path} exact path={i.path} component={i.component} />;
                        })}
                    </Switch>
                </StackItem>
                {this.state.isMenuOpen && <Menu MenuItems={this._AppItems} onDockItemClicked={this._onDockItemClicked} />}
                <StackItem className="AppDock">
                    <Route path="*" render={() => (<>
                        <Dock dockItems={this._AppItems} onMenuClicked={this._onMenuClicked} onDockItemClicked={this._onDockItemClicked} />
                    </>)} />
                </StackItem>
            </Stack>
        </div>;
    }
}
