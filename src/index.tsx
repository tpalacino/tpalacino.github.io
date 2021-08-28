import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@fluentui/react';
import { createTheme } from "@fluentui/style-utilities";

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

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={appTheme}>
                <App />
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
