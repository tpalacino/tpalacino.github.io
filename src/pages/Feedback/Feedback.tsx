import { DefaultButton, Stack, Text } from '@fluentui/react';
import React from 'react';

const Feedback: React.FunctionComponent = () => {

    return <>
        <Stack tokens={{ childrenGap: 30 }}>
            <Stack tokens={{ childrenGap: 10 }}>
                <Text variant="xLarge">Bugs</Text>
                <Text variant="medium">If you have any issues using a tool on this site, please create an issue in the repo and tag it as a bug.</Text>
            </Stack>
            <Stack tokens={{ childrenGap: 10 }}>
                <Text variant="xLarge">Ideas</Text>
                <Text variant="medium">If you find this site useful and want to share an idea for a tool that would make it more useful, please create an issue in the repo and tag it as a request.</Text>
            </Stack>
            <Stack tokens={{ childrenGap: 10 }} horizontalAlign="start">
                <Text variant="medium">You will need to have a GitHub account to create the feedback item. (Don't worry it's completely free)</Text>
                <Stack horizontal tokens={{ childrenGap: 10 }}>
                    <DefaultButton href="https://github.com/tpalacino/tpalacino.github.io" target="_blank" data-intercaption="off">GitHub Repo</DefaultButton>
                    <DefaultButton href="https://github.com/tpalacino/tpalacino.github.io/issues/new" target="_blank" data-intercaption="off">New Issue</DefaultButton>
                </Stack>
            </Stack>
        </Stack>
    </>;
}

export default Feedback;