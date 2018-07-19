import * as React from 'react';

export interface NavItemProps {
    label: string;
    iconCn?: string;
    handlerClick?: (ev: React.MouseEvent<HTMLElement>) => void;
}

interface NavItemState {
    activeLink: boolean;
}

export class NavItem extends React.Component<NavItemProps, NavItemState> {

    constructor(props) {
        super(props);

        this.state = {
            activeLink : false
        }

        this.linkOnClick = this.linkOnClick.bind(this);
    }

    linkOnClick(e) {

        this.setState({ activeLink: !this.state.activeLink });
        if (this.props.handlerClick) {
            this.props.handlerClick(e);
        }
    }


    render() {


        return (
            <li>
                <a onClick={this.linkOnClick} className={this.state.activeLink ? "active" : ""}>

                    {this.props.iconCn && 
                        <i className={this.props.iconCn}></i>
                    }
                    
                    <span>{this.props.label}</span>
                </a>
                {this.props.children &&
                    <ul className="subMenu">
                        {this.props.children}
                    </ul>
                }
            </li>
           
        );
    }
}
