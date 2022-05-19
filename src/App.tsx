import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import { Stack, StackItem, ThemeProvider } from "@fluentui/react";
import "./App.css";
import { initializeIcons } from '@fluentui/react';
import { createTheme } from "@fluentui/style-utilities";
import Title, { IAppRouteItem } from './components/Title/Title';
import Menu from './components/Menu/Menu';
import Dock from './components/Dock/Dock';
import Home from "./pages/Home/Home";
import Feedback from "./pages/Feedback/Feedback";
import UrlEncoder from "./pages/UrlEncoder/UrlEncoder";
import Regex from "./pages/Regex/Regex";
import NotFound from "./pages/NotFound/NotFound";
import TimeConverter from "./pages/TimeConverter/TimeConverter";
import Generators from "./pages/Generators/Generators";

const appTheme = createTheme({
    palette: {
        themePrimary: "#a8a8a8",
        themeLighterAlt: "#070707",
        themeLighter: "#1b1b1b",
        themeLight: "#323232",
        themeTertiary: "#656565",
        themeSecondary: "#949494",
        themeDarkAlt: "#b1b1b1",
        themeDark: "#bdbdbd",
        themeDarker: "#cecece",
        neutralLighterAlt: "#4a4a4a",
        neutralLighter: "#525252",
        neutralLight: "#5e5e5e",
        neutralQuaternaryAlt: "#656565",
        neutralQuaternary: "#6b6b6b",
        neutralTertiaryAlt: "#848484",
        neutralTertiary: "#c8c8c8",
        neutralSecondary: "#d0d0d0",
        neutralPrimaryAlt: "#dadada",
        neutralPrimary: "#ffffff",
        neutralDark: "#f4f4f4",
        black: "#f8f8f8",
        white: "#424242",
    },
});

initializeIcons();

const App: React.FunctionComponent = () => {
    let _DismissMenu: boolean = false;
    const _AppItems: IAppRouteItem[] = [
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
        },
        {
            title: "Time Converter",
            path: "/tools/time-converter",
            iconName: "WorldClock",
            component: TimeConverter,
            showInDock: true,
            showInMenu: true
        },
        {
            title: "Generators",
            path: "/tools/generators",
            iconName: "Code",
            component: Generators,
            showInDock: true,
            showInMenu: true
        },
        {
            title: "Page Not Found",
            path: "",
            iconName: "",
            component: NotFound,
            showInDock: false,
            showInMenu: false
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
        <ThemeProvider theme={appTheme}>
            <Stack className="App" verticalFill>
                <StackItem className="AppContent" grow>
                    <Switch>
                        {_AppItems.map(i => {
                            const hasPath = i.path.length > 0;
                            return <Route key={i.path} exact={hasPath} path={hasPath ? i.path : undefined} component={() => <Title item={i} />} />;
                        })}
                    </Switch>
                </StackItem>
                <Menu isOpen={isMenuOpen} menuItems={_AppItems.filter(x => x.showInMenu)} onMenuItemClicked={_onAppItemClicked} />
                <StackItem className="AppDock" shrink>
                    <Route path="*" render={() => (<>
                        <Dock dockItems={_AppItems.filter(x => x.showInDock)} onMenuClicked={_onMenuClicked} onMenuItemClicked={_onAppItemClicked} />
                    </>)} />
                </StackItem>
            </Stack>
        </ThemeProvider>
    </>;
}

export default App;