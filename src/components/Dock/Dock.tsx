import React from 'react';
import './Dock.css';
import { DefaultButton, Stack, StackItem } from '@fluentui/react';
import { IMenuItem } from '../Menu/Menu';
import Clock from '../Clock/Clock';
import { Link } from 'react-router-dom';

interface IDockProps {
    dockItems: IMenuItem[];
    onMenuClicked: () => void;
    onMenuItemClicked: () => void;
}

const Dock: React.FunctionComponent<IDockProps> = ({ dockItems, onMenuClicked, onMenuItemClicked }) => {
    return <Stack className="Dock" horizontal horizontalAlign="stretch" tokens={{ childrenGap: 2 }}>
        <StackItem grow >
            <Stack horizontal horizontalAlign="space-around" >
                <Stack horizontal tokens={{ childrenGap: 4 }}>
                    <StackItem>
                        <DefaultButton iconProps={{ iconName: "WindowsLogo" }} onClick={onMenuClicked} title="Menu" />
                    </StackItem>
                    {dockItems.length > 0 && dockItems.map(i => (<StackItem key={i.path}>
                        <Link to={i.path} onClick={() => onMenuItemClicked()}>
                            <DefaultButton
                                className={(window.location.pathname === i.path) ? "active" : ""}
                                title={i.title}
                                iconProps={{ iconName: i.iconName }} />
                        </Link>
                    </StackItem>))}
                </Stack>
            </Stack>
        </StackItem>
        <StackItem shrink>
            <Clock />
        </StackItem>
    </Stack>;
}

export default Dock;