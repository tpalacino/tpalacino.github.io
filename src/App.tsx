import React, { useEffect, useState } from "react";
import { Route, RouteComponentProps, Switch } from "react-router";
import { Stack, StackItem } from "@fluentui/react";
import "./App.css";
import Menu, { IMenuItem } from './components/Menu/Menu';
import Dock from './components/Dock/Dock';
import Home from "./pages/Home/Home";
import UrlEncoder from "./pages/UrlEncoder/UrlEncoder";
import Regex from "./pages/Regex/Regex";

interface IAppItem extends IMenuItem {
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

const App: React.FunctionComponent = () => {
    let _DismissMenu: boolean = false;
    let _AppItems: IAppItem[] = [
        {
            title: "Home",
            path: "/",
            iconName: "Home",
            component: Home
        },
        {
            title: "URL Encoder",
            path: "/tools/url-encoder",
            iconName: "ChangeEntitlements",
            component: UrlEncoder
        },
        {
            title: "Regex Tester",
            path: "/tools/regex-tester",
            iconName: "TestBeaker",
            component: Regex
        }
    ];

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    let _onMouseDown = () => {
        _DismissMenu = isMenuOpen;
    }

    let _onMouseUp = () => {
        window.setTimeout(() => {
            if (_DismissMenu) {
                _DismissMenu = false;
                setIsMenuOpen(false);
            }
        }, 10);
    }

    let _onMenuClicked = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    let _onDockItemClicked = (item: IMenuItem) => {
        window.location.hash = `#${item.path}`;
        if (isMenuOpen) {
            setIsMenuOpen(false);
        }
    }

    useEffect(() => {
        window.addEventListener("mousedown", _onMouseDown);
        window.addEventListener("mouseup", _onMouseUp);

        return () => {
            window.removeEventListener("mousedown", _onMouseDown);
            window.removeEventListener("mouseup", _onMouseUp);
        };
    })

    return <div className="App">
        <Stack verticalFill>
            <StackItem className="AppContent" grow>
                <Switch>
                    {_AppItems.map(i => {
                        return <Route key={i.path} exact path={i.path} component={i.component} />;
                    })}
                </Switch>
            </StackItem>
            {isMenuOpen && <Menu menuItems={_AppItems} onDockItemClicked={_onDockItemClicked} />}
            <StackItem className="AppDock">
                <Route path="*" render={() => (<>
                    <Dock dockItems={_AppItems} onMenuClicked={_onMenuClicked} onDockItemClicked={_onDockItemClicked} />
                </>)} />
            </StackItem>
        </Stack>
    </div>;
}

export default App;