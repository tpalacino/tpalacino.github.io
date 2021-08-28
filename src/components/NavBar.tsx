import React from 'react';
import { CommandBar, IContextualMenuItem } from '@fluentui/react';

export default class NavBar extends React.Component<any> {
    private _onNavLinkClicked = (ev?: any, item?: IContextualMenuItem) => {
        if (ev) {
            ev.preventDefault();
        }
        if (item && item.href) {
            this.props.history.push(item.href);
        }
    }

    public render() {
        return <CommandBar
            items={[
                {
                    key: "brand",
                    text: "Troy's Site",
                    href: "/",
                    onClick: this._onNavLinkClicked
                },
                {
                    key: "tools",
                    text: "Tools",
                    subMenuProps: {
                        items: [
                            {
                                key: "url-encoder",
                                text: "URL Encoder",
                                href: "/tools/url-encoder",
                                onClick: this._onNavLinkClicked
                            }
                        ]
                    }
                }
            ]}
        />;
    }
}