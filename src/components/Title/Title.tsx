import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { IMenuItem } from '../Menu/Menu';

export interface IAppRouteItem extends IMenuItem {
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

export interface IAppRouteProps {
    item: IAppRouteItem;
}

const Title: React.FunctionComponent<IAppRouteProps> = ({ item }) => {
    
    useEffect(() => {
        document.title = `Troy's Desktop - ${item.title}`;
        localStorage.setItem("TroysDesktopLastPage", window.location.pathname);
    }, [item]);

    return React.createElement(item.component);
}

export default Title;