import { DefaultButton, Stack, StackItem } from '@fluentui/react';
import React from 'react';
import './Menu.css';

interface IMenuProps {
    MenuItems: IMenuItem[];
    onDockItemClicked: (item: IMenuItem) => void;
}

export interface IMenuItem {
    iconName: string;
    title: string;
    path: string;
}

export default class Menu extends React.Component<IMenuProps> {
    public render() {
        return <Stack className="Menu">
            {this.props.MenuItems.map(i => (<>
                <StackItem className="MenuItem" key={i.path} grow>
                    <DefaultButton iconProps={{ iconName: i.iconName }} title={i.title} onClick={() => this.props.onDockItemClicked(i)}>{i.title}</DefaultButton>
                </StackItem>
                <div className="MenuItemSeparator"/>
            </>))}
        </Stack>;
    }
}