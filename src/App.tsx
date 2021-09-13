import React, { useEffect, useState } from "react";
import { Route, RouteComponentProps, Switch } from "react-router";
import { Stack, StackItem } from "@fluentui/react";
import "./App.css";
import Menu, { IMenuItem } from './components/Menu/Menu';
import Dock from './components/Dock/Dock';
import Home from "./pages/Home/Home";
import Feedback from "./pages/Feedback/Feedback";
import UrlEncoder from "./pages/UrlEncoder/UrlEncoder";
import Regex from "./pages/Regex/Regex";
import { BrowserRouter } from "react-router-dom";

interface IAppItem extends IMenuItem {
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

const Title: React.FunctionComponent<{ item: IAppItem }> = ({ item }) => {
    useEffect(() => {
        document.title = `Troy's Desktop - ${item.title}`;
    }, [item])
    return React.createElement(item.component);
}

const App: React.FunctionComponent = () => {
    let _DismissMenu: boolean = false;
    let _AppItems: IAppItem[] = [
        {
            title: "Home",
            path: "/",
            iconName: "Home",
            component: Home,
            showInDock: true,
            showInMenu: false
        },
        {
            title: "Feedback",
            path: "/tools/feedback",
            iconName: "Feedback",
            component: Feedback,
            showInDock: false,
            showInMenu: true
        },
        {
            title: "URL Encoder",
            path: "/tools/url-encoder",
            iconName: "ChangeEntitlements",
            component: UrlEncoder,
            showInDock: true,
            showInMenu: true
        },
        {
            title: "Regex Tester",
            path: "/tools/regex-tester",
            iconName: "TestBeaker",
            component: Regex,
            showInDock: true,
            showInMenu: true
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

    let _onAppItemClicked = () => {
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

    return <>
        <BrowserRouter>
            <Stack className="App" verticalFill>
                <StackItem className="AppContent" grow>
                    <Switch>
                        {_AppItems.map(i => {
                            return <Route key={i.path} exact path={i.path} component={() => <Title item={i} />} />;
                        })}
                    </Switch>
                </StackItem>
                {isMenuOpen && <Menu menuItems={_AppItems.filter(x => x.showInMenu)} onMenuItemClicked={_onAppItemClicked} />}
                <StackItem className="AppDock" shrink>
                    <Route path="*" render={() => (<>
                        <Dock dockItems={_AppItems.filter(x => x.showInDock)} onMenuClicked={_onMenuClicked} onMenuItemClicked={_onAppItemClicked} />
                    </>)} />
                </StackItem>
            </Stack>
        </BrowserRouter>
    </>;
}

export default App;