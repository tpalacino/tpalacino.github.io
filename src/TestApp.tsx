import { Stack, StackItem } from '@fluentui/react';
import React from 'react';
import './TestApp.css';

const TestApp: React.FunctionComponent = () => {
    return <Stack verticalFill>
        <StackItem grow style={{ overflow: 'auto' }}>
            <div>Top</div>
            <div style={{ height: 1700 }}></div>
            <div>Bottom</div>
        </StackItem>
        <StackItem shrink>
            Footer
        </StackItem>
    </Stack>;
};

export default TestApp;