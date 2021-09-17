import { DefaultButton, Stack, StackItem, Text } from '@fluentui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

interface IMenuProps {
    menuItems: IMenuItem[];
    isOpen: boolean;
    onMenuItemClicked: () => void;
}

export interface IMenuItem {
    iconName: string;
    title: string;
    path: string;
    showInDock: boolean;
    showInMenu: boolean;
}

const Menu: React.FunctionComponent<IMenuProps> = ({ menuItems, isOpen, onMenuItemClicked }) => {
    return <Stack className="Menu" style={{ display: !isOpen ? "none" : "unset" }}>
        {menuItems.length > 0 ? menuItems.map(i => (<>
            <StackItem className="MenuItem" key={i.path} grow>
                <Link to={i.path} onClick={() => onMenuItemClicked()}>
                    <DefaultButton iconProps={{ iconName: i.iconName }} title={i.title}>{i.title}</DefaultButton>
                </Link>
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