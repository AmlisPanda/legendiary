import * as React from 'react';

export interface NavItemProps {
    label: string;
    iconCn: string;
    handlerClick?: (ev: React.MouseEvent<HTMLElement>) => void;
}

export class NavItem extends React.Component<NavItemProps, {}> {
    render() {
        return (
            <a onClick={this.props.handlerClick}>
                <i className={this.props.iconCn}></i>
                <span>{this.props.label}</span>
            </a>
        );
    }
}
