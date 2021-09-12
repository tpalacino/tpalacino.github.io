import { DefaultButton, Stack, StackItem, Text } from '@fluentui/react';
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
    showInDock: boolean;
    showInMenu: boolean;
}

const Menu: React.FunctionComponent<IMenuProps> = ({ menuItems: MenuItems, onDockItemClicked }) => {
    return <Stack className="Menu">
        {MenuItems.length > 0 ? MenuItems.map(i => (<>
            <StackItem className="MenuItem" key={i.path} grow>
                <DefaultButton iconProps={{ iconName: i.iconName }} title={i.title} onClick={() => onDockItemClicked(i)}>{i.title}</DefaultButton>
            </StackItem>
            <div className="MenuItemSeparator" />
        </>)) : <>
            <StackItem className="MenuItem" key="noItems" grow>
                <Text variant="medium">No menu items to show</Text>
            </StackItem>
        </>}
    </Stack>;
}

export default Menu;