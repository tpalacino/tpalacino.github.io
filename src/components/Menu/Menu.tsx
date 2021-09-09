import { DefaultButton, Stack, StackItem } from '@fluentui/react';
import React from 'react';
import './Menu.css';

interface IMenuProps {
    menuItems: IMenuItem[];
    onDockItemClicked: (item: IMenuItem) => void;
}

export interface IMenuItem {
    iconName: string;
    title: string;
    path: string;
}

const Menu: React.FunctionComponent<IMenuProps> = ({ menuItems: MenuItems, onDockItemClicked }) => {
    return <Stack className="Menu">
        {MenuItems.map(i => (<>
            <StackItem className="MenuItem" key={i.path} grow>
                <DefaultButton iconProps={{ iconName: i.iconName }} title={i.title} onClick={() => onDockItemClicked(i)}>{i.title}</DefaultButton>
            </StackItem>
            <div className="MenuItemSeparator" />
        </>))}
    </Stack>;
}

export default Menu;