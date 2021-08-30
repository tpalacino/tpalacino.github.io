import React from 'react';
import './Dock.css';
import { DefaultButton, Stack, StackItem } from '@fluentui/react';
import { IMenuItem } from '../Menu/Menu';
import Clock from '../Clock/Clock';

interface IDockProps {
    dockItems: IMenuItem[];
    onMenuClicked: () => void;
    onDockItemClicked: (item: IMenuItem) => void;
}

export default class Dock extends React.Component<IDockProps> {
    public render() {
        const { dockItems, onMenuClicked } = this.props;
        return <>
            <Stack className="Dock" horizontal tokens={{ childrenGap: 2 }}>
                <StackItem>
                    <DefaultButton iconProps={{ iconName: "WindowsLogo" }} onClick={onMenuClicked} title="Menu" />
                </StackItem>
                {dockItems.map(i => (<StackItem key={i.path}>
                    <DefaultButton
                        className={(window.location.hash === `#${i.path}`) ? "active" : ""}
                        title={i.title}
                        iconProps={{ iconName: i.iconName }}
                        onClick={() => this.props.onDockItemClicked(i)} />
                </StackItem>))}
                <StackItem align="center" >
                    <Clock />
                </StackItem>
            </Stack>
        </>;
    }
}