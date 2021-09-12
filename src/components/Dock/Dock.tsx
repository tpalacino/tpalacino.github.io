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

const Dock: React.FunctionComponent<IDockProps> = ({ dockItems, onMenuClicked, onDockItemClicked }) => {
    return <>
        <Stack className="Dock" horizontal tokens={{ childrenGap: 2 }}>
            <StackItem>
                <DefaultButton iconProps={{ iconName: "WindowsLogo" }} onClick={onMenuClicked} title="Menu" />
            </StackItem>

            {dockItems.length > 0 && dockItems.map(i => (<StackItem key={i.path}>
                <DefaultButton
                    className={(window.location.hash === `#${i.path}`) ? "active" : ""}
                    title={i.title}
                    iconProps={{ iconName: i.iconName }}
                    onClick={() => onDockItemClicked(i)} />
            </StackItem>))}
            <StackItem align="center" >
                <Clock />
            </StackItem>
        </Stack>
    </>;
}

export default Dock;