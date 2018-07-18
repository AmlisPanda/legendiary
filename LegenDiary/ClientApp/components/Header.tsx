import * as React from 'react';
import { Menu } from './Menu'
import { User } from './User'

import { MouseEventHandler, EventHandler, MouseEvent } from 'react';

interface HeaderProps {
    userId: number;
}
interface HeaderState {
}

export class Header extends React.Component<HeaderProps, HeaderState> {

    constructor(props: HeaderProps) {
        super(props);

        
    }

    render() {

        const isLoggedIn = this.props.userId > 0;

        let userNav = null;
        if (isLoggedIn) {
            userNav =
                <div id="rightHeader">
                    <User />
                    <i id="hamburgerIcon" className="fas fa-bars fa-lg"></i>
                </div>
        }

        return (
            <header className="App-header">
                <div id="logoTitle">
                    <h1 className="App-title">LegenDiary</h1>
                </div>

                {userNav}
            </header>
        )
    }
}
